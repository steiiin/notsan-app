<template>
  <template v-if="enabled">
    <template v-if="!isApplicable">
      <ns-dosage mono :dosage="{
        target: 'Esketamin', dose: 'Keine', hint: 'Gabe' }">
      </ns-dosage>
    </template>
    <template v-else>
      <div>
        <ns-dosage mono :dosage="{
          target: 'Esketamin', dose: `${weightDose}mg`, hint: '(Initial)' }">
        </ns-dosage>
        <ns-dosage mono :dosage="{
          target: ' 2.5mg/ml', color: 'blue',
          dose: `${schemeMl}ml` }">
        </ns-dosage>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Esketamin) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';
import { round } from '@/service/math';

const isApplicable = computed(() => patient.weight > 10)

const weightDose = computed(() => round(patient.weight * 0.125, 1.25, 'down'))
const schemeMl = computed(() => round(weightDose.value / 2.5, 0.5))

</script>

<style lang="css" scoped>

</style>
