<template>
  <ion-input v-model="internalValue"
    label="Gewicht" class="ns-weight-input"
    fill="outline" labelPlacement="stacked" inputmode="numeric"
    :maxlength="3" ref="internalEl"
    @input="onInput">
    <span slot="end" class="kg-suffix">Jahre</span>
  </ion-input>
</template>

<script setup lang="ts">
import { IonInput } from '@ionic/vue'
import { ref, watch } from 'vue'

const props = defineProps<{ modelValue?: number|null }>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: number|null): void
}>()

const internalEl = ref<any|null>(null)
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
  let age = target.value.replace(/\D+/g, '')

  // limit age
  if (age.length>=3)
  {
    const firstDigits = Number(age.slice(0, 2))
    if (firstDigits>12) {
      age = String(firstDigits)
    }
  }

  /**
   * Update both the state variable and
   * the component to keep them in sync.
   */
  internalValue.value = age;

  const inputCmp = internalEl.value;
  if (inputCmp !== undefined) {
    inputCmp.$el.value = age;
  }

  emit('update:modelValue', age === '' ? null : Number(age))
}

</script>

<style scoped>
.ns-weight-input {
  --border-width: var(--highlight-height);
  --border-color: var(--highlight-color);
  border-radius: 4px; max-width: 6rem;
  text-align: center;
}
.ns-weight-input:hover {
  --border-color: var(--highlight-color);
  background: var(--ns-ion-primary-fade);
}

.kg-suffix {
  margin-inline-start: 0 !important;
  opacity: 0.4;
  cursor: text;
  font-size: 0.9em;
}

</style>
