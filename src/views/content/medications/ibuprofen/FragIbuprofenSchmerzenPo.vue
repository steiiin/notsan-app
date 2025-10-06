<template>
  <template v-if="enabled && isAnyPoEnabled">

    <template v-if="weightDose == PoDose.gt_12">
      <ns-dosage mono :dosage="{
        target: 'Ibuprofen', dose: `400mg`, hint: '(max. 1.200/d)' }">
      </ns-dosage>
    </template>
    <template v-else-if="weightDose == PoDose.d_9_12">
      <ns-dosage mono :dosage="{
        target: 'Ibuprofen', dose: `300mg`, hint: '(max. 900/d)' }">
      </ns-dosage>
    </template>
    <template v-else-if="weightDose == PoDose.d_6_9">
      <ns-dosage mono :dosage="{
        target: 'Ibuprofen', dose: `200mg`, hint: '(max. 600/d)' }">
      </ns-dosage>
    </template>
    <template v-else-if="weightDose == PoDose.d_3_6">
      <ns-dosage mono :dosage="{
        target: 'Ibuprofen', dose: `150mg`, hint: '(max. 450/d)' }">
      </ns-dosage>
    </template>
    <template v-else-if="weightDose == PoDose.d_1_3">
      <ns-dosage mono :dosage="{
        target: 'Ibuprofen', dose: `100mg`, hint: '(max. 300/d)' }">
      </ns-dosage>
    </template>
    <template v-else-if="weightDose == PoDose.d_lt_1">
      <ns-dosage mono :dosage="{
        target: 'Ibuprofen', dose: `50mg`, hint: '(max. 150/d)' }">
      </ns-dosage>
    </template>

  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Ibuprofen) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';
import { Patient } from '@/types/emergency';
import { computed } from 'vue';

import { isAnyPoEnabled } from './Packages';

const props = defineProps<{
  patient: Patient
}>()

const isApplicable = computed(() => props.patient.estimatedAge >= 18)

enum PoDose {
  d_lt_1,
  d_1_3,
  d_3_6,
  d_6_9,
  d_9_12,
  gt_12,
}

const weightDose = computed(() => {
  if (props.patient.estimatedAge < 1) return PoDose.d_lt_1
  if (props.patient.estimatedAge < 3) return PoDose.d_1_3
  if (props.patient.estimatedAge < 6) return PoDose.d_3_6
  if (props.patient.estimatedAge < 9) return PoDose.d_6_9
  if (props.patient.estimatedAge < 12) return PoDose.d_9_12
  return PoDose.gt_12
})

</script>

<style lang="css" scoped>

</style>
