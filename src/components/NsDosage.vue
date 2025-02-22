<template>
  <div class="ns-dosage" :class="dosageColor">
    <span class="target" v-if="dosageTarget">{{ dosageTarget }}</span>
    <span class="info">
      <span class="dose">{{ dosage.dose }}</span>
      <span class="hint" v-if="dosage.hint">{{ dosage.hint }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { Dosage } from '@/types/dosage'
import { computed } from 'vue';
const props = defineProps<{
  dosage: Dosage
}>()

const dosageColor = computed(() => {
  if (props.dosage.type === 'adult') {
    return 'blue' }
  else if (props.dosage.type === 'child') {
    return 'red' }
  else if (props.dosage.color) {
    return props.dosage.color }
  else {
    return null }
})

const dosageTarget = computed(() => {
  if (props.dosage.type === 'adult') {
    return 'Erwachsene' }
  else if (props.dosage.type === 'child') {
    return 'Kinder' }
  else if (props.dosage.target) {
    return props.dosage.target }
  else {
    return null }
})

</script>

<style lang="css" scoped>

/* layout */
.ns-dosage
{
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  gap: 0 .2rem;
}
.ns-dosage .target
{
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ns-dosage .info
{
  display: flex;
  gap: 0 .2rem;
  flex-wrap: wrap;
  overflow: hidden;
}
.ns-dosage .info > span
{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dose
{
  font-family: monospace;
  white-space: pre !important;
}

@media(max-width: 450px) {
  .ns-dosage .target { width: 110px; }
}
@media(max-width: 340px) {
  .ns-dosage { flex-wrap: wrap; }
  .ns-dosage .target { min-width: 110px; }
}

/* text styles */
.target
{
  text-transform: uppercase;
}
.dose
{
  font-weight: bold;
}
.hint
{
  font-size: 0.9em;
}

/* colors */
.ns-dosage.red { color: var(--ns-color-red) }
.ns-dosage.blue { color: var(--ns-color-blue) }
.ns-dosage.orange { color: var(--ns-color-orange) }
.ns-dosage.lila { color: var(--ns-color-lila) }
.ns-dosage.green { color: var(--ns-color-green) }

</style>
