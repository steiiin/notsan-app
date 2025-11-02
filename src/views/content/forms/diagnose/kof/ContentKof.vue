<template>

  <kof-paint v-model="kof" v-model:open="paintVisible"></kof-paint>

  <ns-content-group :style="infoData.color">
    <div class="title">{{ infoData.title }}</div>
    <div class="subtitle">{{ infoData.subtitle }}</div>
    <div class="percs" v-html="infoData.percs" v-if="infoData.percs"></div>
  </ns-content-group>
   <ns-content-group style="margin-top:-1rem">
    <div class="buttons">
      <ion-button @click="openPaint" color="light" class="block">Bereiche {{ hasAlreadyPaint ? 'bearbeiten' : 'einzeichnen' }}</ion-button>
      <ion-button @click="resetPaint" color="danger" v-if="hasAlreadyPaint">Neu</ion-button>
    </div>
  </ns-content-group>

</template>

<script setup lang="ts">

import { IonButton } from '@ionic/vue';
import KofPaint from '@/components/forms/kof/KofPaint.vue';
import NsContentGroup from '@/components/NsContentGroup.vue';
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
  if (parts.length>1) { parts.push({ deg: '∑', color: percColorStyle(), val: parts.map(e => e.val).reduce((a, v) => a + v, 0) }) }
  return parts.map(e => `<code style="${e.color}">${e.deg} <i>${e.val}%</i></code>`).join('')
}

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
  gap: 0.5rem;
}

.percs :deep(code) {
  display: inline-flex;
  background-color: rgba(var(--ns-kof-perc-color), 0.3);
  border: 1px solid rgba(var(--ns-kof-perc-color), 0.8);
  border-radius: 4px;
  padding: .25rem .75rem;
  gap: .3rem;
  font-size: 1.1em;
  color: var(--ion-color-light-contrast);
  font-family: monospace;
  font-weight: bold;
  align-items: center;
}

.percs :deep(code i)::before {
  content: '|';
  padding-right: .3rem;
}

.percs :deep(code i) {
  font-size: 0.8em;
  font-family: var(--ion-font-family), inherit;
  font-weight: normal;
}
</style>

