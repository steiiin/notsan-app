<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        Kriterien nach <b>DBRD</b>, zur Entscheidung über die Beförderung von Patienten.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group :style="dotInfoData.color">
    <div class="title">{{ dotInfoData.title }}</div>
    <div class="subtitle">{{ dotInfoData.subtitle }}</div>
  </ns-content-group>
  <ns-content-group>
    <ns-button-score-list>

      <ns-button-score-group v-model="q01" v-if="!isDangerous || q01" :option="{
        type: 'yes-no', label: '< 18J oder betreut (Gesundheit/Aufenthalt)?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q02" v-if="!isDangerous || q02" :option="{
        type: 'yes-no', label: 'Hinweise auf vorliegende/drohende Hilflosigkeit?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q03" v-if="!isDangerous || q03" :option="{
        type: 'yes-no', label: 'Hinweise auf Schlaftrunkenheit/-wandel?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q04" v-if="!isDangerous || q04" :option="{
        type: 'yes-no', label: 'Hinweise auf Drogenintoxikation/Medikamenteneinfluss?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q05" v-if="!isDangerous || q05" :option="{
        type: 'yes-no', label: 'Hinweise auf Fieberdelirium?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q06" v-if="!isDangerous || q06" :option="{
        type: 'yes-no', label: 'Hinweise auf neu aufgetretene Desorientierung?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q07" v-if="!isDangerous || q07" :option="{
        type: 'yes-no', label: 'Bestehende retrograde Amnesie?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q08" v-if="!isDangerous || q08" :option="{
        type: 'yes-no', label: 'Z. n. zerebralem Krampfanfall im aktuellen Einsatz?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q09" v-if="!isDangerous || q09" :option="{
        type: 'yes-no', label: 'Bewusstseinsstörungen unter Hypo-/Hyperglykämie?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q10" v-if="!isDangerous || q10" :option="{
        type: 'yes-no', label: 'Bestehende starke Schmerzzustände?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q11" v-if="!isDangerous || q11" :option="{
        type: 'yes-no', label: 'Hinweise auf höchste Erschöpfung?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q12" v-if="!isDangerous || q12" :option="{
        type: 'yes-no', label: 'Direkt zuvor bestehende Bewusstlosigkeit?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q13" v-if="!isDangerous || q13" :option="{
        type: 'yes-no', label: 'Hinweise auf Suizidalität?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q14" v-if="!isDangerous || q14" :option="{
        type: 'yes-no', label: 'Hinweise auf Fremdgefährdung?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q15" v-if="!isDangerous || q15" :option="{
        type: 'yes-no', label: 'Akute/drohende Lebensgefahr oder schwere Schäden?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="q16" v-if="!isDangerous || q16" :option="{
        type: 'yes-no', label: 'Bedenken/Zweifel des Notfallsanitäters?'}">
      </ns-button-score-group>

    </ns-button-score-list>
  </ns-content-group>

</template>

<script setup lang="ts">

import { computed, ref, watch } from 'vue'

import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import NsButtonScoreList from '@/components/NsButtonScoreList.vue'
import NsButtonScoreGroup from '@/components/NsButtonScoreGroup.vue'

const isDangerous = computed(() => (q01.value || q02.value
  || q03.value || q04.value
  || q05.value || q06.value
  || q07.value || q08.value
  || q09.value || q10.value
  || q11.value || q12.value
  || q13.value || q14.value
  || q15.value || q16.value)
)

const q01 = ref(false)
const q02 = ref(false)
const q03 = ref(false)
const q04 = ref(false)
const q05 = ref(false)
const q06 = ref(false)
const q07 = ref(false)
const q08 = ref(false)
const q09 = ref(false)
const q10 = ref(false)
const q11 = ref(false)
const q12 = ref(false)
const q13 = ref(false)
const q14 = ref(false)
const q15 = ref(false)
const q16 = ref(false)

const dotInfoData = computed(() => {

  if (isDangerous.value) {
    return {
      title: 'Transport rechtlich Geboten',
      subtitle: 'NA sollte nachgefordert werden',
      color: '--ion-card-background:var(--ns-kof-burn-2nd);'
    }
  }
  else
  {
    return {
      title: 'Verweigerung vertretbar',
      subtitle: 'Umfassende Aufklärung beachten',
      color: '' }
  }

})

</script>
<style scoped>
.title {
  font-size: 1.2em;
  font-weight: 700;
  line-height: 1.1;
}
.subtitle {
  opacity: .66;
  line-height: 1.1;
}
</style>
