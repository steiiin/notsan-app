<template>
  <ns-content-split>
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
  type: "iv",
}>()
const usageTag = computed(() => {
  switch (props.type) {
    case "iv":
      return 'i.v.'
  }
})
</script>

<style lang="css" scoped>
.usage-tag
{
  font-size: 0.7rem;
  letter-spacing: 1px;
}

/* text styles */
.usage-content :deep(hr)
{
  margin: 0px var(--ns-card-neg-padding) var(--ns-text-padding) -2px;
  padding: var(--ns-text-padding) 0 0 0;
  border-bottom: 1px solid var(--ion-color-light);
}
.usage-content :deep(p)
{
  margin-bottom: var(--ns-text-padding);
}
.usage-content :deep(p:last-child)
{
  margin-bottom: 0;
}
</style>
