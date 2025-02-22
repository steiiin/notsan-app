<template>
  <span :class="{ red, blue, orange, green, lila, grey }"><slot></slot></span>
</template>

<script setup lang="ts">
defineProps<{
  red?: boolean,
  blue?: boolean,
  orange?: boolean,
  green?: boolean,
  lila?: boolean,
  grey?: boolean,
}>()
</script>

<style lang="css" scoped>
.grey { opacity: 0.6; }
.red { color: var(--ns-color-red) }
.blue { color: var(--ns-color-blue) }
.orange { color: var(--ns-color-orange) }
.lila { color: var(--ns-color-lila) }
.green { color: var(--ns-color-green) }
</style>
