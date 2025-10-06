<template>
  <template v-if="enabled">

    <template v-if="isApplicable">
      <div>
        <ns-dosage mono :dosage="{
          target: 'Nalbuphin', dose: `${weightDose}mg` }">
        </ns-dosage>
        <ns-dosage mono :dosage="{
          target: '10mg/ml', color: 'blue',
          dose: `≈ ${schemeMl}ml` }">
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
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Nalbuphin) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';
import { Patient } from '@/types/emergency';
import { computed } from 'vue';
import { round } from '@/service/math';

const props = defineProps<{
  patient: Patient
}>()

const isApplicable = computed(() => props.patient.estimatedWeight >= 21)

const weightDose = computed(() => {
  return round(props.patient.estimatedWeight * 0.2, 0.5, 'down')
})
const schemeMl = computed(() => {
  const ml = round(weightDose.value / 10, 0.5, weightDose.value < 0.5 ? 'up' : 'down')
  return ml
})


</script>

<style lang="css" scoped>

</style>
