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
        <ns-habitus-input v-model="patientHabitusMulti" :mode="modelValue.currentHabitusMode"></ns-habitus-input>

      </div>

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
import NsSexInput from '@/components/NsSexInput.vue';
import NsHabitusInput from '@/components/NsHabitusInput.vue';

import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Patient, SexValue, WeightAccuracyValue, WeightEstimateByValue } from '@/types/emergency';
import { gainFocus } from '@/service/input';

const props = defineProps<{
  modelValue: Patient,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: Patient): void
}>()

const weightAccuracy = ref<WeightAccuracyValue>(props.modelValue.WeightAccuracy)
const weightEstimateBy = ref<WeightEstimateByValue>(props.modelValue.WeightEstimateBy)

const patientSex = ref<SexValue>(props.modelValue.Sex)
const patientAge = ref<number>(props.modelValue.Age)
const patientWeight = ref<number>(props.modelValue.Weight)
const patientHeight = ref<number>(props.modelValue.Height)
const patientHabitusMulti = ref<number>(props.modelValue.HabitusMultiplier)

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

watch(() => [
  weightAccuracy.value,
  weightEstimateBy.value,
  patientSex.value,
  patientAge.value,
  patientWeight.value,
  patientHeight.value,
  patientHabitusMulti.value
], () => {
  const newPatient = new Patient()
  newPatient.WeightAccuracy = weightAccuracy.value
  newPatient.WeightEstimateBy = weightEstimateBy.value
  newPatient.Age = patientAge.value
  newPatient.Sex = patientSex.value
  newPatient.Weight = patientWeight.value
  newPatient.Height = patientHeight.value
  newPatient.HabitusMultiplier = patientHabitusMulti.value
  emit('update:modelValue', newPatient)
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
