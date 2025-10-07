<template>
  <template v-if="enabled">
    <ns-dosage-usage type="iv" dense>
      <ns-dosage :dosage="{
        target: 'Prednisolon',
        dose: `${weightDose}mg` }">
      </ns-dosage>
    </ns-dosage-usage>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'

// ########################################################################################################

const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Prednisolon) ?? true)

// ########################################################################################################

import NsDosageUsage from '@/components/medications/NsDosageUsage.vue';
import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';
import { round } from '@/service/math';

const weightDose = computed(() => Math.min(80, round(patient.weight * 2, 50, 'up')))

</script>

<style lang="css" scoped>

</style>
