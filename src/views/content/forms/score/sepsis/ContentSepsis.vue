<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        Kriterien nach <b>NEWS2</b>, um einen Sepsis-Verdacht in der Schwere abschätzen zu kännen.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group :style="news2Data.color">
    <div class="title-row">
      <div class="title">{{ news2Data.title }}</div>
      <div class="score">{{ news2Data.score }} Punkte</div>
    </div>
    <div class="subtitle">für eine Sepsis mit schwerem Krankheitsverlauf</div>
  </ns-content-group>
  <ns-content-group>
    <ns-button-score-list>

      <ns-button-score-group v-model="vigilanz" :option="{
        type: 'yes-no', label: 'Akute Bewusstseinsveränderung?'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="o2Gabe" :option="{
        type: 'yes-no', label: 'Sauerstoffgabe?'}"
        style="margin-bottom: .5rem;">
      </ns-button-score-group>

      <ion-select style="margin-bottom: .5rem;"
        label="Atemfrequenz"
        interface="popover" justify="start" fill="outline"
        v-model="atemfrequenz">
        <ion-select-option :value="3">
          &le; 8/min
        </ion-select-option>
        <ion-select-option :value="1">
          9-11/min
        </ion-select-option>
        <ion-select-option :value="0">
          12-20/min
        </ion-select-option>
        <ion-select-option :value="2">
          21-24/min
        </ion-select-option>
        <ion-select-option :value="3">
          &ge; 25/min
        </ion-select-option>
      </ion-select>

      <ion-select style="margin-bottom: .5rem;"
        label="Blutdruck (syst.)"
        interface="popover" justify="start" fill="outline"
        v-model="blutdruck">
        <ion-select-option :value="3">
          &le; 90mmHg
        </ion-select-option>
        <ion-select-option :value="2">
          91-100mmHg
        </ion-select-option>
        <ion-select-option :value="1">
          101-110mmHg
        </ion-select-option>
        <ion-select-option :value="0">
          111-219mmHg
        </ion-select-option>
        <ion-select-option :value="3">
          &ge; 220mmHg
        </ion-select-option>
      </ion-select>

      <ion-select style="margin-bottom: .5rem;"
        label="SpO2 (%)"
        interface="popover" justify="start" fill="outline"
        v-model="spO2">
        <ion-select-option :value="3">
          &le; 91%
        </ion-select-option>
        <ion-select-option :value="2">
          92-93%
        </ion-select-option>
        <ion-select-option :value="1">
          94-95%
        </ion-select-option>
        <ion-select-option :value="0">
          &ge; 96%
        </ion-select-option>
      </ion-select>

      <ion-select style="margin-bottom: .5rem;"
        label="Herzfrequenz (/min)"
        interface="popover" justify="start" fill="outline"
        v-model="herzfrequenz">
        <ion-select-option :value="3">
          &le; 40/min
        </ion-select-option>
        <ion-select-option :value="1">
          41-50/min
        </ion-select-option>
        <ion-select-option :value="0">
          51-90/min
        </ion-select-option>
        <ion-select-option :value="1">
          91-110/min
        </ion-select-option>
        <ion-select-option :value="2">
          111-130/min
        </ion-select-option>
        <ion-select-option :value="3">
          &ge; 131/min
        </ion-select-option>
      </ion-select>

      <ion-select
        label="Körpertemperatur (°C)"
        interface="popover" justify="start" fill="outline"
        v-model="temperatur">
        <ion-select-option :value="3">
          &le; 35°C
        </ion-select-option>
        <ion-select-option :value="1">
          35,1-36°C
        </ion-select-option>
        <ion-select-option :value="0">
          36,1-38°C
        </ion-select-option>
        <ion-select-option :value="1">
          38,1-39°C
        </ion-select-option>
        <ion-select-option :value="2">
          &ge; 39,1°C
        </ion-select-option>
      </ion-select>

    </ns-button-score-list>
  </ns-content-group>

</template>

<script setup lang="ts">

import { IonSelect, IonSelectOption } from '@ionic/vue'
import { computed, ref, watch } from 'vue'

import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import NsButtonScoreList from '@/components/NsButtonScoreList.vue'
import NsButtonScoreGroup from '@/components/NsButtonScoreGroup.vue'

const vigilanz = ref(false)
const atemfrequenz = ref(0)
const blutdruck = ref(0)
const spO2 = ref(0)
const o2Gabe = ref(false)
const herzfrequenz = ref(0)
const temperatur = ref(0)

const news2Score = computed(() => {
  let score = 0
  if (vigilanz.value) { score += 3 }
  if (o2Gabe.value) { score += 2 }
  return score + atemfrequenz.value + blutdruck.value + spO2.value + herzfrequenz.value + temperatur.value
})

const news2Data = computed(() => {
  if (news2Score.value <= 4) {
    return {
      title: 'Geringes Risiko',
      score: news2Score.value,
      color: '',
    }
  }
  if (news2Score.value <= 6) {
    return {
      title: 'Moderates Risiko',
      score: news2Score.value,
      color: '--ion-card-background:var(--ns-kof-burn-1st);',
    }
  }
  return {
    title: 'Hohes Risiko',
    score: news2Score.value,
    color: '--ion-card-background:var(--ns-kof-burn-2nd);',
  }
})

</script>
<style scoped>
.title-row {
  display: flex;
  align-items: center;
  gap: .75rem;
}
.title {
  font-size: 1.2em;
  font-weight: 700;
  line-height: 1.1;
}
.score {
  padding: .2rem .6rem;
  background: rgba(var(--ion-color-light-rgb), 0.3);
  border: 1px solid rgba(var(--ion-color-light-rgb), 0.8);
  border-radius: 5px;
}
.subtitle {
  opacity: .66;
  line-height: 1.1;
}
</style>
