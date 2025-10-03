<template>
  <template v-if="useFull">
    <ns-dosage :dosage="{ target: 'Amiodaron', dose: '300mg', hint: '(2 Ampullen)' }"></ns-dosage>
  </template>
  <template v-else-if="noUse">
    <ns-dosage :dosage="{ target: 'Amiodaron', dose: 'Keine', hint: 'Gabe' }"></ns-dosage>
  </template>
  <template v-else>
    <ns-dosage :dosage="{ target: 'Amiodaron', dose: `${childDose}mg`, hint: `(${childHint})` }"></ns-dosage>
  </template>
</template>

<script setup lang="ts">

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

const props = defineProps<{
  patient: Patient
}>()

const useFull = computed(() => props.patient.isLikelyAnAdult || props.patient.estimatedWeight>=60)
const noUse = computed(() => props.patient.estimatedWeight < 5)

const childDose = computed(() => useFull.value ? 300 : round(props.patient.estimatedWeight*5, 25, 'down'))
const childHint = computed(() => {
  const ml = round(childDose.value/50, 0.5)
  if (ml == 3) { return '1 Ampulle' }
  if (ml == 6) { return '2 Ampullen' }
  return `${ml}ml`
})

</script>

<style lang="css" scoped>

</style>
