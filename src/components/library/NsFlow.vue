<template>
  <div class="ns-flow__padding">
    <div ref="panSurface" class="ns-flow" @dblclick="onDblClick"
      @pointerdown="onPointerDown" @pointerup="onPointerUp">
      <div class="ns-flow__content" :style="contentStyle">
        <div ref="svgHost" class="ns-flow__svg" v-html="svg"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clamp } from '@/service/math'
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  svg: string
}>()

const emit = defineEmits<{
  (event: 'action', key: string): void
}>()

const MIN_ZOOM = 0.1
const MAX_ZOOM = 1

const TAP_MAX_DELAY = 300;  // ms between taps
const TAP_MAX_DIST  = 22;   // px max movement to still count as a tap


// Refs
const panSurface = ref<HTMLDivElement | null>(null)
const svgHost = ref<HTMLDivElement | null>(null)

// content geometry and zoom
const contentSize = reactive({ width: 0, height: 0 })
const zoom = ref(1)
const autoFit = ref(true)

const contentStyle = computed(() => ({
  width: `${contentSize.width * zoom.value}px`,
  height: `${contentSize.height * zoom.value}px`,
}))

// #region helpers

const getInnerViewportSize = () => {
  const surface = panSurface.value
  if (!surface) return { width: 0, height: 0, padLeft: 0, padTop: 0 }
  const styles = getComputedStyle(surface)
  const padLeft = parseFloat(styles.paddingLeft) || 0
  const padRight = parseFloat(styles.paddingRight) || 0
  const padTop = parseFloat(styles.paddingTop) || 0
  const padBottom = parseFloat(styles.paddingBottom) || 0
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
  const maxLeft = Math.max(0, surface.scrollWidth - surface.clientWidth)
  const maxTop = Math.max(0, surface.scrollHeight - surface.clientHeight)
  surface.scrollLeft = clamp(surface.scrollLeft, 0, maxLeft)
  surface.scrollTop = clamp(surface.scrollTop, 0, maxTop)
}

const getSvgContentSize = (): { width: number; height: number } | null => {
  const host = svgHost.value
  const svgEl = host?.querySelector('svg') as SVGSVGElement | null
  if (!svgEl) return null

  const vb = svgEl.viewBox?.baseVal
  if (vb && vb.width > 0 && vb.height > 0) {
    return { width: vb.width, height: vb.height }
  }

  const w = parseFloat(svgEl.getAttribute('width') || '')
  const h = parseFloat(svgEl.getAttribute('height') || '')
  if (isFinite(w) && isFinite(h) && w > 0 && h > 0) return { width: w, height: h }

  try {
    const bbox = svgEl.getBBox()
    if (bbox.width > 0 && bbox.height > 0) return { width: bbox.width, height: bbox.height }
  } catch { /* ignore */ }

  return null
}

const getZoomFitWidth = () => {
  const { width: viewportWidth } = getInnerViewportSize()
  if (!contentSize.width || viewportWidth <= 0) return 1
  return clamp(viewportWidth / contentSize.width, MIN_ZOOM, MAX_ZOOM)
}

const fitToViewport = ({ center = true } = {}) => {
  if (!panSurface.value || !contentSize.width || !contentSize.height) return
  if (!autoFit.value) return

  const { width: viewportWidth, height: viewportHeight } = getInnerViewportSize()
  if (viewportWidth <= 0 || viewportHeight <= 0) return

  const nextZoom = getZoomFitWidth()
  if (zoom.value !== nextZoom) zoom.value = nextZoom

  if (center) {
    const contentW = contentSize.width * zoom.value
    const contentH = contentSize.height * zoom.value
    panSurface.value.scrollLeft = Math.max(0, (contentW - viewportWidth) / 2)
    panSurface.value.scrollTop = Math.max(0, (contentH - viewportHeight) / 2)
    clampScroll()
  }
}

const toggleZoomAt = (clientX: number, clientY: number) => {
  const surface = panSurface.value;
  if (!surface || !contentSize.width) return;

  const prev = zoom.value;
  const target = prev < 1 ? 1 : getZoomFitWidth();

  if (target === prev) return;

  // Keep the tap point stable across the zoom change
  scrollToKeepPoint(clientX, clientY, prev, target);

  // When at 1:1 we disable auto-fit; when back to fit we enable it,
  // but we DO NOT center right away (feels jumpy). If you want to
  // re-run fit sizing without centering, do this:
  if (target === 1) {
    autoFit.value = false;
  } else {
    autoFit.value = true;
    // ensure dimensions are consistent but don't recentre:
    fitToViewport({ center: false });
  }
};

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

const scrollToKeepPoint = (clientX: number, clientY: number, prevZoom: number, nextZoom: number) => {
  const surface = panSurface.value;
  if (!surface) return;

  const rect = surface.getBoundingClientRect();
  const { padLeft = 0, padTop = 0 } = getInnerViewportSize();

  const mx = clientX - rect.left - padLeft; // pointer inside the surface
  const my = clientY - rect.top  - padTop;

  const contentOffsetX = surface.scrollLeft + mx;
  const contentOffsetY = surface.scrollTop  + my;

  const ratio = nextZoom / Math.max(prevZoom, 0.0001); // guard div/0

  // write scrolls *after* you update zoom
  zoom.value = nextZoom;
  surface.scrollLeft = contentOffsetX * ratio - mx;
  surface.scrollTop  = contentOffsetY * ratio - my;
  clampScroll();
};

let surfaceObserver: ResizeObserver | null = null
let contentObserver: ResizeObserver | null = null

// #endregion
// #region Link-handling

const normalizeHref = (rawHref: string): URL | null => {
  if (!rawHref) return null
  let href = rawHref.trim()
  if (href.startsWith('file:///')) href = href.slice('file://'.length)
  try { return new URL(href, 'https://local.app') } catch { return null }
}

const svgLinkListeners: Array<{ element: Element; handler: (event: Event) => void }> = []
const cleanupSvgLinkListeners = () => {
  while (svgLinkListeners.length) {
    const { element, handler } = svgLinkListeners.pop()!
    element.removeEventListener('click', handler)
  }
}

const setupSvgLinks = () => {
  cleanupSvgLinkListeners()
  const host = svgHost.value
  if (!host) return

  const svgEl = host.querySelector('svg') as SVGSVGElement | null
  if (!svgEl) return

  // Make the inner SVG responsive; wrapper scales by contentStyle
  svgEl.removeAttribute('width')
  svgEl.removeAttribute('height')
  svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  svgEl.style.width = '100%'
  svgEl.style.height = 'auto'
  svgEl.style.display = 'block'

  updateContentSize()

  const links = host.querySelectorAll('a')
  links.forEach(link => {
    const handler = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()
      const rawHref = link.getAttribute('xlink:href') || link.getAttribute('href')
      const url = rawHref ? normalizeHref(rawHref) : null
      if (!url) return
      const action = url.searchParams.get('action')
      if (action) { emit('action', action); return }
      if (url.pathname) router.push(`${url.pathname}${url.search}`)
    }
    link.addEventListener('click', handler)
    svgLinkListeners.push({ element: link, handler })
  })
}

// #endregion
// #region doubleTap-detector

  // Track last tap for touch
  const lastTap = reactive({ time: 0, x: 0, y: 0 });
  // Track the current touch down position to filter scroll-jitters
  const touchDown = new Map<number, { x: number; y: number }>();


// #endregion

// Desktop: double-click toggles zoom (ignore links)
const onDblClick = (e: MouseEvent) => {
  const target = e.target as Element | null;
  if (target?.closest('a')) return; // let links work
  toggleZoomAt(e.clientX, e.clientY);
};

// Touch: record down position (to measure move distance)
const onPointerDown = (e: PointerEvent) => {
  if (e.pointerType !== 'touch') return;
  touchDown.set(e.pointerId, { x: e.clientX, y: e.clientY });
};

// Touch: detect double-tap on pointerup
const onPointerUp = (e: PointerEvent) => {
  if (e.pointerType !== 'touch') return;

  const target = e.target as Element | null;
  if (target?.closest('a')) {
    touchDown.delete(e.pointerId);
    return; // don’t hijack link taps
  }

  const start = touchDown.get(e.pointerId);
  touchDown.delete(e.pointerId);
  if (!start) return;

  const dx = e.clientX - start.x;
  const dy = e.clientY - start.y;
  const moved = Math.hypot(dx, dy);
  if (moved > TAP_MAX_DIST) return; // treat as scroll, not tap

  const now = e.timeStamp;
  const dt = now - lastTap.time;
  const isNear =
    Math.abs(e.clientX - lastTap.x) <= TAP_MAX_DIST &&
    Math.abs(e.clientY - lastTap.y) <= TAP_MAX_DIST;

  if (dt <= TAP_MAX_DELAY && isNear) {
    // it's a double-tap
    e.preventDefault();
    e.stopPropagation();
    toggleZoomAt(e.clientX, e.clientY);
    lastTap.time = 0; // reset sequence
  } else {
    // first tap in sequence
    lastTap.time = now;
    lastTap.x = e.clientX;
    lastTap.y = e.clientY;
  }
};

const setupObservers = () => {
  const surface = panSurface.value
  if (surface && !surfaceObserver) {
    surfaceObserver = new ResizeObserver(() => {
      clampScroll()
      requestAnimationFrame(() => fitToViewport())
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

watch(() => props.svg, async () => {
  await nextTick()
  setupSvgLinks()
})

onMounted(async () => {
  await nextTick()
  setupSvgLinks()
  setupObservers()
  updateContentSize()
  autoFit.value = true
  nextTick(() => fitToViewport())
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
