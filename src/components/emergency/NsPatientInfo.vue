<template>
  <ns-content-group :style="cardColorStyle(infoData.ColorClass)" v-if="showAnything">
    <div class="title">{{ infoData.Title }}</div>
    <div class="subtitle">{{ infoData.Subtitle }}</div>
  </ns-content-group>
</template>

<script setup lang="ts">

import NsContentGroup from '@/components/NsContentGroup.vue';
import { Patient, SexValue } from '@/types/emergency';
import { computed } from 'vue';

const props = defineProps<{
  patient: Patient
}>()

const info = computed(() => {

  const xx = []
  xx.push(`WeightAccuracy: ${props.patient.WeightAccuracy}`)
  xx.push(`WeightEstimateBy: ${props.patient.WeightEstimateBy}`)
  xx.push(`Sex: ${props.patient.Sex}`)
  xx.push(`Age: ${props.patient.Age}`)
  xx.push(`Weight: ${props.patient.Weight}`)
  xx.push(`Height: ${props.patient.Height}`)
  xx.push(`Habitus: ${props.patient.Habitus}`)
  xx.push(`HabitusMultiplier: ${props.patient.currentHabitusMulti}`)
  xx.push(`calcHabitusMode: ${props.patient.currentHabitusMode}`)
  xx.push(`calcWeight: ${props.patient.estimatedWeight}`)

  return xx.join('<br>')
})

// #region props

  const showAnything = computed(() => !isUndefined.value)
  const showError = computed(() => isInvalidAge.value || isInvalidWeight.value || isInvalidHeight.value)

  const isUndefined = computed(() => props.patient.currentMethod == 'undefined')
  const isInvalidAge = computed(() => props.patient.currentMethod == 'invalid_age')
  const isInvalidWeight = computed(() => props.patient.currentMethod == 'invalid_weight')
  const isInvalidHeight = computed(() => props.patient.currentMethod == 'invalid_height')

// #endregion

class InfoData {
  constructor(
    public Title: string,
    public Subtitle: string,
    public ColorClass: string = '',
  ) {}
}

const infoData = computed((): InfoData => {

  if (showAnything.value) {

    if (showError.value)
    {

      // show declarative messages
      if (props.patient.currentMethod == 'invalid_age') {
        return new InfoData('Zu Alt für Schätzung', 'Anhand von Perzentilenkurven kann bis max. 15 Jahren geschätzt werden.') }
      if (props.patient.currentMethod == 'invalid_height') {
        return new InfoData('Ungültige Größe', 'Unter 30cm Körpergröße kann nicht geschätzt werden.') }
      if (props.patient.currentMethod == 'invalid_weight') {
        return new InfoData('Ungültiges Gewicht', 'Mit unter 3kg Gewicht kann nichts berechnet werden.') }

    }
    else
    {

      let inputMethod = 'Eingabe'
      if (props.patient.currentMethod == 'by-age') { inputMethod = 'Perzentil/Alter' }
      else if (props.patient.currentMethod == 'by-height-curve') { inputMethod = 'Perzentil/Größe' }
      else if (props.patient.currentMethod == 'by-height-bmi') { inputMethod = 'BMI/Größe' }

      const broselowCode = getBroselowCode(props.patient.estimatedWeight)
      if (broselowCode)
      {
        return new InfoData(`Broselow: ${broselowCode.code}`, broselowCode.range, broselowCode.colorCode)
      }
      else
      {
        return new InfoData(getSexDescription(props.patient.Sex), props.patient.estimatedWeight.toFixed() + 'kg')
      }

    }

  }

  return new InfoData('', '')

})

// #region Broselow

  interface BroselowCode {
    code: string;      // color name, e.g. "Grün"
    colorCode: string; // key, e.g. "green"
    range: string;     // e.g. "8–12 kg"
  }

  const BROSELOW_ZONES: {code: string; colorCode: string; min: number; max: number}[] = [
    { code: "Grau",   colorCode: "grey",   min: 3,  max: 5 },
    { code: "Rosa",   colorCode: "pink",   min: 6,  max: 7 },
    { code: "Rot",    colorCode: "red",    min: 8,  max: 9 },
    { code: "Lila",   colorCode: "purple", min: 10, max: 11 },
    { code: "Gelb",   colorCode: "yellow", min: 12, max: 14 },
    { code: "Weiß",   colorCode: "white",  min: 15, max: 18 },
    { code: "Blau",   colorCode: "blue",   min: 19, max: 23 },
    { code: "Orange", colorCode: "orange", min: 24, max: 29 },
    { code: "Grün",   colorCode: "green",  min: 30, max: 36 },
  ]

  const getBroselowCode = (weightKg: number): BroselowCode | null => {
    const zone = BROSELOW_ZONES.find(z => weightKg >= z.min && weightKg <= z.max);
    if (!zone) return null
    return {
      code: zone.code,
      colorCode: zone.colorCode,
      range: `${zone.min}–${zone.max} kg`,
    }
  }

  const cardColorStyle = (colorCode: string): string => {
    if (colorCode.length>0)
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
