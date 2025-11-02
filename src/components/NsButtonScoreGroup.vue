<template>
  <div class="ns-button-score-group">
    <template v-if="option.type === 'yes-no'">
      <ion-button :color="color(true, 'bad')" :fill="fill(true)" expand="block" @click="onSelect(true)">
        <ion-icon :src="checkmark"></ion-icon>
      </ion-button>
      <ion-button :color="color(false, 'good')" :fill="fill(false)" expand="block" @click="onSelect(false)">
        <ion-icon :src="close"></ion-icon>
      </ion-button>
    </template>
    <div class="label">
      {{ option.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue'
import { checkmark, close } from 'ionicons/icons'
import { computed } from 'vue'

type ScoreOptionColor = 'good' | 'bad' | 'okay' | 'neutral'

type ScoreTypeValue = 'yes-no'
type ScoreOption = {
  type: ScoreTypeValue
  label: string
}

const props = defineProps<{
  option: ScoreOption
  modelValue: any
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void
}>()

const isActive = (value: any) => value == props.modelValue
const fill = (value: any) => isActive(value) ? 'solid' : 'outline'
const color = (value: any, def: ScoreOptionColor = 'neutral') => isActive(value) ? defColor(def) : 'medium'

const defColor = (value: ScoreOptionColor) => {
  if (value == 'good') { return 'success' }
  if (value == 'okay') { return 'warn' }
  if (value == 'bad') { return 'danger' }
  return 'dark'
}

const onSelect = (value: any) => {
  if (value != props.modelValue) {
    emit('update:modelValue', value)
  }
}

</script>

<style scoped>

.ns-button-score-group {
  display: flex;
}

.ns-button-score-group ion-button {
  min-width: 3.5rem;
}

.ns-button-score-group .label {
  display: inline-flex;
  align-items: center;
  padding-left: .5rem;
  font-variant: small-caps;
  font-size: 1.1em;
  line-height: 1;
}

</style>
