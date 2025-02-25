<template>
  <ns-content-split class="ns-dosage-usage" :class="{ 'nodivider': nodivider  }">
    <template #left>
      <span class="usage-divider" :class="usageColor">
        <span>{{ usageTag }}</span>
      </span>
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
  type: "iv" | "im" | "nasal" | "pi" | "supp" | "none",
  label?: string,
  nodivider?: boolean,
}>()
const usageTag = computed(() => {
  if (props.label) { return props.label}
  switch (props.type) {
    case "iv":
      return 'intravenös'
    case "im":
      return 'intramuskulär'
    case "nasal":
      return 'intranasal'
    case "pi":
      return 'inhalativ'
    case "supp":
      return 'rektal'
    default:
      return ' '
  }
})
const usageColor = computed(() => {
  switch (props.type) {
    case "iv":
      return 'red'
    case "im":
      return 'blue'
    case "nasal":
      return 'green'
    case "pi":
      return 'blue'
    case "supp":
      return 'orange'
    default:
      return 'none'
  }
})
</script>

<style lang="css" scoped>
.usage-divider
{
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: .5rem;
  bottom: 0;
  font-size: 0.7rem;
  letter-spacing: 1px;
  border-right: 3px solid;
}
.ns-dosage-usage.nodivider .usage-divider
{
  border-right: none;
}
.usage-divider span
{
  margin: auto 0;
  writing-mode: vertical-lr;
}

.usage-divider.red { border-color: rgba(var(--ns-color-red-rgb), .2) }
.usage-divider.blue { border-color: rgba(var(--ns-color-blue-rgb), .2) }
.usage-divider.green { border-color: rgba(var(--ns-color-green-rgb), .2) }
.usage-divider.orange { border-color: rgba(var(--ns-color-orange-rgb), .2) }
.usage-divider.none { border-color: transparent }

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
