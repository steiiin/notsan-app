<template>
  <ns-flow :svg="flowSvg"></ns-flow>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import NsFlow from '@/components/library/NsFlow.vue'
import flowSvg from './flow.svg?raw'

const router = useRouter()

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
