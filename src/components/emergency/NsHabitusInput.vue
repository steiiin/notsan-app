<template>
  <ion-select placeholder="Habitus" class="ns-habitus-input"
    fill="outline" interface="popover" :value="modelValue"
    @ionChange="onChange">

    <ion-select-option v-for="option in modeOptions"
      :key="option.value" :value="option.value">
      {{ option.label }}
    </ion-select-option>

  </ion-select>
</template>

<script setup lang="ts">
import { HabitusModeValue, HabitusValue } from '@/types/patient';
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { computed } from 'vue';

const props = defineProps<{
  modelValue: HabitusValue,
  mode: HabitusModeValue,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: HabitusValue): void
}>()

const OPTIONS: Record<HabitusModeValue, ReadonlyArray<{ value: HabitusValue, label: string }>> = {
  child: [
    { value: 'very-thin', label: 'Sehr dünn' },
    { value: 'thin', label: 'Dünn' },
    { value: 'normal', label: 'Normaler Habitus' },
    { value: 'lightly-overweight', label: 'Leicht übergewichtig' },
    { value: 'overweight', label: 'Übergewichtig' },
    { value: 'very-overweight', label: 'Sehr übergewichtig' },
  ],
  adult: [
    { value: 'very-thin', label: 'Sehr dünn' },
    { value: 'thin', label: 'Dünn' },
    { value: 'normal', label: 'Normaler Habitus' },
    { value: 'sporty', label: 'Sportlich/Muskulös' },
    { value: 'lightly-overweight', label: 'Leicht übergewichtig' },
    { value: 'overweight', label: 'Übergewichtig' },
    { value: 'very-overweight', label: 'Sehr übergewichtig' },
  ],
}

const modeOptions = computed(() => {
  const baseOptions = OPTIONS[props.mode]
  if (baseOptions.some(option => option.value === props.modelValue)) {
    return baseOptions
  }

  const fallbackOption =
    OPTIONS.child.find(option => option.value === props.modelValue) ||
    OPTIONS.adult.find(option => option.value === props.modelValue)

  if (fallbackOption) {
    return [...baseOptions, fallbackOption]
  }

  return baseOptions
})

const onChange = (event: CustomEvent<{ value: HabitusValue }>) => {
  const value = event.detail.value
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
  }
}

</script>

<style scoped>
.ns-habitus-input {
  min-width: 8rem;
  flex-shrink: 100;
  --border-width: var(--highlight-height);
  --border-color: var(--highlight-color);
}
</style>
