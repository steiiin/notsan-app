<template>
  <template v-if="enabled">
    <template v-if="isApplicable">
      <ns-dosage :dosage="{ target: 'Dimetinden', dose: `${weightDose}mg`, hint: `(${weightHint})` }"></ns-dosage>
    </template>
    <template v-else>
      <ns-dosage :dosage="{ target: 'Dimetinden', dose: 'Keine', hint: 'Gabe' }"></ns-dosage>
    </template>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Dimetinden) ?? true)

// ########################################################################################################

import NsContentGroup from '@/components/NsContentGroup.vue';
import NsDosageUsage from '@/components/medications/NsDosageUsage.vue';
import NsDosage from '@/components/medications/NsDosage.vue';
import NsContentSplit from '@/components/NsContentSplit.vue';
import NsTextContent from '@/components/NsTextContent.vue';
import NsKeyValueContainer from '@/components/NsKeyValueContainer.vue';
import NsKeyValue from '@/components/NsKeyValue.vue';
import TextMono from '@/components/TextMono.vue';
import NsColorBox from '@/components/NsColorBox.vue';
import TextColored from '@/components/TextColored.vue';
import { Patient } from '@/types/emergency';

import { round } from '@/service/math';
import { computed } from 'vue';

const props = defineProps<{
  patient: Patient
}>()

const isApplicable = computed(() => props.patient.estimatedAge >= 12 && props.patient.estimatedWeight >= 10)

const weightDose = computed(() => isApplicable.value ? round(Math.min(props.patient.estimatedWeight / 10, 8), 1, 'down') : 0)
const weightHint = computed(() => {
  const ml = weightDose.value
  if (ml == 4) { return '1 Ampulle' }
  if (ml == 8) { return '2 Ampullen' }
  return `${ml}ml`
})

</script>

<style lang="css" scoped>

</style>
