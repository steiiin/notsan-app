<template>
  <template v-if="enabled">
    <template v-if="useFull">
      <ns-dosage mono :dosage="{ target: 'Adrenalin', dose: '1mg', hint: '(1 Ampulle)' }"></ns-dosage>
    </template>
    <template v-else>
      <div>
        <p>1 Ampulle auf <text-mono>20ml</text-mono> NaCl aufziehen, dann:</p>
        <ns-dosage mono :dosage="{ target: 'Adrenalin',  dose: `${childHint}ml`, hint: `${childDose}mg` }"></ns-dosage>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Epinephrin) ?? true)

// ########################################################################################################

import NsContentGroup from '@/components/NsContentGroup.vue';
import NsDosageUsage from '@/components/medications/NsDosageUsage.vue';
import NsDosage from '@/components/medications/NsDosage.vue';
import NsContentSplit from '@/components/NsContentSplit.vue';
import NsTextContent from '@/components/NsTextContent.vue';
import NsKeyValueContainer from '@/components/NsKeyValueContainer.vue';
import NsKeyValue from '@/components/NsKeyValue.vue';
import TextMono from '@/components/TextMono.vue';
import NsColorBox from '@/components/NsColorBox.vue';
import TextColored from '@/components/TextColored.vue';
import { Patient } from '@/types/emergency';

import { round } from '@/service/math';
import { computed } from 'vue';

import { iv_1mg } from './Packages'

const props = defineProps<{
  patient: Patient
}>()

const useFull = computed(() => props.patient.isLikelyAnAdult || props.patient.estimatedWeight>=100)
const childDose = computed(() => useFull.value ? 1 : round(props.patient.estimatedWeight*0.01, 0.05, 'up'))
const childHint = computed(() => (childDose.value / 0.05).toFixed())

</script>

<style lang="css" scoped>

</style>
