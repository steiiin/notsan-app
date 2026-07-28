<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        Diagnoseabschätzung für <b>nicht-traumatische Thoraxschmerzen</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group v-if="hasDdScores" :style="ddCardStyle">
    <div class="dd-card">
      <div class="title-row">
        <div>
          <div class="title">{{ ddTopTitle }}</div>
        </div>
        <div class="score">{{ ddTopProbability }}%</div>
      </div>
      <div class="dd-score-list">
        <div v-for="result in ddResults" :key="result.id" class="dd-score" :class="{ top: result.isTop }">
          <div class="dd-score-header">
            <span>{{ result.label }}</span>
            <span>{{ result.probability }}%</span>
          </div>
          <div class="dd-score-bar">
            <div
              class="dd-score-bar-fill"
              :style="{ width: `${result.probability}%`, backgroundColor: result.color }">
            </div>
          </div>
        </div>
      </div>
    </div>
  </ns-content-group>
  <ns-content-group>
    <ns-button-score-list>

      <ns-button-score-group v-model="pain_abrupt_maximum":option="{
        type: 'yes-no', label: 'Abrupter Schmerzbeginn?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="pain_pressure":option="{
        type: 'yes-no', label: 'Retrosternale Enge/Druck?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="pain_pleuritic":option="{
        type: 'yes-no', label: 'Schmerzen beim Einatmen/Husten?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="pain_arm_jaw":option="{
        type: 'yes-no', label: 'Ausstrahlung Arm/Schulter/Kiefer?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="pain_back_abdomen":option="{
        type: 'yes-no', label: 'Ausstrahlung in Rücken/Bauch?'}">
      </ns-button-score-group>

    </ns-button-score-list>
  </ns-content-group>
  <ns-content-group>
    <ns-button-score-list>

      <ns-button-score-group v-model="dyspnea_dominant":option="{
        type: 'yes-no', label: 'Luftnot im Vordergrund?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="syncope":option="{
        type: 'yes-no', label: 'Synkope aufgetreten?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="autonomic_symptoms":option="{
        type: 'yes-no', label: 'Starke Vegetative Symptome?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="dysphagia":option="{
        type: 'yes-no', label: 'Schluckstörung/Schmerzen beim Schlucken?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="fever_sepsis":option="{
        type: 'yes-no', label: 'Fieber?'}">
      </ns-button-score-group>

    </ns-button-score-list>
  </ns-content-group>
  <ns-content-group>
    <ns-button-score-list>

      <ns-button-score-group v-model="ecg_ischema":option="{
        type: 'yes-no', label: 'EKG: ST-Hebungen?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="dvt_signs":option="{
        type: 'yes-no', label: 'Einseite Beinschwellung / andere TVT-Zeichen?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="aortic_exam":option="{
        type: 'yes-no', label: 'Pulsdefizit/Blutdruckdifferenz/Neurologisches Defizit?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="unilateral_breath_sounds":option="{
        type: 'yes-no', label: 'Atemgeräusch einseitig aufgehoben?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="asymmetric_chest":option="{
        type: 'yes-no', label: 'Deutliche Seitendifferenz der Thoraxexkursion?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="subcutaneous_emphysema":option="{
        type: 'yes-no', label: 'Subkutanes Emphysem an Thorax/Hals?'}">
      </ns-button-score-group>

    </ns-button-score-list>
  </ns-content-group>
  <ns-content-group>
    <ns-button-score-list>

      <ns-button-score-group v-model="cad_history":option="{
        type: 'yes-no', label: 'Bekannte KHK / Früheres ACS?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="vomiting_before_pain":option="{
        type: 'yes-no', label: 'Erbrechen/Würgen unmittelbar zuvor?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="esophageal_procedure":option="{
        type: 'yes-no', label: 'Behandlungen an Speiseröhre zuvor?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="vte_risk":option="{
        type: 'yes-no', label: 'Thromboserisikofaktoren?'}">
      </ns-button-score-group>

    </ns-button-score-list>
  </ns-content-group>
</template>

<script setup lang="ts">

import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import NsButtonScoreList from '@/components/NsButtonScoreList.vue'
import NsButtonScoreGroup from '@/components/NsButtonScoreGroup.vue'

import { computed, ref } from 'vue'

type DdScore = {
  id: string
  label: string
  score: number
  color: string
  cardColor: string
}

const pain_abrupt_maximum = ref(false)
const pain_pressure = ref(false)
const pain_pleuritic = ref(false)
const pain_arm_jaw = ref(false)
const pain_back_abdomen = ref(false)

const dyspnea_dominant = ref(false)
const syncope = ref(false)
const autonomic_symptoms = ref(false)
const dysphagia = ref(false)
const fever_sepsis = ref(false)

const dvt_signs = ref(false)
const aortic_exam = ref(false)
const unilateral_breath_sounds = ref(false)
const asymmetric_chest = ref(false)
const subcutaneous_emphysema = ref(false)

const cad_history = ref(false)
const vomiting_before_pain = ref(false)
const esophageal_procedure = ref(false)
const vte_risk = ref(false)
const ecg_ischema = ref(false)

const score_acs = computed(() => {
  let score = 0
  if (pain_pressure.value) { score += 3 }
  if (pain_arm_jaw.value) { score += 2 }
  if (dyspnea_dominant.value) { score += 1 }
  if (syncope.value) { score += 1 }
  if (autonomic_symptoms.value) { score += 1 }
  if (ecg_ischema.value) { score += 5 }
  if (cad_history.value) { score += 1 }
  return score
})

const score_lae = computed(() => {
  let score = 0
  if (pain_abrupt_maximum.value) { score += 1 }
  if (pain_pleuritic.value) { score += 2 }
  if (dyspnea_dominant.value) { score += 2 }
  if (syncope.value) { score += 2 }
  if (vte_risk.value) { score += 3 }
  if (dvt_signs.value) { score += 4 }
  return score
})

const score_aas = computed(() => {
  let score = 0
  if (pain_abrupt_maximum.value) { score += 3 }
  if (pain_back_abdomen.value) { score += 3 }
  if (syncope.value) { score += 2 }
  if (aortic_exam.value) { score += 5 }
  return score
})

const score_ptx = computed(() => {
  let score = 0
  if (pain_abrupt_maximum.value) { score += 2 }
  if (pain_pleuritic.value) { score += 2 }
  if (pain_back_abdomen.value) { score += 1 }
  if (dyspnea_dominant.value) { score += 2 }
  if (unilateral_breath_sounds.value) { score += 5 }
  if (asymmetric_chest.value) { score += 3 }
  if (subcutaneous_emphysema.value) { score += 2 }
  return score
})

const score_oes = computed(() => {
  let score = 0
  if (pain_abrupt_maximum.value) { score += 1 }
  if (pain_pleuritic.value) { score += 1 }
  if (pain_back_abdomen.value) { score += 1 }
  if (dyspnea_dominant.value) { score += 1 }
  if (dysphagia.value) { score += 3 }
  if (fever_sepsis.value) { score += 2 }
  if (vomiting_before_pain.value) { score += 5 }
  if (esophageal_procedure.value) { score += 5 }
  if (unilateral_breath_sounds.value) { score += 1 }
  if (subcutaneous_emphysema.value) { score += 3 }
  return score
})

const ddScores = computed<DdScore[]>(() => [
  {
    id: 'acs',
    label: 'Akutes Koronarsyndrom',
    score: score_acs.value,
    color: 'var(--ns-color-red)',
    cardColor: 'var(--ns-color-red-shade)',
  },
  {
    id: 'lae',
    label: 'Lungenembolie',
    score: score_lae.value,
    color: 'var(--ns-color-blue)',
    cardColor: 'var(--ns-color-blue-shade)',
  },
  {
    id: 'aas',
    label: 'Aortensyndrom',
    score: score_aas.value,
    color: 'var(--ns-color-red)',
    cardColor: 'var(--ns-color-red-shade)',
  },
  {
    id: 'ptx',
    label: 'Pneumothorax',
    score: score_ptx.value,
    color: 'var(--ns-color-orange)',
    cardColor: 'var(--ns-color-orange-shade)',
  },
  {
    id: 'oes',
    label: 'Ösophagusruptur',
    score: score_oes.value,
    color: 'var(--ns-color-green)',
    cardColor: 'var(--ns-color-green-shade)',
  },
])

const ddTotalScore = computed(() => ddScores.value.reduce((total, item) => total + item.score, 0))
const hasDdScores = computed(() => ddTotalScore.value > 0)

const ddResults = computed(() => {
  if (ddTotalScore.value == 0) { return [] }

  const calculatedResults = ddScores.value.map((item, index) => {
    const exactProbability = item.score / ddTotalScore.value * 100
    return {
      ...item,
      index,
      exactProbability,
      probability: Math.floor(exactProbability),
      remainder: exactProbability % 1,
    }
  })

  let remainderPoints = 100 - calculatedResults.reduce((total, item) => total + item.probability, 0)
  calculatedResults
    .slice()
    .sort((a, b) => b.remainder - a.remainder || a.index - b.index)
    .forEach((item) => {
      if (remainderPoints <= 0) { return }
      item.probability += 1
      remainderPoints -= 1
    })

  const topScore = Math.max(...calculatedResults.map((item) => item.score))

  return calculatedResults
    .map((item) => ({
      ...item,
      isTop: item.score == topScore,
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
})

const ddTopResults = computed(() => ddResults.value.filter((item) => item.isTop))
const ddTopTitle = computed(() => ddTopResults.value.map((item) => item.label).join(' / '))
const ddTopProbability = computed(() => ddTopResults.value[0]?.probability ?? 0)
const ddCardStyle = computed(() => `--ion-card-background:${ddTopResults.value[0]?.cardColor ?? 'var(--ion-card-background)'};`)

</script>
<style scoped>
.dd-card {
  display: flex;
  flex-direction: column;
  gap: .9rem;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
}

.title {
  font-size: 1.2em;
  font-weight: 700;
  line-height: 1.1;
}

.score {
  flex: 0 0 auto;
  padding: .2rem .6rem;
  background: rgba(var(--ion-color-light-rgb), 0.35);
  border: 1px solid rgba(var(--ion-color-light-rgb), 0.8);
  border-radius: 5px;
  font-weight: 700;
}

.subtitle {
  opacity: .66;
  line-height: 1.1;
}

.dd-score-list {
  display: flex;
  flex-direction: column;
  gap: .45rem;
}

.dd-score {
  display: flex;
  flex-direction: column;
  gap: .25rem;
  opacity: .72;
}

.dd-score.top {
  opacity: 1;
  font-weight: 700;
}

.dd-score-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  line-height: 1.1;
}

.dd-score-bar {
  overflow: hidden;
  height: .45rem;
  background: rgba(var(--ion-color-light-rgb), 0.45);
  border-radius: 4px;
}

.dd-score-bar-fill {
  height: 100%;
  border-radius: inherit;
}
</style>
