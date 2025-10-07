<template>
  <template v-if="enabled">
    <template v-if="isApplicable">
      <ns-dosage v-if="useHighDose" :dosage="{
        target: 'Salbutamol',
        dose: '2,5mg', hint: '(1 Ampulle)' }">
      </ns-dosage>
      <ns-dosage v-else :dosage="{
        target: 'Salbutamol',
        dose: '1,25mg', hint: '(½ Ampulle)' }">
      </ns-dosage>
    </template>
    <template v-else>
      <ns-dosage :dosage="{
        target: 'Salbutamol',
        dose: 'Keine', hint: 'Gabe' }">
      </ns-dosage>
    </template>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'

// ########################################################################################################

const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Salbutamol) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';

const isApplicable = computed(() => patient.age >= 4)

const useHighDose = computed(() => patient.age >= 12)

</script>

<style lang="css" scoped>

</style>
