<template>
  <template v-if="enabled && isSuppApplicable">
    <ns-dosage-usage type="supp">
      <ns-dosage :dosage="{ target: 'Prednisolon', dose: '100mg', hint: '(Zäpfchen)' }"></ns-dosage>
    </ns-dosage-usage>
  </template>
</template>

<script setup lang="ts">

import { isSupp_100mgEnabled } from './Packages'
import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'

// ########################################################################################################

const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Prednisolon) ?? true)

// ########################################################################################################

import { Patient } from '@/types/emergency';
import { computed } from 'vue';

import NsDosageUsage from '@/components/medications/NsDosageUsage.vue';
import NsDosage from '@/components/medications/NsDosage.vue';

const props = defineProps<{
  patient: Patient
}>()

const isSuppApplicable = computed(() => isSupp_100mgEnabled.value && props.patient.estimatedAge <= 12)

</script>

<style lang="css" scoped>

</style>
