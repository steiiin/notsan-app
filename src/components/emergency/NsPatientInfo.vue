<template>
  <ns-content-group :style="cardColorStyle(infoData?.ColorClass)" v-if="showAnything">
    <div class="title">{{ infoData?.Title }}</div>
    <div class="subtitle">{{ infoData?.Subtitle }}</div>
  </ns-content-group>
</template>

<script setup lang="ts">

import NsContentGroup from '@/components/NsContentGroup.vue';

import { getBroselowCode } from '@/components/emergency/broselow';
import { computed } from 'vue';

import { usePatientStore } from '@/stores/patient';
import { SexValue } from '@/types/patient';
const patient = usePatientStore()

const showAnything = computed(() => patient.hasResult && infoData.value != null)

class InfoData {
  constructor(
    public Title: string,
    public Subtitle: string,
    public ColorClass: string = '',
  ) {}
}

const infoData = computed((): InfoData|null => {

  if (patient.hasResult) {

    let resultType = 'Eingabe'
    if (patient.resultType == 'by-age') { resultType = 'Perzentil/Alter' }
    else if (patient.resultType == 'by-height-curve') { resultType = 'Perzentil/Größe' }
    else if (patient.resultType == 'by-height-bmi') { resultType = 'BMI/Größe' }

    const broselowCode = getBroselowCode(patient.weight)
    if (broselowCode)
    {
      return new InfoData(`Broselow: ${broselowCode.code}`, broselowCode.range, broselowCode.colorCode)
    }
    else
    {
      if (patient.isEstimate) {
        return new InfoData(`${patient.inputSex == 'male' ? 'Männlicher' : 'Weiblicher'} Patient`, `ca. ${patient.weight} (nach ${resultType})`)
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
