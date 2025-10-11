<template>
  <template v-if="enabled && isAnySuppEnabled">

    <template v-if="useHigherDose">
      <div>
        <ns-dosage mono :dosage="{
          target: 'Paracetamol', dose: `250mg`, hint: '(Zäpfchen)' }">
        </ns-dosage>
      </div>
    </template>
    <template v-else>
      <ns-dosage mono :dosage="{
        target: 'Paracetamol', dose: '125mg', hint: '(Zäpfchen)' }">
      </ns-dosage>
    </template>

  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Paracetamol) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';

import { isAnySuppEnabled } from './Packages';

const useHigherDose = computed(() => patient.age >= 2)

</script>

<style lang="css" scoped>

</style>
