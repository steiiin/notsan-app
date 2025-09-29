<template>
  <ion-input v-model="internalValue"
    label="Größe" class="ns-height-input"
    fill="outline" labelPlacement="stacked" inputmode="numeric"
    :maxlength="heightMaxLength" ref="internalEl"
    @input="onInput">
    <span slot="end" class="cm-suffix">{{ heightSuffix }}</span>
  </ion-input>
</template>

<script setup lang="ts">
import { stripDots, stripWrongDots } from '@/service/text';
import { IonInput } from '@ionic/vue'
import { computed, ref, watch } from 'vue'

const props = defineProps<{ modelValue?: number|null }>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: number|null): void
}>()

const normalizeToCentimeters = (value: number|null|undefined): number|null => {
  if (value == null || Number.isNaN(value)) { return null }
  if (value < 3) { return Math.round(value * 100) }
  return Math.round(value)
}

const deriveModeFromValue = (value: number|null|undefined): 'm'|'cm' => {
  if (value == null) { return 'm' }
  return value < 3 ? 'm' : 'cm'
}

const formatDisplayValue = (centimeters: number, mode: 'm'|'cm'): string => {
  if (mode === 'm') {
    const meters = (centimeters / 100).toFixed(2)
    return meters.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '')
  }
  return String(centimeters)
}

const internalEl = ref<any|null>(null)

const lastManualCentimeters = ref<number|null>(null)

const initialCentimeters = normalizeToCentimeters(props.modelValue)
const inputMode = ref<'m'|'cm'>(deriveModeFromValue(props.modelValue))
const internalValue = ref(
  initialCentimeters != null ? formatDisplayValue(initialCentimeters, inputMode.value) : ''
)

const syncInputElement = (value: string) => {
  const inputCmp = internalEl.value
  if (inputCmp !== undefined && inputCmp !== null) {
    inputCmp.$el.value = value
  }
}
const heightSuffix = computed(() => inputMode.value)
const heightMaxLength = computed(() => {
  if (inputMode.value == 'm') { return 4 }
  const firstDigit = Number(internalValue.value.slice(0, 1))
  if (firstDigit>2) { return 2 }
  else { return 3 }
})

watch(
  () => props.modelValue,
  value => {
    const normalizedValue = normalizeToCentimeters(value)

    if (normalizedValue === lastManualCentimeters.value) {
      lastManualCentimeters.value = null
      return
    }

    if (normalizedValue == null) {
      inputMode.value = 'm'
      internalValue.value = ''
      syncInputElement('')
      lastManualCentimeters.value = null
      return
    }

    inputMode.value = deriveModeFromValue(value)
    internalValue.value = formatDisplayValue(normalizedValue, inputMode.value)
    syncInputElement(internalValue.value)
    lastManualCentimeters.value = null
  }
)

const onInput = (event: Event) => {

  const target = event.target as HTMLInputElement
  let height = target.value.replace(/[^0-9.,]/g, '').replace(',', '.')

  // limit height
  if (height.length == 0) { inputMode.value = 'm' }
  else if (height.length == 1)
  {
    if (Number(height) > 2) { inputMode.value = 'cm' }
    else { inputMode.value = 'm' }
  }
  else if (height.length >= 2)
  {

    const firstDigit = Number(height.slice(0, 1))
    if (isNaN(firstDigit) || firstDigit >= 3 || Number(height)>=3) {

      height = stripDots(height)
      inputMode.value = 'cm'

    }
    else {

      height = stripWrongDots(height)
      inputMode.value = 'm'

    }
  }

  /**
   * Update both the state variable and
   * the component to keep them in sync.
   */
  internalValue.value = height
  syncInputElement(height)

  if (height === '') {
    lastManualCentimeters.value = null
    emit('update:modelValue', null)
    return
  }

  let centimeters: number|null = null
  if (inputMode.value === 'm') {
    const meters = Number(height)
    centimeters = Number.isNaN(meters) ? null : Math.round(meters * 100)
  } else {
    const cmValue = Number(height)
    centimeters = Number.isNaN(cmValue) ? null : Math.round(cmValue)
  }

  lastManualCentimeters.value = centimeters
  emit('update:modelValue', centimeters)
}

</script>

<style scoped>
.ns-height-input {
  --border-width: var(--highlight-height);
  --border-color: var(--highlight-color);
  border-radius: 4px; max-width: 6rem;
  text-align: center;
}
.ns-height-input:hover {
  --border-color: var(--highlight-color);
  background: var(--ns-ion-primary-fade);
}

.cm-suffix {
  margin-inline-start: 0 !important;
  opacity: 0.4;
  cursor: text;
  font-size: 0.9em;
}

</style>
