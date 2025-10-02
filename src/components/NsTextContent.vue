<template>
  <div class="ns-text-content">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="css" scoped>

.ns-text-content {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

/* text styles */
.ns-text-content :deep(hr) {
  margin: 0px var(--ns-card-neg-padding) 0 -2px;
  padding: 0 0 0 0;
  border-bottom: 1px solid var(--ion-color-light);
}
.ns-text-content :deep(*) {
  margin: 0;
  padding: 0;
}
.ns-text-content :deep(h2) {
  font-size: 1em;
  font-weight: bold;
  margin-bottom: calc(-1 * var(--ns-text-padding));
}
.ns-text-content :deep(h2:last-child) {
  margin-bottom: 0;
}
.ns-text-content :deep(pre) {
  display: inline;
}
.ns-text-content :deep(p) {
  line-height: var(--ns-narrow-line);
}

.ns-text-content :deep(img) {
  border-radius: 4px;
}

.ns-text-content :deep(ul) {
  list-style: square inside;
}
.ns-text-content :deep(ul li) {
  line-height: 1.2;
}

</style>
