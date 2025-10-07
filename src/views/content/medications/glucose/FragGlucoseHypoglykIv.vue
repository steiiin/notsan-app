<template>
  <template v-if="enabled">
    <ns-dosage-usage type="iv" dense>
      <ns-dosage :dosage="{
        target: 'Glucose',
        dose: `${weightDose}g`, hint: doseHint }">
      </ns-dosage>
    </ns-dosage-usage>
  </template>
</template>

<script setup lang="ts">

import { isOnlyOneEnabled, isIv_1g_10mlEnabled, isIv_2g_10mlEnabled, isIv_4g_10mlEnabled } from './Packages'
import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'

// ########################################################################################################

const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Glucose) ?? true)

// ########################################################################################################

import NsDosageUsage from '@/components/medications/NsDosageUsage.vue'
import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';
import { round } from '@/service/math'
import { numToFracSymbol } from '@/service/text'

const weightDose = computed(() => Math.min(8, round(patient.weight * 0.2, 1, 'up')))

const doseHint = computed(() => {
  if (isOnlyOneEnabled.value)
  {
    if (isIv_1g_10mlEnabled.value) { return `(${weightDose.value} Ampulle${weightDose.value>1 ? 'n' : ''})` }
    if (isIv_2g_10mlEnabled.value) { return `(${numToFracSymbol(round(weightDose.value/2,0.5))} Ampulle${weightDose.value>2 ? 'n' : ''})` }
    if (isIv_4g_10mlEnabled.value) { return `(${numToFracSymbol(round(weightDose.value/4,0.25))} Ampulle${weightDose.value>4 ? 'n' : ''})` }
  }
  return ''
})

</script>

<style lang="css" scoped>

</style>
