<template>
  <ns-content-group title="Defibrillation" dense>
    <ns-text-content>
      <template v-if="useManufacturerEnergy">
        <p>Empfohlene Energie des Herstellers benutzen.</p>
      </template>
      <template v-else>
        <h2>Schockenergie</h2>
        <p>~ {{ manualEnergy }} Joule</p>
        <hr>
        <h2>Erfolglose Schocks (&ge; 6x)</h2>
        <p>~ {{ manualIneffectiveEnergy }} Joule</p>
      </template>
    </ns-text-content>
  </ns-content-group>
</template>

<script setup lang="ts">

import NsContentGroup from '@/components/NsContentGroup.vue';
import NsTextContent from '@/components/NsTextContent.vue';
import { Patient } from '@/types/emergency';

import { round } from '@/service/math';
import { computed } from 'vue';

const props = defineProps<{
  patient: Patient
}>()

const useManufacturerEnergy = computed(() => props.patient.currentWeight >= 25)
const manualEnergy = computed(() => round(props.patient.currentWeight * 4, 5, 'down'))
const manualIneffectiveEnergy = computed(() => manualEnergy.value * 2)

</script>

<style lang="css" scoped>

</style>
