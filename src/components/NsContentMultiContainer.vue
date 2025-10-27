<template>
  <div class="ns-content-multi-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineProps<{
  cardsize?: number,
}>()
const style = computed
</script>

<style lang="css" scoped>

.ns-content-multi-container {
  display: flex;
}
.ns-content-multi-container > * {
  width: 50%;
}

@media only screen and (max-width: 600px) {
  .ns-content-multi-container {
    flex-direction: column;
  }
  .ns-content-multi-container > * {
    width: unset;
  }
}


</style>
