<template>
  <div class="ns-flow__padding">
    <div ref="panSurface" class="ns-flow" @pointerdown="onPointerDown" @pointerup="endPointer"
      @pointercancel="endPointer" @pointermove="onPointerMove" @wheel.prevent="onWheel">
      <div class="ns-flow__content" :style="contentStyle">
        <div ref="svgHost" class="ns-flow__svg" v-html="svg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clamp } from '@/service/math';
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  svg: string
}>()

const emit = defineEmits<{
  (event: 'action', key: string): void
}>()

// #region pan/move

const MIN_ZOOM = 1
const MAX_ZOOM = 2

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

const contentStyle = computed(() => ({
  width: `${contentSize.width * zoom.value}px`,
  height: `${contentSize.height * zoom.value}px`,
}))

const svgLinkListeners: Array<{ element: Element; handler: (event: Event) => void }> = []

let surfaceObserver: ResizeObserver | null = null
let contentObserver: ResizeObserver | null = null
function getInnerViewportSize() {
  const surface = panSurface.value
  if (!surface) return { width: 0, height: 0 }

  const cs = getComputedStyle(surface)
  const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
  const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)

  return {
    width: surface.clientWidth - padX,
    height: surface.clientHeight - padY,
    padLeft: parseFloat(cs.paddingLeft),
    padTop: parseFloat(cs.paddingTop),
  }
}
function clampScroll() {
  const surface = panSurface.value
  if (!surface) return

  const maxScrollLeft = Math.max(0, surface.scrollWidth - surface.clientWidth)
  const maxScrollTop = Math.max(0, surface.scrollHeight - surface.clientHeight)

  surface.scrollLeft = clamp(surface.scrollLeft, 0, maxScrollLeft)
  surface.scrollTop = clamp(surface.scrollTop, 0, maxScrollTop)
}

function cleanupSvgLinkListeners() {
  while (svgLinkListeners.length) {
    const { element, handler } = svgLinkListeners.pop()!
    element.removeEventListener('click', handler)
  }
}

function getSvgContentSize(): { width: number; height: number } | null {
  const host = svgHost.value
  const svgEl = host?.querySelector('svg') as SVGSVGElement | null
  if (!svgEl) return null

  // 1) viewBox first
  const vb = svgEl.viewBox && svgEl.viewBox.baseVal
  if (vb && vb.width > 0 && vb.height > 0) {
    return { width: vb.width, height: vb.height }
  }

  // 2) width/height attributes (numbers or with units)
  const wAttr = svgEl.getAttribute('width')
  const hAttr = svgEl.getAttribute('height')
  const wNum = wAttr ? parseFloat(wAttr) : NaN
  const hNum = hAttr ? parseFloat(hAttr) : NaN
  if (isFinite(wNum) && isFinite(hNum) && wNum > 0 && hNum > 0) {
    return { width: wNum, height: hNum }
  }

  // 3) last resort: getBBox (can throw if SVG not fully laid out)
  try {
    const bbox = svgEl.getBBox()
    if (bbox.width > 0 && bbox.height > 0) {
      return { width: bbox.width, height: bbox.height }
    }
  } catch {}
  return null
}

function updateContentSize() {
  const size = getSvgContentSize()
  if (!size) return
  contentSize.width = size.width
  contentSize.height = size.height
  nextTick(() => {
    clampScroll()
  })
}

function normalizeHref(rawHref: string): URL | null {
  if (!rawHref) {
    return null
  }

  let href = rawHref.trim()
  if (href.startsWith('file:///')) {
    href = href.slice('file://'.length)
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
  if (!host) return

  const svgEl = host.querySelector('svg') as SVGSVGElement | null
  if (!svgEl) return

  // IMPORTANT: measure FIRST
  updateContentSize()

  // THEN make it responsive
  svgEl.removeAttribute('width')
  svgEl.removeAttribute('height')
  svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  svgEl.style.width = '100%'
  svgEl.style.height = 'auto'
  svgEl.style.display = 'block'

  // link wiring unchanged...
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
      if (url.pathname) router.push(`${url.pathname}${url.search}`)
    }
    link.addEventListener('click', handler)
    svgLinkListeners.push({ element: link, handler })
  })
}

function onPointerDown(event: PointerEvent) {
  const surface = panSurface.value
  if (!surface) return

  // Mouse drag-to-scroll (unchanged)
  if (event.pointerType === 'mouse') {
    if (event.button !== 0) return
    panState.pointerId = event.pointerId
    const { padLeft = 0, padTop = 0 } = getInnerViewportSize()
    panState.startX = event.clientX - padLeft
    panState.startY = event.clientY - padTop
    panState.startScrollLeft = surface.scrollLeft
    panState.startScrollTop = surface.scrollTop
    surface.style.cursor = 'grabbing'
    surface.setPointerCapture?.(event.pointerId)
    return
  }

  // Touch/pen — track positions but DO NOT capture
  const rect = surface.getBoundingClientRect()
  const { padLeft = 0, padTop = 0 } = getInnerViewportSize()
  activePointers.set(event.pointerId, {
    x: event.clientX - rect.left - padLeft,
    y: event.clientY - rect.top - padTop,
  })

  if (activePointers.size === 2) {
    // enter pinch mode: disable native handling temporarily
    surface.style.touchAction = 'none'

    const [p1, p2] = [...activePointers.values()]
    pinch.isPinching = true
    pinch.initialZoom = zoom.value
    pinch.startDistance = dist(p1, p2)
    pinch.startScrollLeft = surface.scrollLeft
    pinch.startScrollTop = surface.scrollTop
  }
}

function onPointerMove(event: PointerEvent) {
  const surface = panSurface.value
  if (!surface) return

  const rect = surface.getBoundingClientRect()
  const { padLeft = 0, padTop = 0 } = getInnerViewportSize()

  // Update tracked touch/pen positions
  if (event.pointerType !== 'mouse' && activePointers.has(event.pointerId)) {
    activePointers.set(event.pointerId, {
      x: event.clientX - rect.left - padLeft,
      y: event.clientY - rect.top - padTop,
    })
  }

  // Pinch-zoom only (two fingers). Single-finger touch: let native scroll do it.
  if (pinch.isPinching && activePointers.size >= 2) {
    const [p1, p2] = [...activePointers.values()]
    const currentDistance = Math.max(1, dist(p1, p2))
    const scale = currentDistance / Math.max(1, pinch.startDistance)
    const prev = zoom.value
    const next = clamp(pinch.initialZoom * scale, MIN_ZOOM, MAX_ZOOM)
    if (next !== prev) {
      const mid = midpoint(p1, p2)
      const contentOffsetX = surface.scrollLeft + mid.x
      const contentOffsetY = surface.scrollTop + mid.y
      const ratio = next / prev
      zoom.value = next
      surface.scrollLeft = contentOffsetX * ratio - mid.x
      surface.scrollTop  = contentOffsetY * ratio - mid.y
      clampScroll()
    }
    return
  }

  // Mouse drag (unchanged)
  if (event.pointerType === 'mouse' && panState.pointerId === event.pointerId) {
    const deltaX = event.clientX - padLeft - panState.startX
    const deltaY = event.clientY - padTop - panState.startY
    surface.scrollLeft = panState.startScrollLeft - deltaX
    surface.scrollTop = panState.startScrollTop - deltaY
    clampScroll()
  }
}

function endPointer(event: PointerEvent) {
  const surface = panSurface.value
  if (!surface) return

  if (event.pointerType === 'mouse') {
    if (panState.pointerId === event.pointerId) {
      panState.pointerId = null
      surface.style.cursor = 'grab'
      if (surface.hasPointerCapture?.(event.pointerId)) {
        surface.releasePointerCapture(event.pointerId)
      }
    }
    clampScroll()
    return
  }

  // Touch/pen end
  if (activePointers.has(event.pointerId)) {
    activePointers.delete(event.pointerId)
  }

  // Leaving pinch mode? Restore native scrolling.
  if (pinch.isPinching && activePointers.size < 2) {
    pinch.isPinching = false
    surface.style.touchAction = 'pan-x pan-y'
  }

  if (panState.pointerId === event.pointerId) {
    panState.pointerId = null
  }

  clampScroll()
}

function onWheel(event: WheelEvent) {
  const surface = panSurface.value
  if (!surface) return

  const previousZoom = zoom.value
  const zoomDelta = Math.exp(-event.deltaY * 0.001)
  const nextZoom = clamp(previousZoom * zoomDelta, MIN_ZOOM, MAX_ZOOM)
  if (nextZoom === previousZoom) return

  const rect = surface.getBoundingClientRect()
  const { padLeft = 0, padTop = 0 } = getInnerViewportSize()
  const pointerOffsetX = event.clientX - rect.left - padLeft
  const pointerOffsetY = event.clientY - rect.top - padTop
  const contentOffsetX = surface.scrollLeft + pointerOffsetX
  const contentOffsetY = surface.scrollTop + pointerOffsetY

  const scaleRatio = nextZoom / previousZoom
  const nextScrollLeft = contentOffsetX * scaleRatio - pointerOffsetX
  const nextScrollTop = contentOffsetY * scaleRatio - pointerOffsetY

  zoom.value = nextZoom
  surface.scrollLeft = nextScrollLeft
  surface.scrollTop = nextScrollTop
  clampScroll()
}

const activePointers = new Map<number, { x: number; y: number }>()

const pinch = reactive({
  isPinching: false,
  initialZoom: 1,
  startDistance: 0,
  startScrollLeft: 0,
  startScrollTop: 0,
})

function dist(a: {x:number;y:number}, b:{x:number;y:number}) {
  const dx = a.x - b.x, dy = a.y - b.y
  return Math.hypot(dx, dy)
}

function midpoint(a:{x:number;y:number}, b:{x:number;y:number}) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
}

function setupObservers() {
  const surface = panSurface.value
  if (surface && !surfaceObserver) {
    surfaceObserver = new ResizeObserver(() => {
      clampScroll()
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
  () => props.svg,
  async () => {
    await nextTick()
    setupSvgLinks()
    updateContentSize()
    clampScroll()
  }
)

watch(zoom, () => {
  nextTick(() => {
    clampScroll()
  })
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
  clampScroll()
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
