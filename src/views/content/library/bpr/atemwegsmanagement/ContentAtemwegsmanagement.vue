<template>
  <div id="ns-content-bg" class="flow-page">
    <NsFlow class="flow-surface" :svg-markup="svgMarkup" @action="handleAction" />
  </div>
</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import flowSvg from './flow.svg?raw'

const svgMarkup = flowSvg

function handleAction(key: string) {
  // Placeholder for action handling logic
  // Integrate with actual business logic when available
  console.debug('[ContentAtemwegsmanagement] handleAction', key)
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
