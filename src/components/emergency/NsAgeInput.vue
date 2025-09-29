<template>
  <div class="ns-age-input">
    <ion-input v-model="internalYears"
      label="Alter" class="ns-age-input--part" :class="{ error: internalYears?.length == 0 }"
      fill="outline" labelPlacement="stacked" inputmode="numeric"
      :maxlength="3" ref="internalYearEl"
      @input="onYearInput">
      <span slot="end" class="year-suffix">{{ yearsSuffix }}</span>
    </ion-input>
    <ion-input v-model="internalMonths" v-if="showMonthInput"
      label="Monate" class="ns-age-input--part" :class="{ error: internalMonths?.length == 0 }"
      fill="outline" labelPlacement="stacked" inputmode="numeric"
      :maxlength="2" ref="internalMonthEl"
      @input="onMonthInput">
      <span slot="end" class="year-suffix">{{ monthsSuffix }}</span>
    </ion-input>
  </div>
</template>

<script setup lang="ts">
import { gainFocus } from '@/service/input';
import { IonInput, IonLabel, IonNote, IonSelect, IonSelectOption } from '@ionic/vue'
import { computed, ref, watch } from 'vue'

const props = defineProps<{ modelValue?: number|null }>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: number|null): void
}>()

const internalYears = ref<string|null>(String(Math.floor(props.modelValue ?? 50)))
const internalMonths = ref<string|null>(String(Math.round(((props.modelValue ?? 50) % 1) * 12)))

const internalYearEl = ref<any|null>(null)
const internalMonthEl = ref<any|null>(null)

const showMonthInput = computed(() => internalYears.value == '0')
const yearsSuffix = computed(() => (internalYears.value != '' && internalYears.value == '1') ? 'Jahr' : 'Jahre')
const monthsSuffix = computed(() => (internalMonths.value != '' && internalMonths.value == '1') ? 'Monat' : 'Monate')

const calculateTotalYears = (): number|null => {
  if (internalYears.value == '' || internalMonths.value == '') { return null }
  return Number(internalYears.value) + (Number(internalMonths.value) / 12)
}
const onYearInput = (event: Event) => {

  const target = event.target as HTMLInputElement
  let years = target.value.replace(/\D+/g, '')

  // limit years
  if (years.length>1 && years.startsWith('0'))
  {
    years = '0'
  }
  else if (years.length>=3)
  {
    const firstDigits = Number(years.slice(0, 2))
    if (firstDigits>12) {
      years = String(firstDigits)
    }
  }

  /**
   * Update both the state variable and
   * the component to keep them in sync.
   */
  internalYears.value = years;

  const inputCmp = internalYearEl.value;
  if (inputCmp !== undefined) {
    inputCmp.$el.value = years;
  }

  const newValue = calculateTotalYears()
  emit('update:modelValue', !newValue ? null : newValue)

}
const onMonthInput = (event: Event) => {


  const target = event.target as HTMLInputElement
  let months = target.value.replace(/\D+/g, '')

  // limit months
  if (months.length>1 && months.startsWith('0'))
  {
    months = '0'
  }
  else if (months.length>=1)
  {
    const firstDigit = Number(months.slice(0, 1))
    if (Number(months)>12) {
      months = String(firstDigit)
    }
  }

  /**
   * Update both the state variable and
   * the component to keep them in sync.
   */
  internalMonths.value = months;

  const inputCmp = internalMonthEl.value;
  if (inputCmp !== undefined) {
    inputCmp.$el.value = months;
  }

  const newValue = calculateTotalYears()
  emit('update:modelValue', !newValue ? null : newValue)

}

watch(() => internalYears.value, (v) => {
  if (v == '0')
  {
    gainFocus(internalMonthEl, true)
  }
})

</script>

<style scoped>
.ns-age-input {
  display: flex;
  gap: 0.5rem;
}

.ns-age-estimate,
.ns-age-input--part {
  --border-width: var(--highlight-height);
  --border-color: var(--highlight-color);
}
.ns-age-input--part {
  border-radius: 4px;
  max-width: 7rem;
  text-align: center;
}
.ns-age-input--part:hover {
  --border-color: var(--highlight-color);
  background: var(--ns-ion-primary-fade);
}

.ns-age-input--part.error {
  --border-color: #f00;
}

.year-suffix {
  margin-inline-start: 0 !important;
  opacity: 0.4;
  cursor: text;
  font-size: 0.9em;
}

</style>
