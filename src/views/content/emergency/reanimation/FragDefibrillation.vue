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

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { round } from '@/service/math';
import { computed } from 'vue';

const useManufacturerEnergy = computed(() => patient.weight >= 25)
const manualEnergy = computed(() => round(patient.weight * 4, 5, 'down'))
const manualIneffectiveEnergy = computed(() => manualEnergy.value * 2)

</script>

<style lang="css" scoped>

</style>
