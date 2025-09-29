<template>
  <span class="ns-color-box" :style="boxStyle" aria-hidden="true"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  colorKey: string
}>()

const normalizeKey = (key: string): string => key.trim()

const backgroundColor = computed(() => {
  const key = normalizeKey(props.colorKey)

  if (!key)
    return 'transparent'

  const lowerKey = key.toLowerCase()

  if (lowerKey.startsWith('#') || lowerKey.startsWith('rgb') || lowerKey.startsWith('hsl'))
    return key

  if (key.startsWith('--'))
    return `var(${key})`

  return `var(--ns-broselow-code-${key}, var(--ns-color-${key}, ${key}))`
})

const boxStyle = computed(() => ({
  backgroundColor: backgroundColor.value,
}))
</script>

<style scoped>
.ns-color-box {
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 2px;
  vertical-align: middle;
  margin-inline-end: 0.4rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  .ns-color-box {
    border-color: rgba(255, 255, 255, 0.2);
  }
}
</style>
