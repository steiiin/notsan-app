<template>
  <ul class="ns-list" :class="{ divider }">
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  divider?: boolean
}>()
</script>

<style lang="css" scoped>
.ns-list
{
  padding: 0 1rem .5rem 1rem;
  margin: 0 -1rem .5rem -1rem;
  list-style: none;
}
.ns-list.divider
{
  border-bottom: 1px solid var(--ion-color-light);
}
.ns-list:last-of-type
{
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}
</style>
