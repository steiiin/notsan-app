<template>
  <div id="ns-content-bg" class="flow-page">
    <div
      ref="panSurface"
      class="flow-surface"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerUp"
    >
      <div
        ref="svgHost"
        class="flow-content"
        :style="contentStyle"
        v-html="svgMarkup"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import flowSvg from './flow.svg?raw'

const router = useRouter()
const svgMarkup = flowSvg

const panSurface = ref<HTMLDivElement | null>(null)
const svgHost = ref<HTMLDivElement | null>(null)

const panState = reactive({
  x: 0,
  y: 0,
  pointerId: null as number | null,
  startX: 0,
  startY: 0,
})

const contentStyle = computed(() => ({
  transform: `translate3d(${panState.x}px, ${panState.y}px, 0)`,
}))

function handleAction(key: string) {
  // Placeholder for action handling logic
  // Integrate with actual business logic when available
  console.debug('[ContentAtemwegsmanagement] handleAction', key)
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

function onSvgLinkClick(event: Event) {
  event.preventDefault()
  event.stopPropagation()

  const target = event.currentTarget as SVGAElement | null
  const href = target?.getAttribute('xlink:href') || target?.getAttribute('href')
  const url = href ? normalizeHref(href) : null

  if (!url) {
    return
  }

  const action = url.searchParams.get('action')
  if (url.pathname) {
    router.push(`${url.pathname}${url.search}`)
  }

  if (action) {
    handleAction(action)
  }
}

const svgLinkListeners: Array<{ element: Element; handler: (event: Event) => void }> = []

function cleanupSvgLinkListeners() {
  while (svgLinkListeners.length) {
    const { element, handler } = svgLinkListeners.pop()!
    element.removeEventListener('click', handler)
  }
}

function setupSvg() {
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
    svgElement.style.height = '100%'
  }

  const links = host.querySelectorAll('a')
  links.forEach(link => {
    const handler = (event: Event) => onSvgLinkClick(event)
    link.addEventListener('click', handler)
    svgLinkListeners.push({ element: link, handler })
  })
}

function onPointerDown(event: PointerEvent) {
  const surface = panSurface.value
  if (!surface) {
    return
  }

  panState.pointerId = event.pointerId
  panState.startX = event.clientX - panState.x
  panState.startY = event.clientY - panState.y

  surface.style.cursor = 'grabbing'
  if (surface.setPointerCapture) {
    surface.setPointerCapture(event.pointerId)
  }
}

function onPointerMove(event: PointerEvent) {
  if (panState.pointerId !== event.pointerId) {
    return
  }

  panState.x = event.clientX - panState.startX
  panState.y = event.clientY - panState.startY
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
}

onMounted(async () => {
  await nextTick()
  setupSvg()
})

onBeforeUnmount(() => {
  cleanupSvgLinkListeners()
})
</script>

<style scoped>
.flow-page {
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  min-height: 100vh;
}

.flow-surface {
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
  touch-action: none;
  background-color: var(--ion-background-color, #fff);
  cursor: grab;
}

.flow-content {
  width: 100%;
  height: 100%;
  transform-origin: center;
  will-change: transform;
}
</style>
