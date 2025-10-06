<template>
  <ns-content-split class="ns-dosage-usage" :class="{ nodivider }" center :style="'min-height: ' + usageMinHeight + 'em'">
    <template #left>
      <span class="usage-divider" :class="usageColor">
        <span>{{ usageTag }}</span>
      </span>
    </template>
    <template #right>
      <ns-text-content class="usage-content">
        <slot></slot>
      </ns-text-content>
    </template>
  </ns-content-split>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import NsContentSplit from '@/components/NsContentSplit.vue'
import NsTextContent from '../NsTextContent.vue';

const props = defineProps<{
  type: "iv" | "im" | "nasal" | "pi" | "po" | "supp" | "invisible" | "none",
  label?: string,
  nodivider?: boolean,
  dense?: boolean,
}>()

const usageTagMap: Record<string, string> = {
  iv: 'intravenös',
  im: 'intramuskulär',
  nasal: 'nasal',
  pi: 'inhalativ',
  po: 'oral',
  supp: 'rektal',
  invisible: ' ',
  none: ' ',
}
const usageDenseTagMap: Record<string, string> = {
  iv: 'i.v.',
  im: 'i.m.',
  nasal: 'nasal',
  pi: 'inhal.',
  po: 'oral',
  supp: 'rekt.',
  invisible: ' ',
  none: ' ',
}
const usageTag = computed(() => props.label || (props.type && props.type in usageTagMap ? (props.dense ? usageDenseTagMap[props.type] : usageTagMap[props.type]) : null))

const usageColorMap: Record<string, string> = {
  iv: 'red',
  im: 'blue',
  nasal: 'green',
  pi: 'blue',
  po: 'grey',
  supp: 'orange',
  invisible: 'none',
  none: 'none',
}
const usageColor = computed(() => props.type && props.type in usageColorMap ? usageColorMap[props.type] : 'none')

const usageMinHeightMap: Record<string, number> = {
  iv: 5,
  im: 7,
  nasal: 3.5,
  pi: 5,
  po: 3,
  supp: 4,
  invisible: 0,
  none: 1.5,
}
const usageMinHeight = computed(() => props.dense ? 3.5 : (props.type && props.type in usageMinHeightMap ? usageMinHeightMap[props.type] : 1))


</script>

<style lang="css" scoped>

.ns-dosage-usage .usage-divider {
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
.ns-dosage-usage.nodivider .usage-divider {
  border-right: none;
}

.usage-divider span {
  margin: auto;
  writing-mode: vertical-lr;
}

.usage-divider.red {
  border-color: var(--ns-color-red-shade)
}
.usage-divider.blue {
  border-color: var(--ns-color-blue-shade)
}
.usage-divider.green {
  border-color: var(--ns-color-green-shade)
}
.usage-divider.orange {
  border-color: var(--ns-color-orange-shade)
}
.usage-divider.grey {
  border-color: var(--ns-color-grey-shade)
}
.usage-divider.none {
  border-color: transparent
}

.usage-content {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  padding-top: .25rem;
  padding-bottom: 0.25rem;
}

/* text styles */
.usage-content :deep(hr) {
  margin: 0px var(--ns-card-neg-padding) 0 -2px;
  padding: 0 0 0 0;
  border-bottom: 1px solid var(--ns-color-divider);
}
.usage-content :deep(*) {
  margin: 0;
  padding: 0;
}
.usage-content :deep(h2) {
  font-size: 1em;
  font-weight: bold;
  margin-bottom: calc(-1 * var(--ns-text-padding));
}
.usage-content :deep(h2:last-child) {
  margin-bottom: 0;
}
.usage-content :deep(pre) {
  display: inline;
}
.usage-content :deep(p) {
  line-height: var(--ns-narrow-line);
}

</style>
