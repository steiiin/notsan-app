<template>
  <ns-content-split class="ns-dosage-usage">
    <template #left>
      <span class="usage-tag">{{ usageTag }}</span>
    </template>
    <template #right>
      <div class="usage-content">
        <slot></slot>
      </div>
    </template>
  </ns-content-split>
</template>

<script setup lang="ts">
import NsContentSplit from '@/components/NsContentSplit.vue'
import { computed } from 'vue'
const props = defineProps<{
  type: "iv" | "im" | "pi" | "supp" | "none",
}>()
const usageTag = computed(() => {
  switch (props.type) {
    case "iv":
      return 'i.v.'
    case "im":
      return 'i.m.'
    case "pi":
      return 'p.i.'
    case "supp":
      return 'p.r.'
    default:
      return ''
  }
})
</script>

<style lang="css" scoped>
.usage-tag
{
  font-size: 0.7rem;
  letter-spacing: 1px;
}

.ns-dosage-usage
{
  margin-bottom: var(--ns-card-padding);
}
.usage-content
{
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

/* text styles */
.usage-content :deep(hr)
{
  margin: 0px var(--ns-card-neg-padding) 0 -2px;
  padding: 0 0 0 0;
  border-bottom: 1px solid var(--ion-color-light);
}
.usage-content :deep(*)
{
  margin: 0; padding: 0;
}
.usage-content :deep(h2)
{
  font-size: 1em;
  font-weight: bold;
  margin-bottom: calc(-1 * var(--ns-text-padding));
}
.usage-content :deep(h2:last-child)
{
  margin-bottom: 0;
}
.usage-content :deep(pre)
{
  display: inline;
}
.usage-content :deep(p)
{
  line-height: var(--ns-narrow-line);
}
</style>
