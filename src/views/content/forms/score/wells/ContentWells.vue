<template>
  <ns-content-group :style="wellsData.color">
    <div class="title-row">
      <div class="title">{{ wellsData.title }}</div>
      <div class="score">{{ wellsScore }} Punkte</div>
    </div>
    <div class="subtitle">für eine Lungenembolie</div>
  </ns-content-group>

  <ns-content-group>
    <ns-button-score-list>
      <ns-button-score-group v-model="thrombosisSigns" :option="{
        type: 'yes-no', label: 'Anzeichen tiefer Beinvenenthrombose'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="alternativeDiagnosisUnlikely" :option="{
        type: 'yes-no', label: 'Andere Diagnosen unwahrscheinlich'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="tachycardia" :option="{
        type: 'yes-no', label: 'Herzfrequenz > 100/min'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="immobilisation" :option="{
        type: 'yes-no', label: 'Immobilisation > 3d'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="recentSurgery" :option="{
        type: 'yes-no', label: 'OP vor weniger als 4w'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="previousEmbolismOrDvt" :option="{
        type: 'yes-no', label: 'Frühere Lungenembolie/TVT'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="hemoptysis" :option="{
        type: 'yes-no', label: 'Hämoptyse'}">
      </ns-button-score-group>

      <ns-button-score-group v-model="activeCancer" :option="{
        type: 'yes-no', label: 'Aktive Krebserkrankung'}">
      </ns-button-score-group>
    </ns-button-score-list>
  </ns-content-group>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import NsButtonScoreGroup from '@/components/NsButtonScoreGroup.vue'
import NsButtonScoreList from '@/components/NsButtonScoreList.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'

const thrombosisSigns = ref(false)
const alternativeDiagnosisUnlikely = ref(false)
const tachycardia = ref(false)
const immobilisation = ref(false)
const recentSurgery = ref(false)
const previousEmbolismOrDvt = ref(false)
const hemoptysis = ref(false)
const activeCancer = ref(false)

const wellsScore = computed(() => {
  let score = 0
  if (thrombosisSigns.value) { score += 3 }
  if (alternativeDiagnosisUnlikely.value) { score += 3 }
  if (tachycardia.value) { score += 1.5 }
  if (immobilisation.value) { score += 1.5 }
  if (recentSurgery.value) { score += 1.5 }
  if (previousEmbolismOrDvt.value) { score += 1.5 }
  if (hemoptysis.value) { score += 1 }
  if (activeCancer.value) { score += 1 }
  return score
})

const wellsData = computed(() => {
  if (wellsScore.value < 2) {
    return {
      title: 'Geringe Wahrscheinlichkeit',
      color: '',
    }
  }
  if (wellsScore.value <= 6) {
    return {
      title: 'Mittlere Wahrscheinlichkeit',
      color: '--ion-card-background:var(--ns-kof-burn-1st);',
    }
  }
  return {
    title: 'Hohe Wahrscheinlichkeit',
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
