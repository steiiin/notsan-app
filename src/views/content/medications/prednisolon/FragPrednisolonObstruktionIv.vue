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
import { Patient } from '@/types/emergency';
import { computed } from 'vue';
import { round } from '@/service/math';

const props = defineProps<{
  patient: Patient
}>()

const weightDose = computed(() => Math.min(80, round(props.patient.estimatedWeight * 2, 50, 'up')))

</script>

<style lang="css" scoped>

</style>
