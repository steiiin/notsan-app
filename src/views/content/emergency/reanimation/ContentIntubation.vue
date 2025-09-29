<template>
  <ns-content-group title="Beatmung" dense>
    <ns-key-value-container>
      <ns-key-value label="ET-Tubus">
        <p>nich mehr</p>
      </ns-key-value>
      <ns-key-value label="iGel-Maske">
        <p>nich mehr <ns-color-box color-key="yellow" /></p>
      </ns-key-value>
    </ns-key-value-container>
  </ns-content-group>
</template>

<script setup lang="ts">

import NsContentGroup from '@/components/NsContentGroup.vue';
import NsContentSplit from '@/components/NsContentSplit.vue';
import NsTextContent from '@/components/NsTextContent.vue';
import NsKeyValueContainer from '@/components/NsKeyValueContainer.vue';
import NsKeyValue from '@/components/NsKeyValue.vue';
import NsColorBox from '@/components/NsColorBox.vue';
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
