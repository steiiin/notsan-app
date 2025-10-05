<template>
  <ns-content-group title="Beatmung" dense>
    <ns-key-value-container>
      <ns-key-value label="ET-Tubus">
        <p>Größe <b><text-mono>{{ recommendedET.size.toFixed(1) }}</text-mono></b> <span class="et-tolerance" v-if="recommendedET.sizeRange">{{ recommendedET.sizeRange }}</span></p>
      </ns-key-value>
      <ns-key-value label="iGel-Maske">
        <p>Größe <b><text-mono>{{ recommendedIgel.size.toFixed(1) }}</text-mono></b> <ns-color-box :color-key="recommendedIgel.color" /></p>
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
import TextMono from '@/components/TextMono.vue';
import NsColorBox from '@/components/NsColorBox.vue';
import { Patient } from '@/types/emergency';

import { clamp, round } from '@/service/math';
import { computed } from 'vue';

const props = defineProps<{
  patient: Patient
}>()

// #region ET tube estimation

  interface ETRecommendation {
    size: number
    sizeRange: string
    method: 'Gewicht' | 'Alter' | 'Geschlecht' | ''
  }

  function estimateET(): ETRecommendation
  {

    const age = props.patient.estimatedAge
    const height = props.patient.isHeightDirectlyUsed ? props.patient.Height : NaN
    const weight = props.patient.estimatedWeight
    const sex = props.patient.Sex
    const isLikelyAnAdult = props.patient.isLikelyAnAdult

    // 1) Neonate/infant weight-based
    if (weight <= 3)
    {
      let size = 3.5
      if (weight < 1) { size = 2.5 }
      else if (weight < 2) { size = 3.0 }
      else if (weight <= 3) { size = 3.5 }
      else { size = 3.5 }
      return {
        size: size,
        sizeRange: weight>3 ? '+0.5' : '',
        method: 'Gewicht',
      }
    }

    // 2) Pediatric (age-based)
    if (!isLikelyAnAdult)
    {
      const size = round((age / 4) + 3.5, 0.5)
      return {
        size: clamp(size, 3.5, 7.0),
        sizeRange: '+/-0.5',
        method: 'Alter'
      }
    }

    // 3) Adult default
    else
    {
      let base = sex === 'male' ? 8.0 : 7.5
      if(!Number.isNaN(height))
      {
        if (height >= 185) { base += 0.5 }
        else if (height <= 155) { base -= 0.5 }
      }
      return {
        size: clamp(base, 7.0, 8.5),
        sizeRange: '+/-1.0',
        method: 'Geschlecht'
      }
    }

  }

// #endregion
// #region iGel tube estimation

  interface IgelRecommendation {
    size: number
    color: string
  }

  function estimateIgel(): IgelRecommendation {

    const weight = props.patient.estimatedWeight
    if (weight < 5) {
      return { size: 1.0, color: 'igel1' }
    }
    if (weight >= 5 && weight < 11) {
      return { size: 1.5, color: 'igel1_5' }
    }
    if (weight >= 11 && weight < 25) {
      return { size: 2.0, color: 'igel2' }
    }
    if (weight >= 25 && weight < 35) {
      return { size: 2.5, color: 'igel2_5' }
    }
    if (weight >= 35 && weight < 55) {
      return { size: 3.0, color: 'igel3' }
    }
    if (weight >= 55 && weight < 90) {
      return { size: 4.0, color: 'igel4' }
    }

    return { size: 5.0, color: 'igel5' }

  }

// #endregion

const recommendedET = computed(() => estimateET())
const recommendedIgel = computed(() => estimateIgel())

</script>

<style lang="css" scoped>

.et-tolerance {
  font-size: 0.9em;
  opacity: 0.8;
}

</style>
