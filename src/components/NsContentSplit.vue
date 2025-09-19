<template>
  <div class="ns-content-split">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right" :class="{ center }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  center?: boolean
}>()

</script>

<style lang="css" scoped>

.ns-content-split {
  display: flex;
  align-items: stretch;
  gap: .5rem;
  overflow: hidden;
}

.left {
  display: flex;
  width: 3rem;
  flex-shrink: 0;
  align-items: stretch;
  justify-content: center;
  position: relative;
}
.right {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: none;
  overflow: hidden;
  align-items: stretch;
}
.right.center {
  justify-content: center;
}

@media(max-width: 360px)
{
  .ns-content-split { gap: .2rem; }
  .left { width: 2rem; }
}

@media(max-width: 250px)
{
  .left { display: none; }
}
</style>
