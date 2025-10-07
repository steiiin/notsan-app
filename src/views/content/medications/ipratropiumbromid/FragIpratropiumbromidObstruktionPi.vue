<template>
  <template v-if="enabled">
    <template v-if="isApplicable">
      <ns-dosage v-if="useHighDose" :dosage="{
        target: 'Ipratropiumbromid',
        dose: '0,5mg', hint: ampAmount(0.5) }">
      </ns-dosage>
      <ns-dosage v-else :dosage="{
        target: 'Ipratropiumbromid',
        dose: '0,25mg', hint: ampAmount(0.25) }">
      </ns-dosage>
    </template>
    <template v-else>
      <ns-dosage :dosage="{
        target: 'Ipratropiumbromid',
        dose: 'Keine', hint: 'Gabe' }">
      </ns-dosage>
    </template>
  </template>
</template>

<script setup lang="ts">

import { isOnlyOneEnabled, isInh_250ugEnabled, isInh_500ugEnabled } from './Packages'
import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'

// ########################################################################################################

const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Ipratropiumbromid) ?? true)

// ########################################################################################################

import NsDosage from '@/components/medications/NsDosage.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';

const isApplicable = computed(() => patient.age >= 6)

const useHighDose = computed(() => patient.age >= 12)

const ampAmount = (dose: number) => {
  if (isOnlyOneEnabled.value)
  {
    let size = 1
    if (isInh_250ugEnabled.value) { size = 0.25 }
    else if (isInh_500ugEnabled.value) { size = 0.5 }
    const amount = dose/size
    return `(${amount==0.5 ? '½' : amount} Ampulle${amount<=1 ? '' : 'n'})`
  }
  return ''
}

</script>

<style lang="css" scoped>

</style>
