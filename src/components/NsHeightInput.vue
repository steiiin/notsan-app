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
import { countChar, stripDots, stripWrongDots } from '@/service/text';
import { IonInput } from '@ionic/vue'
import { computed, ref, watch } from 'vue'

const props = defineProps<{ modelValue?: number|null }>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: number|null): void
}>()

const internalEl = ref<any|null>(null)
const internalValue = ref(props.modelValue != null ? String(props.modelValue) : '')

const inputMode = ref<'m'|'cm'>('m')
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
    const nextValue = value != null ? String(value) : ''
    if (nextValue !== internalValue.value) {
      internalValue.value = nextValue
    }
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
  internalValue.value = height;

  const inputCmp = internalEl.value;
  if (inputCmp !== undefined) {
    inputCmp.$el.value = height;
  }

  emit('update:modelValue', (height === '' ? null : Number(height)))
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
