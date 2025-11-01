<template>
  <div class="ns-button-group" :class="{ oneliner }">
    <ion-button
      v-for="option in options"
      :key="option.value"
      :fill="isActive(option) ? 'solid' : 'outline'"
      expand="block"
      @click="onSelect(option.value)"
    >
      {{ option.label }}
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue'

type ButtonValue = string | number | boolean

type ButtonOption = {
  label: string
  value: ButtonValue
}

const props = defineProps<{
  options: ButtonOption[]
  modelValue?: ButtonValue
  oneliner?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ButtonValue): void
}>()

const isActive = (option: ButtonOption) => option.value === props.modelValue

const onSelect = (value: ButtonValue) => {
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
  }
}
</script>

<style scoped>
.ns-button-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: 0.5rem;
  width: 100%;
}
.ns-button-group.oneliner {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.ns-button-group ion-button {
  width: 100%;
  margin: 0;
}
.ns-button-group.oneliner ion-button {
  width: unset;
  flex: 1;
  overflow: hidden;
}

</style>
