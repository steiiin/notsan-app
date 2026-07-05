<template>
  <template v-if="enabled">
    <ns-dosage-usage type="nasal" label="i.m./nasal" dense>
      <template v-if="!isApplicable">
        <ns-dosage mono :dosage="{
          target: 'Esketamin', dose: 'Keine', hint: 'Gabe' }">
        </ns-dosage>
      </template>
      <template v-else>
        <div>
          <ns-dosage mono :dosage="{
            target: 'Esketamin', dose: `${weightDoseRange}mg`}">
          </ns-dosage>
          <ns-dosage mono v-if="isIv_5mgml_5mlEnabled" :dosage="{
            target: '   5mg/ml', color: 'blue',
            dose: schemeMl5, hint: schemeHint5 }">
          </ns-dosage>
          <ns-dosage mono v-if="isAnyHighConcentrationEnabled" :dosage="{
            target: '  25mg/ml', color: 'green',
            dose: schemeMl25, hint: schemeHint25 }">
          </ns-dosage>
        </div>
      </template>
    </ns-dosage-usage>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Esketamin) ?? true)

// ########################################################################################################

import NsDosageUsage from '@/components/medications/NsDosageUsage.vue';
import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';
import { round } from '@/service/math';

import { isAnyHighConcentrationEnabled, isIv_5mgml_5mlEnabled } from './Packages';

const isApplicable = computed(() => patient.weight >= 10)

const minWeightDose = computed(() => round(patient.weight * 0.5, 0.1))
const maxWeightDose = computed(() => round(patient.weight, 0.1))
const weightDoseRange = computed(() => formatRange(minWeightDose.value, maxWeightDose.value))

type NasalScheme = {
  doseMl: string
  hint: string
}

const nasalLimitMl = 3
const imLimitMl = 5

function formatMl(ml: number): string {
  return `${round(ml, 0.1)}ml`
}

function formatMg(mg: number): string {
  return `${round(mg, 0.1)}mg`
}

function formatRange(min: number, max: number): string {
  if (min === max) {
    return String(min)
  }

  return `${min}-${max}`
}

function createNasalScheme(concentration: number): NasalScheme {
  const minDoseMl = round(minWeightDose.value / concentration, 0.1, 'up')
  const maxDoseMl = round(maxWeightDose.value / concentration, 0.1, 'up')
  const doseMl = `${formatRange(minDoseMl, maxDoseMl)}ml`

  if (maxDoseMl <= nasalLimitMl) {
    return {
      doseMl,
      hint: '',
    }
  }

  if (minDoseMl <= nasalLimitMl) {
    return {
      doseMl,
      hint: `max. ${formatMl(nasalLimitMl)} nasal`,
    }
  }

  return {
    doseMl,
    hint: '(nur i.m.)',
  }
}

const scheme5 = computed(() => createNasalScheme(5))
const scheme25 = computed(() => createNasalScheme(25))

const schemeMl5 = computed(() => scheme5.value.doseMl)
const schemeMl25 = computed(() => scheme25.value.doseMl)

const schemeHint5 = computed(() => scheme5.value.hint)
const schemeHint25 = computed(() => scheme25.value.hint)

</script>

<style lang="css" scoped>

</style>
