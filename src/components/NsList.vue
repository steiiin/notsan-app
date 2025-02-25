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
  padding: 0 var(--ns-card-padding) calc(0.5 * var(--ns-card-padding)) var(--ns-card-padding);
  margin: 0 var(--ns-card-neg-padding) calc(0.5 * var(--ns-card-padding)) var(--ns-card-neg-padding);
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: .2rem;
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
