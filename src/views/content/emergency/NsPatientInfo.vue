<template>
  <ns-content-group class="test">
    <div class="title">Broselow: Lila</div>
    <div class="subtitle" v-html="info"></div>
  </ns-content-group>
</template>

<script setup lang="ts">

import NsContentGroup from '@/components/NsContentGroup.vue';
import { Patient } from '@/types/emergency';
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
  xx.push(`Habitus: ${props.patient.HabitusMultiplier}`)
  xx.push(`calcHabitusMode: ${props.patient.currentHabitusMode}`)
  xx.push(`calcWeight: ${props.patient.currentWeight}`)

  return xx.join('<br>')
})

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

.text {
  --ion-background-color: #f00;
}

</style>
