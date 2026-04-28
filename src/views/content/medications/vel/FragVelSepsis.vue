<template>
  <template v-if="enabled">
    <ns-dosage-usage type="iv" dense>
      <ns-dosage :dosage="{
        target: 'Infusion (VEL)',
        dose: `${weightDose}ml` }">
      </ns-dosage>
    </ns-dosage-usage>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'

// ########################################################################################################

const enabled = computed(() => true)// TODO:  useConfigStore()?.checkMedicationEnabled(MedId.VEL) ?? true)

// ########################################################################################################

import NsDosageUsage from '@/components/medications/NsDosageUsage.vue'
import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';
import { round } from '@/service/math'

const weightDose = computed(() => Math.max(0, round(patient.weight * 30, 50, 'up')))

</script>

<style lang="css" scoped>

</style>
