<template>
  <template v-if="enabled">
    <ns-dosage-usage type="iv" label="i.v./i.m." dense>
      <ns-dosage mono :dosage="{
        target: 'Midazolam', dose: doseText }">
      </ns-dosage>
    </ns-dosage-usage>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Midazolam) ?? true)

// ########################################################################################################

import NsDosageUsage from '@/components/medications/NsDosageUsage.vue';
import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { round } from '@/service/math';
import { computed } from 'vue';

const weightDose = computed(() => round(Math.min(patient.weight / 10, 10), 1, 'down'))
const doseText = computed(() => String(weightDose.value).padStart(2, ' ') + 'mg')

</script>

<style lang="css" scoped>

</style>
