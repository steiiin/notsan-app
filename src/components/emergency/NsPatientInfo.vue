<template>
  <ns-content-group :style="cardColorStyle(infoData?.ColorClass)" v-if="showAnything">
    <div class="title">{{ infoData?.Title }}</div>
    <div class="subtitle">{{ infoData?.Subtitle }}</div>
  </ns-content-group>
</template>

<script setup lang="ts">

import NsContentGroup from '@/components/NsContentGroup.vue';
import { getBroselowCode } from '@/components/emergency/broselow';
import { Patient, SexValue } from '@/types/emergency';
import { computed } from 'vue';

const props = defineProps<{
  patient: Patient
}>()

// #region props

  const showAnything = computed(() => !!infoData.value && !isUndefined.value)
  const showError = computed(() => isInvalidAge.value || isInvalidWeight.value || isInvalidHeight.value)

  const isUndefined = computed(() => props.patient.estimatedWeightCalcMethod == 'undefined')
  const isInvalidAge = computed(() => props.patient.estimatedWeightCalcMethod == 'invalid_age')
  const isInvalidWeight = computed(() => props.patient.estimatedWeightCalcMethod == 'invalid_weight')
  const isInvalidHeight = computed(() => props.patient.estimatedWeightCalcMethod == 'invalid_height')

// #endregion

class InfoData {
  constructor(
    public Title: string,
    public Subtitle: string,
    public ColorClass: string = '',
  ) {}
}

const infoData = computed((): InfoData|null => {

  if (!isUndefined.value) {

    if (showError.value)
    {

      // show declarative messages
      if (props.patient.estimatedWeightCalcMethod == 'invalid_age') {
        return new InfoData('Zu Alt für Schätzung', 'Anhand von Perzentilenkurven kann bis max. 15 Jahren geschätzt werden.') }
      if (props.patient.estimatedWeightCalcMethod == 'invalid_height') {
        return new InfoData('Ungültige Größe', 'Unter 30cm Körpergröße kann nicht geschätzt werden.') }
      if (props.patient.estimatedWeightCalcMethod == 'invalid_weight') {
        return new InfoData('Ungültiges Gewicht', 'Mit unter 1kg Gewicht kann nichts berechnet werden.') }

    }
    else
    {

      let inputMethod = 'Eingabe'
      if (props.patient.estimatedWeightCalcMethod == 'by-age') { inputMethod = 'Perzentil/Alter' }
      else if (props.patient.estimatedWeightCalcMethod == 'by-height-curve') { inputMethod = 'Perzentil/Größe' }
      else if (props.patient.estimatedWeightCalcMethod == 'by-height-bmi') { inputMethod = 'BMI/Größe' }

      const broselowCode = getBroselowCode(props.patient.estimatedWeight)
      if (broselowCode)
      {
        return new InfoData(`Broselow: ${broselowCode.code}`, broselowCode.range, broselowCode.colorCode)
      }
      else
      {
        return null
      }

    }

  }

  return null

})

// #region Broselow

  const cardColorStyle = (colorCode?: string): string => {
    if (!!colorCode && colorCode.length>0)
    {
      const colorCss = `var(--ns-broselow-code-${colorCode})`
      return `--ion-card-background:${colorCss};`
    }
    else
    {
      return ''
    }
  }

// #endregion

// #region InfoData

  const getSexDescription = (sex: SexValue) => sex == 'male' ? 'Männlicher Patient' : 'Weiblicher Patient'

// #endregion

</script>

<style lang="css" scoped>

.title {
  font-size: 1.2em;
  font-weight: 700;
  line-height: 1.1;
}
.subtitle {
  opacity: .66;
  line-height: 1.1;
}

</style>
