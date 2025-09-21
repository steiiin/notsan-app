<template>
  <ul class="ns-list" :class="{ divider }">
    <h2 v-if="subtitle">{{ subtitle }}</h2>
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  subtitle?: string
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

.ns-list h2
{
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
  background: var(--ion-color-light);
  color: var(--ion-color-light-contrast);
  padding: 4px var(--ns-card-padding);
  margin: 0 var(--ns-card-neg-padding);
}
</style>
