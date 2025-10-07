<template>
  <template v-if="enabled">
    <template v-if="isApplicable">
      <ns-dosage mono :dosage="{ target: 'Dimetinden', dose: `${weightDose}mg`, hint: `(${weightHint})` }"></ns-dosage>
    </template>
    <template v-else>
      <ns-dosage mono :dosage="{ target: 'Dimetinden', dose: 'Keine', hint: 'Gabe' }"></ns-dosage>
    </template>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Dimetinden) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { round } from '@/service/math';
import { computed } from 'vue';

const isApplicable = computed(() => patient.age >= 12 && patient.weight >= 10)

const weightDose = computed(() => isApplicable.value ? round(Math.min(patient.weight / 10, 8), 1, 'down') : 0)
const weightHint = computed(() => {
  const ml = weightDose.value
  if (ml == 4) { return '1 Ampulle' }
  if (ml == 8) { return '2 Ampullen' }
  return `${ml}ml`
})

</script>

<style lang="css" scoped>

</style>
