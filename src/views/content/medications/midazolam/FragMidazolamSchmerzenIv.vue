<template>
  <template v-if="enabled">

    <template v-if="dose == IvRange.NotApplicable">
      <ns-dosage :dosage="{
        target: 'Midazolam', dose: 'Keine', hint: 'Gabe' }">
      </ns-dosage>
    </template>
    <template v-else-if="dose == IvRange.Low">
      <ns-dosage :dosage="{
        target: 'Midazolam', dose: '1mg' }">
      </ns-dosage>
    </template>
    <template v-else-if="dose == IvRange.High">
      <ns-dosage :dosage="{
        target: 'Midazolam', dose: '2mg' }">
      </ns-dosage>
    </template>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Midazolam) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';
import { Patient } from '@/types/emergency';
import { computed } from 'vue';

const props = defineProps<{
  patient: Patient
}>()

enum IvRange
{
  Low,
  High,
  NotApplicable,
}

const dose = computed(() => {
  if (props.patient.estimatedWeight < 10) { return IvRange.NotApplicable }
  if (props.patient.estimatedAge > 60 || props.patient.estimatedWeight < 50) { return IvRange.Low }
  return IvRange.High
})

</script>

<style lang="css" scoped>

</style>
