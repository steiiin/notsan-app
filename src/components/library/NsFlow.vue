<template>
  <div class="ns-flow__padding">
    <div ref="panSurface" class="ns-flow" @pointerdown="onPointerDown" @pointerup="endPointer"
      @pointercancel="endPointer" @pointermove="onPointerMove">
      <div class="ns-flow__content" :style="contentStyle">
        <div ref="svgHost" class="ns-flow__svg" v-html="svg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clamp } from '@/service/math'
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// #region Props & Emits
const props = defineProps<{
  svg: string
}>()

const emit = defineEmits<{
  (event: 'action', key: string): void
}>()
// #endregion

// #region Constants
const MIN_ZOOM = 0.5
const MAX_ZOOM = 1.5
// #endregion

// #region State
const panSurface = ref<HTMLDivElement | null>(null)
const svgHost = ref<HTMLDivElement | null>(null)

const contentSize = reactive({ width: 0, height: 0 })
const zoom = ref(1)

const panState = reactive({
  pointerId: null as number | null,
  startX: 0,
  startY: 0,
  startScrollLeft: 0,
  startScrollTop: 0,
})

const activePointers = new Map<number, { x: number; y: number }>()

const pinch = reactive({
  isPinching: false,
  initialZoom: 1,
  startDistance: 0,
  startScrollLeft: 0,
  startScrollTop: 0,
})
// #endregion

// #region Computed
const contentStyle = computed(() => ({
  width: `${contentSize.width * zoom.value}px`,
  height: `${contentSize.height * zoom.value}px`,
}))
// #endregion

// #region Internal References
const svgLinkListeners: Array<{ element: Element; handler: (event: Event) => void }> = []
let surfaceObserver: ResizeObserver | null = null
let contentObserver: ResizeObserver | null = null
let didInitialFit = false
// #endregion

// #region Helpers
const getInnerViewportSize = () => {
  const surface = panSurface.value
  if (!surface) {
    return { width: 0, height: 0, padLeft: 0, padTop: 0 }
  }

  const styles = getComputedStyle(surface)
  const padLeft = parseFloat(styles.paddingLeft)
  const padRight = parseFloat(styles.paddingRight)
  const padTop = parseFloat(styles.paddingTop)
  const padBottom = parseFloat(styles.paddingBottom)

  return {
    width: surface.clientWidth - padLeft - padRight,
    height: surface.clientHeight - padTop - padBottom,
    padLeft,
    padTop,
  }
}

const clampScroll = () => {
  const surface = panSurface.value
  if (!surface) return

  const maxScrollLeft = Math.max(0, surface.scrollWidth - surface.clientWidth)
  const maxScrollTop = Math.max(0, surface.scrollHeight - surface.clientHeight)

  surface.scrollLeft = clamp(surface.scrollLeft, 0, maxScrollLeft)
  surface.scrollTop = clamp(surface.scrollTop, 0, maxScrollTop)
}

const cleanupSvgLinkListeners = () => {
  while (svgLinkListeners.length) {
    const { element, handler } = svgLinkListeners.pop()!
    element.removeEventListener('click', handler)
  }
}

const getSvgContentSize = (): { width: number; height: number } | null => {
  const host = svgHost.value
  const svgEl = host?.querySelector('svg') as SVGSVGElement | null
  if (!svgEl) return null

  const viewBox = svgEl.viewBox?.baseVal
  if (viewBox && viewBox.width > 0 && viewBox.height > 0) {
    return { width: viewBox.width, height: viewBox.height }
  }

  const widthAttr = svgEl.getAttribute('width')
  const heightAttr = svgEl.getAttribute('height')
  const widthValue = widthAttr ? parseFloat(widthAttr) : NaN
  const heightValue = heightAttr ? parseFloat(heightAttr) : NaN
  if (isFinite(widthValue) && isFinite(heightValue) && widthValue > 0 && heightValue > 0) {
    return { width: widthValue, height: heightValue }
  }

  try {
    const bbox = svgEl.getBBox()
    if (bbox.width > 0 && bbox.height > 0) {
      return { width: bbox.width, height: bbox.height }
    }
  } catch (error) {
    console.warn('Failed to read SVG bounding box', error)
  }

  return null
}

const fitToViewport = ({ center = true } = {}) => {
  const surface = panSurface.value
  if (!surface || !contentSize.width || !contentSize.height) return

  const { width: viewportWidth, height: viewportHeight } = getInnerViewportSize()
  if (viewportWidth <= 0 || viewportHeight <= 0) return

  const scaleToFit = viewportWidth / contentSize.width
  const nextZoom = clamp(scaleToFit, MIN_ZOOM, MAX_ZOOM)

  if (zoom.value !== nextZoom) {
    zoom.value = nextZoom
  }

  if (center) {
    const contentWidth = contentSize.width * zoom.value
    const contentHeight = contentSize.height * zoom.value
    surface.scrollLeft = Math.max(0, (contentWidth - viewportWidth) / 2)
    surface.scrollTop = Math.max(0, (contentHeight - viewportHeight) / 2)
    clampScroll()
  }
}

const updateContentSize = () => {
  const size = getSvgContentSize()
  if (!size) return

  contentSize.width = size.width
  contentSize.height = size.height

  nextTick(() => {
    clampScroll()
    fitToViewport()
  })
}

const normalizeHref = (rawHref: string): URL | null => {
  if (!rawHref) return null

  let href = rawHref.trim()
  if (href.startsWith('file:///')) {
    href = href.slice('file://'.length)
  }

  try {
    return new URL(href, 'https://local.app')
  } catch {
    console.warn('Invalid link in flow diagram', rawHref)
    return null
  }
}

const setupSvgLinks = () => {
  cleanupSvgLinkListeners()
  const host = svgHost.value
  if (!host) return

  const svgEl = host.querySelector('svg') as SVGSVGElement | null
  if (!svgEl) return

  updateContentSize()

  svgEl.removeAttribute('width')
  svgEl.removeAttribute('height')
  svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  svgEl.style.width = '100%'
  svgEl.style.height = 'auto'
  svgEl.style.display = 'block'

  const links = host.querySelectorAll('a')
  links.forEach(link => {
    const handler = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()

      const rawHref = link.getAttribute('xlink:href') || link.getAttribute('href')
      const url = rawHref ? normalizeHref(rawHref) : null
      if (!url) return

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

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.hypot(dx, dy)
}

const midpoint = (a: { x: number; y: number }, b: { x: number; y: number }) => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
})
// #endregion

// #region Pointer Handlers
const onPointerDown = (event: PointerEvent) => {
  const surface = panSurface.value
  if (!surface) return

  const rect = surface.getBoundingClientRect()
  const { padLeft = 0, padTop = 0 } = getInnerViewportSize()

  activePointers.set(event.pointerId, {
    x: event.clientX - rect.left - padLeft,
    y: event.clientY - rect.top - padTop,
  })

  if (activePointers.size === 2) {
    surface.style.touchAction = 'none'

    const [p1, p2] = [...activePointers.values()]
    pinch.isPinching = true
    pinch.initialZoom = zoom.value
    pinch.startDistance = dist(p1, p2)
    pinch.startScrollLeft = surface.scrollLeft
    pinch.startScrollTop = surface.scrollTop
  }
}

const onPointerMove = (event: PointerEvent) => {
  const surface = panSurface.value
  if (!surface) return

  const rect = surface.getBoundingClientRect()
  const { padLeft = 0, padTop = 0 } = getInnerViewportSize()

  if (event.pointerType !== 'mouse' && activePointers.has(event.pointerId)) {
    activePointers.set(event.pointerId, {
      x: event.clientX - rect.left - padLeft,
      y: event.clientY - rect.top - padTop,
    })
  }

  if (pinch.isPinching && activePointers.size >= 2) {
    const [p1, p2] = [...activePointers.values()]
    const currentDistance = Math.max(1, dist(p1, p2))
    const scale = currentDistance / Math.max(1, pinch.startDistance)
    const previousZoom = zoom.value
    const nextZoom = clamp(pinch.initialZoom * scale, MIN_ZOOM, MAX_ZOOM)

    if (nextZoom !== previousZoom) {
      const mid = midpoint(p1, p2)
      const contentOffsetX = surface.scrollLeft + mid.x
      const contentOffsetY = surface.scrollTop + mid.y
      const ratio = nextZoom / previousZoom

      zoom.value = nextZoom
      surface.scrollLeft = contentOffsetX * ratio - mid.x
      surface.scrollTop = contentOffsetY * ratio - mid.y
      clampScroll()
    }
    return
  }

  if (event.pointerType === 'mouse' && panState.pointerId === event.pointerId) {
    const deltaX = event.clientX - padLeft - panState.startX
    const deltaY = event.clientY - padTop - panState.startY
    surface.scrollLeft = panState.startScrollLeft - deltaX
    surface.scrollTop = panState.startScrollTop - deltaY
    clampScroll()
  }
}

const endPointer = (event: PointerEvent) => {
  const surface = panSurface.value
  if (!surface) return

  if (activePointers.has(event.pointerId)) {
    activePointers.delete(event.pointerId)
  }

  if (pinch.isPinching && activePointers.size < 2) {
    pinch.isPinching = false
    surface.style.touchAction = 'pan-x pan-y'
  }

  if (panState.pointerId === event.pointerId) {
    panState.pointerId = null
  }

  clampScroll()
}
// #endregion

// #region Observers
const setupObservers = () => {
  const surface = panSurface.value
  if (surface && !surfaceObserver) {
    surfaceObserver = new ResizeObserver(() => {
      clampScroll()

      const { width: viewportWidth, height: viewportHeight } = getInnerViewportSize()
      if (viewportWidth > 0 && viewportHeight > 0) {
        if (!didInitialFit) {
          didInitialFit = true
        }
        requestAnimationFrame(() => fitToViewport())
      }
    })
    surfaceObserver.observe(surface)
  }

  const host = svgHost.value
  if (host && !contentObserver) {
    contentObserver = new ResizeObserver(() => {
      updateContentSize()
      didInitialFit = false
    })
    contentObserver.observe(host)
  }
}
// #endregion

// #region Watchers
watch(
  () => props.svg,
  async () => {
    await nextTick()
    setupSvgLinks()
  }
)

watch(zoom, () => {
  nextTick(() => {
    clampScroll()
  })
})
// #endregion

// #region Lifecycle
onMounted(async () => {
  await nextTick()
  setupSvgLinks()
  setupObservers()
  updateContentSize()
  nextTick(() => fitToViewport())
})

onBeforeUnmount(() => {
  cleanupSvgLinkListeners()
  surfaceObserver?.disconnect()
  contentObserver?.disconnect()
  surfaceObserver = null
  contentObserver = null
})
// #endregion
</script>

<style scoped>
.ns-flow {
  position: relative;
  overflow: auto;
  touch-action: pan-y pan-x;
}

.ns-flow__padding {
  padding: calc(0.5 * var(--ns-card-padding));
}
.ns-flow__content {
  display: block;
}

.ns-flow__svg {
  width: 100%;
  height: auto;
  display: block;
}
</style>
