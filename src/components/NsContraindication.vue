<template>
  <ns-list-item :class="type">
    <slot></slot>
  </ns-list-item>
</template>

<script setup lang="ts">
import NsListItem from '@/components/NsListItem.vue'
defineProps<{
  type: "intolerance" | "acute" | "chronic" | "pediatric"
}>()
</script>

<style lang="css" scoped>
.intolerance { color: var(--ns-color-blue); }
.acute { color: var(--ns-color-red); }
.chronic { color: var(--ns-color-orange); }
.pediatric { color: var(--ns-color-green); }
</style>
