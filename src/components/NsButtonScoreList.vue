<template>
  <div class="ns-button-score-list">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.ns-button-score-list :deep(.ns-button-score-group:nth-child(even)) {
  background-color: var(--ion-color-light);
  margin-inline: var(--ns-card-neg-padding);
  padding-inline: var(--ns-card-padding);
}
</style>