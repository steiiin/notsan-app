<template>
  <div
    ref="panSurface"
    class="ns-flow"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @pointerleave="onPointerUp"
    @wheel.prevent="onWheel"
  >
    <div class="ns-flow__content" :style="contentStyle">
      <div ref="svgHost" class="ns-flow__svg" v-html="svgMarkup" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  svgMarkup: string
}>()

const emit = defineEmits<{
  (event: 'action', key: string): void
}>()

const router = useRouter()

const MIN_ZOOM = 1
const MAX_ZOOM = 2

const panSurface = ref<HTMLDivElement | null>(null)
const svgHost = ref<HTMLDivElement | null>(null)

const viewportSize = reactive({ width: 0, height: 0 })
const contentSize = reactive({ width: 0, height: 0 })

const zoom = ref(1)

const panState = reactive({
  x: 0,
  y: 0,
  pointerId: null as number | null,
  startX: 0,
  startY: 0,
})

const contentStyle = computed(() => ({
  transform: `translate3d(${panState.x}px, ${panState.y}px, 0) scale(${zoom.value})`,
}))

const svgLinkListeners: Array<{ element: Element; handler: (event: Event) => void }> = []

let surfaceObserver: ResizeObserver | null = null
let contentObserver: ResizeObserver | null = null

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function clampPan() {
  const scaledWidth = contentSize.width * zoom.value
  const scaledHeight = contentSize.height * zoom.value

  const availableWidth = viewportSize.width
  const availableHeight = viewportSize.height

  if (scaledWidth <= availableWidth) {
    panState.x = (availableWidth - scaledWidth) / 2
  } else {
    const minX = availableWidth - scaledWidth
    const maxX = 0
    panState.x = clamp(panState.x, minX, maxX)
  }

  if (scaledHeight <= availableHeight) {
    panState.y = (availableHeight - scaledHeight) / 2
  } else {
    const minY = availableHeight - scaledHeight
    const maxY = 0
    panState.y = clamp(panState.y, minY, maxY)
  }
}

function cleanupSvgLinkListeners() {
  while (svgLinkListeners.length) {
    const { element, handler } = svgLinkListeners.pop()!
    element.removeEventListener('click', handler)
  }
}

function updateContentSize() {
  const host = svgHost.value
  if (!host) {
    return
  }

  contentSize.width = host.clientWidth
  contentSize.height = host.clientHeight
  clampPan()
}

function normalizeHref(rawHref: string): URL | null {
  if (!rawHref) {
    return null
  }

  let href = rawHref.trim()
  if (href.startsWith('file:///')) {
    href = href.slice('file://'.length)
  }
  if (!href.startsWith('/')) {
    href = `/${href.replace(/^\/*/, '')}`
  }

  try {
    return new URL(href, 'https://local.app')
  } catch (error) {
    console.warn('Invalid link in flow diagram', rawHref)
    return null
  }
}

function setupSvgLinks() {
  cleanupSvgLinkListeners()

  const host = svgHost.value
  if (!host) {
    return
  }

  const svgElement = host.querySelector('svg')
  if (svgElement instanceof SVGElement) {
    svgElement.removeAttribute('width')
    svgElement.removeAttribute('height')
    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet')
    svgElement.style.width = '100%'
    svgElement.style.height = 'auto'
    svgElement.style.display = 'block'
  }

  const links = host.querySelectorAll('a')
  links.forEach(link => {
    const handler = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()
      const rawHref = link.getAttribute('xlink:href') || link.getAttribute('href')
      const url = rawHref ? normalizeHref(rawHref) : null

      if (!url) {
        return
      }

      const action = url.searchParams.get('action')
      if (action) {
        emit('action', action)
        return
      }

      if (url.pathname) {
        router.push(`${url.pathname}${url.search}`)
      }
    }
    link.addEventListener('click', handler)
    svgLinkListeners.push({ element: link, handler })
  })
}

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0) {
    return
  }

  const surface = panSurface.value
  if (!surface) {
    return
  }

  panState.pointerId = event.pointerId
  panState.startX = event.clientX - panState.x
  panState.startY = event.clientY - panState.y

  surface.style.cursor = 'grabbing'
  surface.setPointerCapture?.(event.pointerId)
}

function onPointerMove(event: PointerEvent) {
  if (panState.pointerId !== event.pointerId) {
    return
  }

  panState.x = event.clientX - panState.startX
  panState.y = event.clientY - panState.startY
  clampPan()
}

function onPointerUp(event: PointerEvent) {
  const surface = panSurface.value
  if (panState.pointerId !== event.pointerId || !surface) {
    return
  }

  panState.pointerId = null
  surface.style.cursor = 'grab'
  if (surface.hasPointerCapture?.(event.pointerId)) {
    surface.releasePointerCapture(event.pointerId)
  }

  clampPan()
}

function onWheel(event: WheelEvent) {
  const surface = panSurface.value
  if (!surface) {
    return
  }

  const previousZoom = zoom.value
  const zoomDelta = Math.exp(-event.deltaY * 0.001)
  let nextZoom = previousZoom * zoomDelta
  nextZoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM)

  if (nextZoom === previousZoom) {
    return
  }

  const rect = surface.getBoundingClientRect()
  const cursorX = event.clientX - rect.left
  const cursorY = event.clientY - rect.top

  const offsetX = cursorX - panState.x
  const offsetY = cursorY - panState.y

  const scaleRatio = nextZoom / previousZoom

  panState.x = cursorX - offsetX * scaleRatio
  panState.y = cursorY - offsetY * scaleRatio

  zoom.value = nextZoom
  clampPan()
}

function setupObservers() {
  const surface = panSurface.value
  if (surface && !surfaceObserver) {
    surfaceObserver = new ResizeObserver(entries => {
      const entry = entries[0]
      viewportSize.width = entry.contentRect.width
      viewportSize.height = entry.contentRect.height
      clampPan()
    })
    surfaceObserver.observe(surface)
  }

  const host = svgHost.value
  if (host && !contentObserver) {
    contentObserver = new ResizeObserver(() => {
      updateContentSize()
    })
    contentObserver.observe(host)
  }
}

watch(
  () => props.svgMarkup,
  async () => {
    await nextTick()
    setupSvgLinks()
    updateContentSize()
    clampPan()
  }
)

watch(zoom, () => {
  clampPan()
})

onMounted(async () => {
  await nextTick()
  setupSvgLinks()
  setupObservers()
  updateContentSize()
  const surface = panSurface.value
  if (surface) {
    surface.style.cursor = 'grab'
  }
  clampPan()
})

onBeforeUnmount(() => {
  cleanupSvgLinkListeners()
  surfaceObserver?.disconnect()
  contentObserver?.disconnect()
  surfaceObserver = null
  contentObserver = null
})
</script>

<style scoped>
.ns-flow {
  position: relative;
  width: 100%;
  height: 100%;
  touch-action: none;
  overflow: hidden;
  background-color: transparent;
  cursor: grab;
}

.ns-flow__content {
  width: 100%;
  transform-origin: top left;
  will-change: transform;
}

.ns-flow__svg {
  width: 100%;
  height: auto;
}
</style>
