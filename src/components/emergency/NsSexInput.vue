<template>
  <div class="ns-sex-input">
    <ion-button
      :fill="isActive('male') ? 'solid' : 'outline'"
      @click="onSelect('male')">
      <ion-icon :icon="male"></ion-icon>
    </ion-button>
    <ion-button
      :fill="isActive('female') ? 'solid' : 'outline'"
      @click="onSelect('female')">
      <ion-icon :icon="female"></ion-icon>
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { SexValue } from '@/types/emergency';
import { IonButton, IonIcon } from '@ionic/vue'
import { male, female } from 'ionicons/icons'


const props = defineProps<{
  modelValue: SexValue
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: SexValue): void
}>()

const isActive = (option: SexValue) => option == props.modelValue

const onSelect = (value: SexValue) => {
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
  }
}
</script>

<style scoped>
.ns-sex-input {
  display: flex;
  gap: .25rem;
  min-height: 56px;
}

.ns-sex-input ion-button {
  margin: 0;
}
</style>
