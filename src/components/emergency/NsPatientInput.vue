<template>
  <ns-content-group ref="inputRoot" mode="md">

    <ns-button-group v-model="weightAccuracy" :options="[
        { label: 'Gewicht eingeben', value: 'direct' },
        { label: 'Gewicht schätzen', value: 'estimate' }, ]">
    </ns-button-group>
    <hr>
    <template v-if="weightAccuracy == 'direct'">
      <div class="ns-same-row">
        <ns-weight-input v-model="patientWeight" ref="inputWeight"></ns-weight-input>
        <ns-sex-input v-model="patientSex"></ns-sex-input>
      </div>
    </template>
    <template v-else-if="weightAccuracy == 'estimate'">

      <ns-button-group v-model="weightEstimateBy" :options="[
        { label: 'Nach Größe', value: 'by-height' },
        { label: 'Nach Alter', value: 'by-age' }, ]">
      </ns-button-group>
      <hr>
      <div class="ns-same-row">

        <template v-if="weightEstimateBy == 'by-age'">

          <ns-age-input v-model="patientAge" ref="inputAge"></ns-age-input>

        </template>
        <template v-else-if="weightEstimateBy == 'by-height'">

          <ns-height-input v-model="patientHeight" ref="inputHeight"></ns-height-input>

        </template>

        <ns-sex-input v-model="patientSex"></ns-sex-input>
        <ns-habitus-input v-model="patientHabitus" :mode="patient.habitusMode"></ns-habitus-input>

      </div>

    </template>

  </ns-content-group>
</template>

<script setup lang="ts">

import NsContentGroup from '@/components/NsContentGroup.vue';
import NsButtonGroup from '@/components/NsButtonGroup.vue';
import NsWeightInput from '@/components/emergency/NsWeightInput.vue';
import NsAgeInput from '@/components/emergency/NsAgeInput.vue';
import NsHeightInput from '@/components/emergency/NsHeightInput.vue';
import NsSexInput from '@/components/emergency/NsSexInput.vue';
import NsHabitusInput from '@/components/emergency/NsHabitusInput.vue';

import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { gainFocus } from '@/service/input';

import { usePatientStore } from '@/stores/patient';
import { HabitusValue, SexValue, WeightAccuracyValue, WeightEstimateByValue } from '@/types/patient';
const patient = usePatientStore()

const weightAccuracy = ref<WeightAccuracyValue>(patient.inputWeightAccuracy)
const weightEstimateBy = ref<WeightEstimateByValue>(patient.inputWeightEstimateBy)

const patientSex = ref<SexValue>(patient.inputSex)
const patientAge = ref<number>(patient.inputAge)
const patientWeight = ref<number>(patient.inputAge)
const patientHeight = ref<number>(patient.inputHeight)
const patientHabitus = ref<HabitusValue>(patient.inputHabitus)

const inputWeight = ref<any|null>(null)
const inputAge = ref<any|null>(null)
const inputHeight = ref<any|null>(null)

watch(() => weightAccuracy.value, (v) => {

  if (v == 'direct')
  {
    patientWeight.value = 80
    gainFocus(inputWeight, true)
  }
  else if (v == 'estimate')
  {
    patientHeight.value = 180
    if (weightEstimateBy.value != 'by-height')
    {
      weightEstimateBy.value = 'by-height'
    }
    else
    {
      gainFocus(inputHeight, true)
    }
  }

})

watch(() => weightEstimateBy.value, (v) => {

  patientHabitus.value = 'normal'

  if (v == 'by-age')
  {
    patientAge.value = 12
    gainFocus(inputAge, true)
  }
  else if (v == 'by-height')
  {
    patientHeight.value = 180
    gainFocus(inputHeight, true)
  }

})

watch(() => weightAccuracy.value, (v) => patient.inputWeightAccuracy = v)
watch(() => weightEstimateBy.value, (v) => patient.inputWeightEstimateBy = v)
watch(() => patientSex.value, (v) => patient.inputSex = v)
watch(() => patientAge.value, (v) => patient.inputAge = v)
watch(() => patientWeight.value, (v) => patient.inputWeight = v)
watch(() => patientHeight.value, (v) => patient.inputHeight = v)
watch(() => patientHabitus.value, (v) => patient.inputHabitus = v)

const inputRoot = ref<any|null>(null)

function handle(entries: IntersectionObserverEntry[]) {
  if (entries[0].isIntersecting) {
    gainFocus(inputWeight, true)
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(handle, { threshold: 1 })
  if (inputRoot.value) observer.observe(inputRoot.value.$el)
  onBeforeUnmount(() => observer.disconnect())
})

</script>

<style lang="css" scoped>

.ns-same-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ns-same-row .ns-height-input,
.ns-same-row .ns-age-input,
.ns-same-row .ns-sex-input {
  flex-shrink: 0;
}



</style>
