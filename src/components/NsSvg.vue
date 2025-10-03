<template>
  <div class="ns-svg" :class="{ 'no-border': noframe }" v-html="svg"></div>
</template>

<script setup lang="ts">
defineProps<{ svg: string, noframe?: boolean }>();
</script>

<style scoped>
.ns-svg {
  display: flex;
  border: 2px solid var(--ion-color-dark-shade);
  border-radius: 4px;
  max-width: 540px;
}
.ns-svg.no-border {
  border: none;
}

.ns-svg :deep(svg) {
  width: 100%;
  height: auto;
}
</style>
