<template>
  <template v-if="enabled">
    <ns-dosage-usage type="im" dense>
      <template v-if="ageRange == EpiAgeRange.High">
        <ns-dosage :dosage="{ target: 'Adrenalin', dose: '0,5mg', hint: '(½ Ampulle)' }"></ns-dosage>
      </template>
      <template v-else>

        <div>
          <p><i>Totfraumfreie</i> 1ml-Spritze verwenden:</p>
          <ns-dosage v-if="ageRange == EpiAgeRange.Medium" :dosage="{
            target: 'Adrenalin',
            dose: ' 0,3mg', hint: '≙  0,3ml' }">
          </ns-dosage>
          <ns-dosage v-else :dosage="{
            target: 'Adrenalin',
            dose: '0,15mg', hint: '≙ 0,15ml' }">
          </ns-dosage>
        </div>

      </template>
    </ns-dosage-usage>
  </template>
</template>

<script setup lang="ts">

import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const enabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Epinephrin) ?? true)

// ########################################################################################################

import NsContentGroup from '@/components/NsContentGroup.vue';
import NsDosageUsage from '@/components/medications/NsDosageUsage.vue';
import NsDosage from '@/components/medications/NsDosage.vue';
import NsContentSplit from '@/components/NsContentSplit.vue';
import NsTextContent from '@/components/NsTextContent.vue';
import NsKeyValueContainer from '@/components/NsKeyValueContainer.vue';
import NsKeyValue from '@/components/NsKeyValue.vue';
import TextMono from '@/components/TextMono.vue';
import NsColorBox from '@/components/NsColorBox.vue';
import TextColored from '@/components/TextColored.vue';
import { Patient } from '@/types/emergency';

import { round } from '@/service/math';
import { computed } from 'vue';

import { iv_1mg } from './Packages'

const props = defineProps<{
  patient: Patient
}>()


enum EpiAgeRange
{
  High,
  Medium,
  Low,
}

const ageRange = computed(() => {
  if (props.patient.estimatedAge >= 12) { return EpiAgeRange.High }
  else if (props.patient.estimatedAge >= 6) { return EpiAgeRange.Medium }
  else { return EpiAgeRange.Low }
})

</script>

<style lang="css" scoped>

</style>
