<template>
  <ns-flow @action="handleAction" :svg="flowSvg"></ns-flow>
  <ns-content-group title="hello">
    hello
  </ns-content-group>
</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import flowSvg from './flow.svg?raw'

function handleAction(key: string) {
  // Placeholder for action handling logic
  // Integrate with actual business logic when available
  console.debug('[ContentAtemwegsmanagement] handleAction', key)
}
</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
