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
            target: 'Esketamin', dose: `${weightDose}mg` }">
          </ns-dosage>
          <ns-dosage mono :dosage="{
            target: '   5mg/ml', color: 'blue',
            dose: `${schemeMl5}ml`, hint: schemeHint5 }">
          </ns-dosage>
          <ns-dosage mono v-if="schemeMl25>0 && isAnyHighConcentrationEnabled" :dosage="{
            target: '  25mg/ml', color: 'green',
            dose: `${schemeMl25}ml`, hint: schemeHint25 }">
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
import TextMono from '@/components/TextMono.vue';
import { Patient } from '@/types/emergency';
import { computed } from 'vue';
import { round } from '@/service/math';

import { isAnyHighConcentrationEnabled } from './Packages';

const props = defineProps<{
  patient: Patient
}>()

const isApplicable = computed(() => props.patient.estimatedWeight >= 10)

const weightDose = computed(() => round(props.patient.estimatedWeight * 0.5, 5, 'down'))

const schemeMl5 = computed(() => {
  const ml = round(weightDose.value / 5, 0.5, 'down')
  return ml
})
const schemeMl25 = computed(() => {
  const ml = round(weightDose.value / 25, 0.5, 'down')
  return ml
})

const schemeHint5 = computed(() => schemeMl5.value > 3 ? '(nur i.m.)' : '(nasal)')
const schemeHint25 = computed(() => schemeMl25.value > 3 ? '(nur i.m.)' : '(nasal)')

</script>

<style lang="css" scoped>

</style>
