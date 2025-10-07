<template>
  <template v-if="enabled">

    <template v-if="isApplicable">
      <div>
        <ns-dosage mono :dosage="{
          target: 'Fentanyl', dose: `${weightDose}mg`, hint: '(Maximaldosis)' }">
        </ns-dosage>
        <ns-dosage mono :dosage="{
          target: ' 50µg/ml', color: 'blue',
          dose: `${schemeMl}ml` }">
        </ns-dosage>
      </div>
    </template>
    <template v-else>
      <ns-dosage mono :dosage="{
        target: 'Fentanyl', dose: 'Keine', hint: 'Gabe' }">
      </ns-dosage>
    </template>

  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Fentanyl) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';
import { round } from '@/service/math';

const isApplicable = computed(() => patient.weight >= 21)

const weightDose = computed(() => {
  return round(patient.weight * 0.002, 0.05, patient.weight>25 ? 'down' : 'up')
})
const schemeMl = computed(() => {
  const ml = round(weightDose.value / 0.05, 0.5, 'down')
  return ml
})

</script>

<style lang="css" scoped>

</style>
