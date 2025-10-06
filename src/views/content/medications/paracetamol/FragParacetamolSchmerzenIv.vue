<template>
  <template v-if="enabled && isAnyIvEnabled">

    <template v-if="isApplicable">
      <div>
        <ns-dosage mono :dosage="{
          target: 'Paracetamol', dose: ageDose, hint: doseHint }">
        </ns-dosage>
      </div>
    </template>
    <template v-else>
      <ns-dosage mono :dosage="{
        target: 'Paracetamol', dose: 'Keine', hint: 'i.v.-Gabe' }">
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

import { isAnyIvEnabled } from './Packages';

const props = defineProps<{
  patient: Patient
}>()

const isApplicable = computed(() => props.patient.estimatedAge >= 6)
const useHigherDose = computed(() => props.patient.estimatedAge >= 12)

const ageDose = computed(() => useHigherDose.value ? '1000mg' : '500mg')
const doseHint = computed(() => useHigherDose.value ? '(1 Infusion)' : '(½ Infusion)')

</script>

<style lang="css" scoped>

</style>
