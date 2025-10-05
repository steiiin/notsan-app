<template>
  <template v-if="enabled && isAnyBucEnabled">
    <ns-dosage-usage type="po" dense>
      <template v-if="ageRange === BuccAgeRange.NotApplicable">
        <ns-dosage :dosage="{
          target: 'Buccolam', dose: 'Keine', hint:'Gabe' }">
        </ns-dosage>
      </template>
      <template v-else-if="ageRange === BuccAgeRange.Gelb">
        <ns-dosage :dosage="{
          target: 'Buccolam', color: 'orange',
          dose: ' 2,5mg', hint: '(gelb)' }">
        </ns-dosage>
      </template>
      <template v-else-if="ageRange === BuccAgeRange.Blau">
        <ns-dosage :dosage="{
          target: 'Buccolam', color: 'blue',
          dose: ' 5,0mg', hint: '(blau)' }">
        </ns-dosage>
      </template>
      <template v-else-if="ageRange === BuccAgeRange.Violet">
        <ns-dosage :dosage="{
          target: 'Buccolam', color: 'lila',
          dose: ' 7,5mg', hint: '(lila)' }">
        </ns-dosage>
      </template>
      <template v-else-if="ageRange === BuccAgeRange.Rot">
        <ns-dosage :dosage="{
          target: 'Buccolam', color: 'red',
          dose: '10,0mg', hint: '(rot)' }">
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
import { Patient } from '@/types/emergency';
import { computed } from 'vue';

import {

  isAnyBucEnabled,

} from './Packages'

const props = defineProps<{
  patient: Patient
}>()

enum BuccAgeRange
{
  Rot,
  Violet,
  Blau,
  Gelb,
  NotApplicable,
}

const ageRange = computed(() => {
  if (props.patient.estimatedAge <= 0.17) { return BuccAgeRange.NotApplicable }
  if (props.patient.estimatedAge < 1) { return BuccAgeRange.Gelb }
  if (props.patient.estimatedAge < 5) { return BuccAgeRange.Blau }
  if (props.patient.estimatedAge < 10) { return BuccAgeRange.Violet }
  return BuccAgeRange.Rot
})

</script>

<style lang="css" scoped>

</style>
