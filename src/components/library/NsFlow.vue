<template>
  <div class="ns-flow__padding">
    <div ref="panSurface" class="ns-flow"
      @pointerdown="onPointerDown" @pointerup="onPointerUp">
      <div class="ns-flow__content" :style="contentStyle">
        <div ref="svgHost" class="ns-flow__svg" v-html="svg"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { approxEq, clamp } from '@/service/math'
import { FlowActionPayload } from '@/types/flow';
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  svg: string
}>()

const emit = defineEmits<{
  (event: 'action', payload: FlowActionPayload): void
}>()

const MIN_ZOOM = 0.1
const MAX_ZOOM = 1

const TAP_MAX_DELAY = 600;  // ms between taps
const TAP_MAX_DIST  = 50;   // px max movement to still count as a tap

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

const fitToViewport = () => {
  if (!panSurface.value || !contentSize.width || !contentSize.height) return
  if (!autoFit.value) return

  const { width: viewportWidth, height: viewportHeight } = getInnerViewportSize()
  if (viewportWidth <= 0 || viewportHeight <= 0) return

  const nextZoom = getZoomFitWidth()
  if (zoom.value !== nextZoom) zoom.value = nextZoom
}

const toggleZoomAt = (clientX: number, clientY: number) => {
  const surface = panSurface.value;
  if (!surface || !contentSize.width) return;

  const prev = zoom.value;
  const fit = getZoomFitWidth();

  // Toggle between "fit" and "1:1" semantically, not by exact numbers
  const goingToFit = !approxEq(prev, fit); // if not at fit, next state is fit; else 1:1
  const nextZoom = goingToFit ? fit : 1;

  // Keep the tap point stable even if zoom numerically doesn't change
  scrollToKeepPoint(clientX, clientY, prev, nextZoom);

  // Update autoFit no matter what
  autoFit.value = goingToFit;

  if (autoFit.value) {
    // Ensure we're snapped to exact fit
    zoom.value = fit;
    fitToViewport();
  } else {
    zoom.value = 1;
  }
};

const updateContentSize = () => {
  const size = getSvgContentSize()
  if (!size) return
  contentSize.width = size.width
  contentSize.height = size.height
  nextTick(() => {
    fitToViewport()
  })
}

const scrollToKeepPoint = (clientX: number, clientY: number, prevZoom: number, nextZoom: number) => {

  const viewEl = panSurface.value;
  const el = scrollEl.value;
  if (!viewEl || !el) return;

  const rect = viewEl.getBoundingClientRect();
  const { padLeft = 0, padTop = 0 } = getInnerViewportSize();

  const mx = clientX - rect.left - padLeft;
  const my = clientY - rect.top  - padTop;

  const contentOffsetX = el.scrollLeft + mx;
  const contentOffsetY = el.scrollTop  + my;
  const ratio = nextZoom / Math.max(prevZoom, 0.0001);

  zoom.value = nextZoom;
  scrollToPoint(
    contentOffsetX * ratio - mx,
    contentOffsetY * ratio - my
  );
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
      const keyword = url.searchParams.get('action')
      if (keyword) { emit('action', { key: keyword, source: event }); return }
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
// #region scrolling

const scrollEl = ref<HTMLElement | null>(null);
const ionEl = ref<HTMLIonContentElement | null>(null);

const resolveScrollHost = async () => {
  ionEl.value = panSurface.value?.closest('ion-content') as HTMLIonContentElement | null;
  scrollEl.value = ionEl.value
    ? await ionEl.value.getScrollElement()
    : panSurface.value;
};

const scrollToPoint = async (x: number, y: number) => {
  await nextTick()

  if (!scrollEl.value) { return }
  ionEl.value?.scrollToPoint(0, y, 0)
  panSurface.value!.scrollTo(x, 0)
}

// #endregion

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
  await resolveScrollHost()
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
