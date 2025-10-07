<template>
  <template v-if="enabled">
    <ns-dosage-usage type="iv" dense>

        <template v-if="isApplicable">
          <div>
            <ns-dosage mono :dosage="{
              target: 'Tranexamsäure', dose: `${weightDose}g`, hint: '(fraktioniert)' }">
            </ns-dosage>
            <ns-dosage mono :dosage="{
              target: ' 100mg/ml', color: 'blue',
              dose: `${schemeMl}ml` }">
            </ns-dosage>
          </div>
        </template>
        <template v-else>
          <ns-dosage mono :dosage="{
            target: 'Tranexamsäure', dose: 'Keine', hint: 'Gabe' }">
          </ns-dosage>
        </template>

    </ns-dosage-usage>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Tranexam) ?? true)

// ########################################################################################################

import NsDosageUsage from '@/components/medications/NsDosageUsage.vue';
import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';
import { round } from '@/service/math';

const isApplicable = computed(() => patient.age >= 1)

const weightDose = computed(() => {
  return Math.min(round(patient.weight * 15, 100, 'down'), 1000)
})
const schemeMl = computed(() => {
  const ml = round(weightDose.value / 100, 0.5, 'down')
  return ml
})

</script>

<style lang="css" scoped>

</style>
