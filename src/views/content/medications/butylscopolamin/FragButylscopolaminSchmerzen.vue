<template>
  <template v-if="enabled">
    <template v-if="!isApplicable">
      <ns-dosage mono :dosage="{
        target: 'Butylscopolamin', dose: 'Keine', hint: 'Gabe' }">
      </ns-dosage>
    </template>
    <template v-else>
      <div>
        <ns-dosage mono :dosage="{
          target: 'Butylscopolamin', dose: `${weightDose}mg`, hint: weightHint }">
        </ns-dosage>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Butylscopolamin) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';
import { round } from '@/service/math';

const isApplicable = computed(() => patient.age >= 12)

const weightDose = computed(() => Math.min(round(patient.weight * 0.3, 10, 'down'), 20))
const weightHint = computed(() => {
  if (weightDose.value == 10) { return '(½ Ampulle)' }
  return '(1 Ampulle)'
})

</script>

<style lang="css" scoped>

</style>
