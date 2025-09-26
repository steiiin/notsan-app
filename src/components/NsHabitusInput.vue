<template>
  <ion-select placeholder="Habitus" class="ns-habitus-input"
    fill="outline" interface="popover" v-model="currentMulti">

    <template v-if="mode == 'child'">
      <ion-select-option :value="0.85">Sehr dünn</ion-select-option>
      <ion-select-option :value="0.92">Dünn</ion-select-option>
      <ion-select-option :value="1.00">Normaler Habitus</ion-select-option>
      <ion-select-option :value="1.10">Leicht übergewichtig</ion-select-option>
      <ion-select-option :value="1.20">Übergewichtig</ion-select-option>
      <ion-select-option :value="1.30">Sehr übergewichtig</ion-select-option>
    </template>

    <template v-else-if="mode == 'adult'">
      <ion-select-option :value="0.84">Sehr dünn</ion-select-option>
      <ion-select-option :value="0.91">Dünn</ion-select-option>
      <ion-select-option :value="1.05">Normaler Habitus</ion-select-option>
      <ion-select-option :value="1.23">Sportlich/Muskulös</ion-select-option>
      <ion-select-option :value="1.27">Leicht übergewichtig</ion-select-option>
      <ion-select-option :value="1.45">Übergewichtig</ion-select-option>
      <ion-select-option :value="1.68">Sehr übergewichtig</ion-select-option>
    </template>

  </ion-select>
</template>

<script setup lang="ts">
import { HabitusModeValue } from '@/types/emergency';
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: number,
  mode: HabitusModeValue,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

const currentMulti = ref(props.modelValue)
watch(() => currentMulti.value, (v) => {
  if (currentMulti.value !== props.modelValue) {
    emit('update:modelValue', currentMulti.value)
  }
})

</script>

<style scoped>
.ns-habitus-input {
  min-width: 8rem;
  flex-shrink: 100;
  --border-width: var(--highlight-height);
  --border-color: var(--highlight-color);
}
</style>
