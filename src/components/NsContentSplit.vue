<template>
  <div class="ns-content-split">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
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
