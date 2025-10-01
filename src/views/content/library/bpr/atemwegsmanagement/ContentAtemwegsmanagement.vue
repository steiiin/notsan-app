<template>
  <ns-flow @action="handleAction" :svg="flowSvg"></ns-flow>
</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import flowSvg from './flow.svg?raw'

function handleAction(key: string) {
  // Placeholder for action handling logic
  // Integrate with actual business logic when available
  console.debug('[ContentAtemwegsmanagement] handleAction', key)
}
</script>

<style scoped>
</style>
