<template>
  <template v-if="enabled">
    <template v-if="useFull">
      <ns-dosage mono :dosage="{ target: 'Amiodaron', dose: '300mg', hint: '(2 Ampullen)' }"></ns-dosage>
    </template>
    <template v-else-if="noUse">
      <ns-dosage mono :dosage="{ target: 'Amiodaron', dose: 'Keine', hint: 'Gabe' }"></ns-dosage>
    </template>
    <template v-else>
      <ns-dosage mono :dosage="{ target: 'Amiodaron', dose: `${childDose}mg`, hint: `(${childHint})` }"></ns-dosage>
    </template>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Amiodaron) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { round } from '@/service/math';
import { computed } from 'vue';

const useFull = computed(() => patient.isLikelyAnAdult || patient.weight>=60)
const noUse = computed(() => patient.weight < 5)

const childDose = computed(() => useFull.value ? 300 : round(patient.weight*5, 25, 'down'))
const childHint = computed(() => {
  const ml = round(childDose.value/50, 0.5)
  if (ml == 3) { return '1 Ampulle' }
  if (ml == 6) { return '2 Ampullen' }
  return `${ml}ml`
})

</script>

<style lang="css" scoped>

</style>
