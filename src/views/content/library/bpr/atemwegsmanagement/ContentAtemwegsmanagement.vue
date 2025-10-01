<template>
  <div id="ns-content-bg" class="flow-page">
    <NsFlow
      class="flow-surface"
      :svg-markup="svgMarkup"
      @link-activate="onFlowLinkActivate"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import NsFlow from '@/components/library/NsFlow.vue'
import flowSvg from './flow.svg?raw'

const router = useRouter()
const svgMarkup = flowSvg

interface FlowLinkActivatePayload {
  href: string | null
  element: Element
  event: Event
}

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

function onFlowLinkActivate(payload: FlowLinkActivatePayload) {
  const url = payload.href ? normalizeHref(payload.href) : null

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
}
</style>
