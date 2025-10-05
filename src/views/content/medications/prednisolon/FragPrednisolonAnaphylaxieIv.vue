<template>
  <template v-if="enabled">
    <ns-dosage :dosage="{
      target: 'Prednisolon',
      dose: `${weightDose}mg`, hint: weightHint }">
    </ns-dosage>
  </template>
</template>

<script setup lang="ts">

import { isIv_100mgEnabled, isIv_250mgEnabled, isOnlyOneIvEnabled } from './Packages'
import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'

// ########################################################################################################

const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Prednisolon) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';
import { Patient } from '@/types/emergency';
import { computed } from 'vue';

const props = defineProps<{
  patient: Patient
}>()

const weightDose = computed(() => {
  if (props.patient.estimatedAge>=12) { return 250 }
  if (props.patient.estimatedAge>=8) { return 100 }
  return 50
})
const weightHint = computed(() => {
  if (!isOnlyOneIvEnabled.value) { return '' }
  if (isIv_100mgEnabled.value)
  {
    if (weightDose.value == 250) { return '(2½ Ampullen)' }
    if (weightDose.value == 100) { return '(1 Ampulle)' }
    if (weightDose.value == 50) { return '(½ Ampulle)' }
  }
  if (isIv_250mgEnabled.value)
  {
    if (weightDose.value == 250) { return '(1 Ampulle)' }
    if (weightDose.value == 100) { return '(2ml)' }
    if (weightDose.value == 50) { return '(1ml)' }
  }
  return ''
})

</script>

<style lang="css" scoped>

</style>
