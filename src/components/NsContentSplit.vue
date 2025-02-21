<template>
  <div class="ns-content-split"
    ><span class="left"><slot name="left"></slot></span
    ><span class="right"><slot name="right"></slot></span>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="css" scoped>

/* layout styles */
.ns-content-split
{
  display: flex;
  align-items: center;
  gap: .5rem;
  overflow: hidden;
}
.left
{
  display: flex;
  width: 3rem;
  justify-content: center;
  flex-shrink: 0;
}
.right
{
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: none;
  overflow: hidden;
}

@media(max-width: 360px) {
  .ns-content-split { gap: .2rem; }
  .left { width: 2rem; }
}
@media(max-width: 250px) {
  .left { display: none; }
}

</style>
