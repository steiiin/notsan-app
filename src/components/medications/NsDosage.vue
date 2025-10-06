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
import { computed } from 'vue'

const props = defineProps<{
  dosage: Dosage
}>()

const dosageColorMap: Record<string, string> = {
  adult: 'blue',
  child: 'red',
  youth: 'orange',
}
const dosageColor = computed(() => props.dosage.color || (props.dosage.type && props.dosage.type in dosageColorMap ? dosageColorMap[props.dosage.type] : null))

const dosageTargetMap: Record<string, string> = {
  adult: 'Erwachsene',
  child: 'Kinder',
  youth: 'Jugendliche',
}
const dosageTarget = computed(() => props.dosage.target || (props.dosage.type && props.dosage.type in dosageTargetMap ? dosageTargetMap[props.dosage.type] : null))

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
  flex-shrink: 0;

  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: pre;
  overflow: hidden;
}
.ns-dosage .info
{
  display: flex;
  gap: 0 .2rem;
  flex-wrap: wrap;
  align-items: center;
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
  font-weight: bold;
}
.hint
{
  font-size: 0.9em;
}

@media(max-width: 450px)
{
  .ns-dosage .target { width: 110px; }
}
@media(max-width: 340px)
{
  .ns-dosage { flex-wrap: wrap; }
  .ns-dosage .target { min-width: 110px; }
}

/* colors */
.ns-dosage.red { color: var(--ns-color-red) }
.ns-dosage.blue { color: var(--ns-color-blue) }
.ns-dosage.orange { color: var(--ns-color-orange) }
.ns-dosage.lila { color: var(--ns-color-purple) }
.ns-dosage.grey { color: var(--ns-color-grey) }
.ns-dosage.green { color: var(--ns-color-green) }

</style>
