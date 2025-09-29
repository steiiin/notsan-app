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

  return `var(--ns-colorbox-${key})`
})

const boxStyle = computed(() => ({
  backgroundColor: backgroundColor.value,
}))

</script>

<style>

/* Colors */

:root
{
  --ns-colorbox-igel1: #f1c5cc;
  --ns-colorbox-igel1_5: #adc9e8;
  --ns-colorbox-igel2: #9a9b9c;
  --ns-colorbox-igel2_5: #ffffff;
  --ns-colorbox-igel3: #ffe000;
  --ns-colorbox-igel4: #00b38a;
  --ns-colorbox-igel5: #f77a00;
}

</style>
<style scoped>

/* box style */

.ns-color-box {
  display: inline-block;
  width: 1.75rem;
  height: 1rem;
  vertical-align: top;
  border-radius: 2px;
  margin-inline-end: 0.4rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  .ns-color-box {
    border-color: rgba(255, 255, 255, 0.2);
  }
}

</style>
