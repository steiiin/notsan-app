<template>
  <ns-content-group ref="inputRoot">

    <ns-button-group v-model="weightAccuracy" :options="[
        { label: 'Gewicht eingeben', value: 'direct' },
        { label: 'Gewicht schätzen', value: 'estimate' }, ]">
    </ns-button-group>
    <hr>
    <template v-if="weightAccuracy == 'direct'">
      <ns-weight-input v-model="patientWeight" ref="inputWeight"></ns-weight-input>
    </template>
    <template v-else-if="weightAccuracy == 'estimate'">

      <ns-button-group v-model="weightEstimateBy" :options="[
        { label: 'Nach Alter', value: 'by-age' },
        { label: 'Nach Größe', value: 'by-height' }, ]">
      </ns-button-group>
      <hr>
      <template v-if="weightEstimateBy == 'by-age'">

        <ns-age-input v-model="patientAge" ref="inputAge"></ns-age-input>

      </template>
      <template v-else-if="weightEstimateBy == 'by-height'">

        <ns-height-input v-model="patientHeight" ref="inputHeight"></ns-height-input>

      </template>

    </template>

  </ns-content-group>
</template>

<script setup lang="ts">

import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, onIonViewDidEnter } from '@ionic/vue'

import NsContentGroup from '@/components/NsContentGroup.vue';
import NsButtonGroup from '@/components/NsButtonGroup.vue';
import NsWeightInput from '@/components/NsWeightInput.vue';
import NsAgeInput from '@/components/NsAgeInput.vue';
import NsHeightInput from '@/components/NsHeightInput.vue';

import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Patient, WeightAccuracyValue, WeightEstimateByValue } from '@/types/emergency';
import { gainFocus } from '@/service/input';

const props = defineProps<{
  modelValue: Patient,
}>()

const weightAccuracy = ref<WeightAccuracyValue>(props.modelValue.WeightAccuracy)
const weightEstimateBy = ref<WeightEstimateByValue>(props.modelValue.WeightEstimateBy)

const patientAge = ref<number>(props.modelValue.Age)
const patientWeight = ref<number>(props.modelValue.Weight)
const patientHeight = ref<number>(props.modelValue.Height)

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
    patientWeight.value = 0
    if (weightEstimateBy.value != 'by-age')
    {
      weightEstimateBy.value = 'by-age'
    }
    else
    {
      gainFocus(inputAge, true)
    }
  }

})

watch(() => weightEstimateBy.value, (v) => {

  if (v == 'by-age')
  {
    patientAge.value = 50
    gainFocus(inputAge, true)
  }
  else if (v == 'by-height')
  {
    patientHeight.value = 180
    gainFocus(inputHeight, true)
  }

})

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

</style>
