<template>
  <template v-if="enabled && isAnyIvEnabled">
    <ns-dosage-usage type="nasal" dense>
      <template v-if="ageRange === NasalAgeRange.NotApplicable">
        <ns-dosage mono :dosage="{
          target: 'Midazolam', dose: 'Keine', hint:'Gabe' }">
        </ns-dosage>
      </template>
      <template v-if="ageRange === NasalAgeRange.Low">
        <ns-dosage mono :dosage="{
          target: 'Midazolam',
          dose: ' 2,5mg', hint: '(MAD)' }">
        </ns-dosage>
      </template>
      <template v-if="ageRange === NasalAgeRange.Medium">
        <ns-dosage mono :dosage="{
          target: 'Midazolam',
          dose: ' 5mg', hint: '(MAD)' }">
        </ns-dosage>
      </template>
      <template v-if="ageRange === NasalAgeRange.High">
        <ns-dosage mono :dosage="{
          target: 'Midazolam',
          dose: '10mg', hint: '(MAD)' }">
        </ns-dosage>
      </template>
    </ns-dosage-usage>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Midazolam) ?? true)

// ########################################################################################################

import NsDosageUsage from '@/components/medications/NsDosageUsage.vue';
import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';

import {

  isAnyIvEnabled,

} from './Packages'

enum NasalAgeRange
{
  Low,
  Medium,
  High,
  NotApplicable,
}

const ageRange = computed(() => {
  if (patient.age <= 0.17) { return NasalAgeRange.NotApplicable }
  if (patient.weight < 10) { return NasalAgeRange.Low }
  if (patient.weight < 20) { return NasalAgeRange.Medium }
  return NasalAgeRange.High
})

</script>

<style lang="css" scoped>

</style>
