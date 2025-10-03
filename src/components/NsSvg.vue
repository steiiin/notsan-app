<template>
  <div class="ns-svg" v-html="svg"></div>
</template>

<script setup lang="ts">
defineProps<{ svg: string }>();
</script>

<style scoped>
.ns-svg {
  display: flex;
}

.ns-svg :deep(svg) {
  width: 100%;
  height: auto;
}
</style>
