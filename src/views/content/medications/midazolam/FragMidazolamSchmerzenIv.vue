<template>
  <template v-if="enabled">

    <template v-if="dose == IvRange.NotApplicable">
      <ns-dosage mono :dosage="{
        target: 'Midazolam', dose: 'Keine', hint: 'Gabe' }">
      </ns-dosage>
    </template>
    <template v-else-if="dose == IvRange.Low">
      <ns-dosage mono :dosage="{
        target: 'Midazolam', dose: '1mg' }">
      </ns-dosage>
    </template>
    <template v-else-if="dose == IvRange.High">
      <ns-dosage mono :dosage="{
        target: 'Midazolam', dose: '2mg' }">
      </ns-dosage>
    </template>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Midazolam) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';

enum IvRange
{
  Low,
  High,
  NotApplicable,
}

const dose = computed(() => {
  if (patient.weight < 10) { return IvRange.NotApplicable }
  if (patient.age > 60 || patient.weight < 50) { return IvRange.Low }
  return IvRange.High
})

</script>

<style lang="css" scoped>

</style>
