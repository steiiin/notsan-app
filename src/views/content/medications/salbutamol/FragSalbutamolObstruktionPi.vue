<template>
  <template v-if="enabled">
    <template v-if="isApplicable">
      <ns-dosage :dosage="{
        target: 'Salbutamol',
        dose: dosage, hint: doseHint }">
      </ns-dosage>
    </template>
    <template v-else>
      <ns-dosage :dosage="{
        target: 'Salbutamol',
        dose: 'Keine', hint: 'Gabe' }">
      </ns-dosage>
    </template>
  </template>
</template>

<script setup lang="ts">

import {
  isInh_5mgmlEnabled,
  isInh_2_5mgmlEnabled,
  isInh_1_25mgmlEnabled,
} from './Packages'
import { selectSalbutamolAmpouleHint, type SalbutamolStrength } from './SalbutamolDosage'
import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'

// ########################################################################################################

const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Salbutamol) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';

const isApplicable = computed(() => patient.age >= 4)

const useHighDose = computed(() => patient.age > 12)
const doseMg = computed(() => useHighDose.value ? 5 : 2.5)
const dosage = computed(() => `${String(doseMg.value).replace('.', ',')}mg`)

const enabledStrengths = computed<SalbutamolStrength[]>(() => {
  const strengths: SalbutamolStrength[] = []
  if (isInh_5mgmlEnabled.value) { strengths.push(5) }
  if (isInh_2_5mgmlEnabled.value) { strengths.push(2.5) }
  if (isInh_1_25mgmlEnabled.value) { strengths.push(1.25) }
  return strengths
})

const doseHint = computed(() => selectSalbutamolAmpouleHint(doseMg.value, enabledStrengths.value))

</script>

<style lang="css" scoped>

</style>
