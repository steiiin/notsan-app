<template>
  <template v-if="enabled && isAnySuppEnabled">

    <template v-if="useHigherDose">
      <div>
        <ns-dosage mono :dosage="{
          target: 'Ibuprofen', dose: `125/150mg`, hint: '(Zäpfchen)' }">
        </ns-dosage>
      </div>
    </template>
    <template v-else>
      <ns-dosage mono :dosage="{
        target: 'Ibuprofen', dose: '60/75mg', hint: '(Zäpfchen)' }">
      </ns-dosage>
    </template>

  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Ibuprofen) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';
import { Patient } from '@/types/emergency';
import { computed } from 'vue';

import { isAnySuppEnabled } from './Packages';

const props = defineProps<{
  patient: Patient
}>()

const useHigherDose = computed(() => props.patient.estimatedAge >= 2)

</script>

<style lang="css" scoped>

</style>
