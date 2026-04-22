<template>
  <template v-if="enabled">
    <template v-if="useFull">
      <ns-dosage mono :dosage="{ target: 'Adrenalin', dose: '1mg', hint: '(1 Ampulle)' }"></ns-dosage>
    </template>
    <template v-else-if="use10">
      <div>
        <p>1 Ampulle auf <text-mono>10ml</text-mono> NaCl aufziehen, dann:</p>
        <ns-dosage mono :dosage="{ target: 'Adrenalin',  dose: `${child10Hint}ml`, hint: `${child10Dose}mg` }"></ns-dosage>
      </div>
    </template>
    <template v-else>
      <div>
        <p>1 Ampulle auf <text-mono>20ml</text-mono> NaCl aufziehen, dann:</p>
        <ns-dosage mono :dosage="{ target: 'Adrenalin',  dose: `${child20Hint}ml`, hint: `${child20Hint}mg` }"></ns-dosage>
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
const use10 = computed(() => !useFull.value && patient.weight>=10)

const child10Dose = computed(() => round(patient.weight*0.01, 0.1, 'up'))
const child10Hint = computed(() => (child10Dose.value / 0.1).toFixed())

const child20Dose = computed(() => round(patient.weight*0.01, 0.05, 'up'))
const child20Hint = computed(() => (child20Dose.value / 0.05).toFixed())

</script>

<style lang="css" scoped>

</style>
