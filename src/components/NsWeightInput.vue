<template>
  <label class="ns-weight-input">
    <span class="label">Gewicht</span>
    <span class="input-wrapper">
      <input
        type="number"
        inputmode="numeric"
        pattern="[0-9]*"
        :value="internalValue"
        @input="onInput"
      />
      <span class="suffix">kg</span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ modelValue?: number | null }>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: number | null): void
}>()

const internalValue = ref(props.modelValue != null ? String(props.modelValue) : '')

watch(
  () => props.modelValue,
  value => {
    const nextValue = value != null ? String(value) : ''
    if (nextValue !== internalValue.value) {
      internalValue.value = nextValue
    }
  }
)

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const digitsOnly = target.value.replace(/\D+/g, '')

  if (digitsOnly !== target.value) {
    target.value = digitsOnly
  }

  internalValue.value = digitsOnly
  emit('update:modelValue', digitsOnly === '' ? null : Number(digitsOnly))
}
</script>

<style scoped>
.ns-weight-input {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 1rem;
  color: var(--ion-color-primary, #3880ff);
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid currentColor;
  border-radius: 0.75rem;
  background-color: transparent;
}

input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font: inherit;
  color: inherit;
  text-align: right;
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.suffix {
  font-weight: 600;
  text-transform: lowercase;
}
</style>
