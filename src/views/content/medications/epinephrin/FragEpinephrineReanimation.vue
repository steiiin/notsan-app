<template>
  <template v-if="enabled">
    <template v-if="useFull">
      <ns-dosage mono :dosage="{ target: 'Adrenalin', dose: '1mg', hint: '(1 Ampulle)' }"></ns-dosage>
    </template>
    <template v-else>
      <div>
        <p>1 Ampulle auf <text-mono>20ml</text-mono> NaCl aufziehen, dann:</p>
        <ns-dosage mono :dosage="{ target: 'Adrenalin',  dose: `${childHint}ml`, hint: `${childDose}mg` }"></ns-dosage>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Epinephrin) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';
import TextMono from '@/components/TextMono.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { round } from '@/service/math';
import { computed } from 'vue';

const useFull = computed(() => patient.isLikelyAnAdult || patient.weight>=100)
const childDose = computed(() => useFull.value ? 1 : round(patient.weight*0.01, 0.05, 'up'))
const childHint = computed(() => (childDose.value / 0.05).toFixed())

</script>

<style lang="css" scoped>

</style>
