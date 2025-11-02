<template>

  <kof-paint v-model="kof" v-model:open="paintVisible"></kof-paint>

  <ns-content-group :style="infoData.color">
    <div class="title">{{ infoData.title }}</div>
    <div class="subtitle">{{ infoData.subtitle }}</div>
    <div class="percs" v-html="infoData.percs" v-if="infoData.percs"></div>
  </ns-content-group>
  <ns-content-group style="margin-top:-0.3rem">
    <div class="buttons">
      <ion-button @click="openPaint" color="light" class="block">Bereiche {{ hasAlreadyPaint ? 'bearbeiten' : 'einzeichnen' }}</ion-button>
      <ion-button @click="resetPaint" color="danger" v-if="hasAlreadyPaint">Neu</ion-button>
    </div>
  </ns-content-group>
  <template v-if="hasAlreadyPaint">
    <ns-content-group title="Entscheidung Brandverletztenzentrum" v-if="!needBurnclinicByVkof">
      <ns-button-score-list>
        <ns-button-score-group v-model="bc_chemical" :option="{
          type: 'yes-no', label: 'Verätzung durch Chemikalien?'}">
        </ns-button-score-group>
        <ns-button-score-group v-model="bc_inhal" :option="{
          type: 'yes-no', label: 'Inhaltationstrauma?'}">
        </ns-button-score-group>
      </ns-button-score-list>
    </ns-content-group>
    <ns-content-group :style="burnclinicInfoData.color">
      <div class="title">{{ burnclinicInfoData.title }}</div>
      <div class="subtitle">{{ burnclinicInfoData.subtitle }}</div>
    </ns-content-group>
  </template>

</template>

<script setup lang="ts">

import { IonButton } from '@ionic/vue';
import KofPaint from '@/components/forms/kof/KofPaint.vue';
import NsContentGroup from '@/components/NsContentGroup.vue';
import NsButtonScoreGroup from '@/components/NsButtonScoreGroup.vue';
import NsButtonScoreList from '@/components/NsButtonScoreList.vue';
import { KofInfo } from '@/types/forms/kof';

import { computed, ref } from 'vue';
import { round } from '@/service/math';

const kof = ref<KofInfo>({ patientAge: 'adult' })
const paintVisible = ref(true)

const openPaint = () => {
  paintVisible.value = true
}
const resetPaint = () => {
  kof.value = { patientAge: 'adult' }
  bc_chemical.value = false
  bc_inhal.value = false
  openPaint()
}
const hasAlreadyPaint = computed(() => !!kof.value.paintState)

const infoData = computed(() => {

  const calc = kof.value.calculation

  if (!calc || (!calc.has1st && !calc.has2nd && !calc.has3rd)) {
    return { title: 'Keine Verbrennung', subtitle: '0% KOF', color: '' }
  }

  let color = ''
  if (calc.has3rd) { color = cardColorStyle('3rd') }
  else if (calc.has2nd) { color = cardColorStyle('2nd') }
  else if (calc.has1st) { color = cardColorStyle('1st') }

  let title = 'Verbrennung'
  let subtitle = ''
  let percs = ''
  if (
    calc.criticalRegions.hasFace
    ||calc.criticalRegions.hasHands
    ||calc.criticalRegions.hasGenital
  ) {
    title = 'Kritische Verbrennung'

    let parts = []
    if (calc.criticalRegions.face) { parts.push('Gesicht') }
    if (calc.criticalRegions.hands) { parts.push('Hände') }
    if (calc.criticalRegions.genital) { parts.push('Genitalien') }
    subtitle = `${parts.join('/')} betroffen.`
  }

  if (calc.has3rd || calc.has2nd) {
    if (calc.percTotal < 5) { title = 'Lokale Verbrennung' }
    else if (calc.percTotal < 15) { title = 'Ausgedehnte Verbrennung' }
    else if (calc.percTotal < 40) { title = 'Schwere Verbrennung' }
    else { title = 'Kritische Verbrennung' }
  }
  else {
    title = 'Oberflächliche Verbrennung'
  }

  percs = degreePercs(
    calc.has1st ? calc.perc1st : 0,
    calc.has2nd ? calc.perc2nd : 0,
    calc.has3rd ? calc.perc3rd : 0)

  return { title, subtitle, percs, color }

})

const cardColorStyle = (colorCode?: string): string => {
  if (!!colorCode && colorCode.length>0)
  {
    const colorCss = `var(--ns-kof-burn-${colorCode})`
    return `--ion-card-background:${colorCss};`
  }
  else
  {
    return ''
  }
}
const percColorStyle = (colorCode?: string): string => {
  if (!!colorCode && colorCode.length>0)
  {
    const colorCss = `var(--ns-kof-burn-${colorCode}-rgb)`
    return `--ns-kof-perc-color: ${colorCss};`
  }
  else
  {
    return '--ns-kof-perc-color: var(--ion-color-dark-contrast-rgb);'
  }
}
const percRoundedValue = (perc: number): number => {
  return round(perc, perc>5 ? 5 : 1)
}

const degreePercs = (pct1: number, pct2: number, pct3: number) => {

  const parts = []
  if (pct1 > 0) { parts.push({ deg: '1°', color: percColorStyle('1st'), val: percRoundedValue(pct1) }) }
  if (pct2 > 0) { parts.push({ deg: '2°', color: percColorStyle('2nd'), val: percRoundedValue(pct2) }) }
  if (pct3 > 0) { parts.push({ deg: '3°', color: percColorStyle('3rd'), val: percRoundedValue(pct3) }) }
  if (parts.length>1) { parts.push({ deg: 'VKOF', color: percColorStyle(), val: parts.map(e => e.deg.startsWith('1') ? 0 : e.val).reduce((a, v) => a + v, 0) }) } // VKOF wird ohne 1° ermittelt
  return parts.map(e => `<code style="${e.color}">${e.deg} <i>${e.val}%</i></code>`).join('')
}

/** Indikation für stationäre Behandlung in Zentren für Brandverletzte
 *  (AWMF-S2K-Leitlinie 2021)
 *  - Verbrennung 2° >= 10% VKOF
 *  - Verbrennung 3°
 *  - Verbrennung > 1° an Hand/Genital/Gesicht
 *  - Chemikalienverätzungen
 *  - Inhalationstrauma
 *  - (Begleiterkrankungen, die die Behandlung erschweren)
 *  - (spezielle psychologische, psychiatrische oder physische Betreuung notwendig)
 */

const needBurnclinicByVkof = computed(() => bc_vkof10.value || bc_3rd.value || bc_crit.value)

const bc_chemical = ref(false)
const bc_inhal = ref(false)

const bc_vkof10 = computed(() => kof.value.calculation ? (kof.value.calculation.perc2nd+kof.value.calculation.perc3rd) >= 10 : false)
const bc_3rd = computed(() => kof.value.calculation?.has3rd ?? false)
const bc_crit = computed(() => kof.value.calculation ? (kof.value.calculation.criticalRegions.hasFace || kof.value.calculation.criticalRegions.hasGenital || kof.value.calculation.criticalRegions.hasHands) : false)

const burnclinicInfoData = computed(() => {

  const checks = []
  if (bc_vkof10.value) { checks.push('VKOF≥10%') }
  if (bc_3rd.value) { checks.push('3°') }
  if (bc_crit.value) { checks.push(infoData.value.subtitle) }
  if (bc_chemical.value) { checks.push('Verätzung') }
  if (bc_inhal.value) { checks.push('Inhalationstrauma') }


  if (checks.length == 0) {
    let subtitle = 'Nur 1° Verbrennungen'
    if (kof.value.calculation?.has2nd) { subtitle = 'VKOF unter 10%' }
    return { title: 'Verbrennungsbett nicht notwendig', subtitle, color: cardColorStyle('') }
  }
  else
  {
    return { title: 'Verbrennungsbett notwendig', subtitle: checks.join(', '), color: cardColorStyle('') }
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
.buttons {
  display: flex;
  gap: .5rem;
  justify-content: space-between;
}
.buttons > .block {
  flex: 1;
}

.percs {
  display: flex;
  gap: 0.3rem;
}

.percs :deep(code) {
  display: inline-flex;
  background-color: rgba(var(--ns-kof-perc-color), 0.3);
  border: 1px solid rgba(var(--ns-kof-perc-color), 0.8);
  border-radius: 4px;
  padding: .1rem .5rem;
  gap: .2rem;
  font-size: 1.1em;
  color: var(--ion-color-light-contrast);
  font-family: monospace;
  font-weight: bold;
  align-items: center;
}

.percs :deep(code i)::before {
  content: '|';
  padding-right: .2rem;
}

.percs :deep(code i) {
  font-size: 0.8em;
  font-family: var(--ion-font-family), inherit;
  font-weight: normal;
  font-style: normal;
}
</style>

