<template>
  <template v-if="enabled && isAnyIvEnabled">

    <template v-if="isApplicable">
      <div>
        <ns-dosage mono :dosage="{
          target: 'Ibuprofen', dose: `400/600mg`, hint: '(Kurzinfusion)' }">
        </ns-dosage>
      </div>
    </template>
    <template v-else>
      <ns-dosage mono :dosage="{
        target: 'Ibuprofen', dose: 'Keine', hint: 'i.v.-Gabe' }">
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

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';

import { isAnyIvEnabled } from './Packages';

const isApplicable = computed(() => patient.age >= 18)

</script>

<style lang="css" scoped>

</style>
