<template>
  <span :class="{ red, blue, orange, green, lila, grey }"><slot></slot></span>
</template>

<script setup lang="ts">
defineProps<{
  red?: boolean,
  green?: boolean,
  blue?: boolean,
  orange?: boolean,
  lila?: boolean,
  grey?: boolean,
}>()
</script>

<style lang="css" scoped>
.red { color: var(--ns-color-red) }
.green { color: var(--ns-color-green) }
.blue { color: var(--ns-color-blue) }
.orange { color: var(--ns-color-orange) }
.lila { color: var(--ns-color-purple) }
.grey { opacity: 0.6; }
</style>
