<template>
  <template v-if="enabled && isAnyPoEnabled">

    <template v-if="weightDose == PoDose.gt_11">
      <ns-dosage mono :dosage="{
        target: 'Paracetamol', dose: `500mg`, hint: '(max. 2.000/d)' }">
      </ns-dosage>
    </template>
    <template v-else-if="weightDose == PoDose.d_8_11">
      <ns-dosage mono :dosage="{
        target: 'Paracetamol', dose: `400mg`, hint: '(max. 1.600/d)' }">
      </ns-dosage>
    </template>
    <template v-else-if="weightDose == PoDose.d_5_8">
      <ns-dosage mono :dosage="{
        target: 'Paracetamol', dose: `300mg`, hint: '(max. 1.200/d)' }">
      </ns-dosage>
    </template>
    <template v-else-if="weightDose == PoDose.d_2_5">
      <ns-dosage mono :dosage="{
        target: 'Paracetamol', dose: `200mg`, hint: '(max. 800/d)' }">
      </ns-dosage>
    </template>
    <template v-else-if="weightDose == PoDose.d_1_2">
      <ns-dosage mono :dosage="{
        target: 'Paracetamol', dose: `150mg`, hint: '(max. 600/d)' }">
      </ns-dosage>
    </template>
    <template v-else-if="weightDose == PoDose.d_lt_1">
      <ns-dosage mono :dosage="{
        target: 'Paracetamol', dose: `100mg`, hint: '(max. 400/d)' }">
      </ns-dosage>
    </template>

  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Paracetamol) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';

import { isAnyPoEnabled } from './Packages';

enum PoDose {
  d_lt_1,
  d_1_2,
  d_2_5,
  d_5_8,
  d_8_11,
  gt_11,
}

const weightDose = computed(() => {
  if (patient.age < 1) return PoDose.d_lt_1
  if (patient.age < 2) return PoDose.d_1_2
  if (patient.age < 5) return PoDose.d_2_5
  if (patient.age < 8) return PoDose.d_5_8
  if (patient.age < 11) return PoDose.d_8_11
  return PoDose.gt_11
})

</script>

<style lang="css" scoped>

</style>
