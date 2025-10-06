<template>
  <template v-if="enabled">
    <template v-if="!isApplicable">
      <ns-dosage :dosage="{
        target: 'Esketamin', dose: 'Keine', hint: 'Gabe' }">
      </ns-dosage>
    </template>
    <template v-else>
      <ns-dosage :dosage="{
        target: 'Esketamin', dose: `${weightDose}mg`, hint: '(Initial)' }">
      </ns-dosage>
      <ns-dosage :dosage="{
        target: ' 2.5mg/ml', color: 'blue',
        dose: `${schemeMl}ml` }">
      </ns-dosage>
    </template>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Esketamin) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';
import TextMono from '@/components/TextMono.vue';
import { Patient } from '@/types/emergency';
import { computed } from 'vue';
import { round } from '@/service/math';

const props = defineProps<{
  patient: Patient
}>()

enum IvRange
{
  Low,
  High,
  NotApplicable,
}

const isApplicable = computed(() => props.patient.estimatedWeight > 10)

const weightDose = computed(() => round(props.patient.estimatedWeight * 0.125, 1.25, 'down'))
const schemeMl = computed(() => round(weightDose.value / 2.5, 0.5))

</script>

<style lang="css" scoped>

</style>
