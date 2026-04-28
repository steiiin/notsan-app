<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        Kriterien nach <b>DBRD</b>, wenn eine Nachforderung des <b>Notarztes</b> geboten ist.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group :style="naInfoData.color">
    <div class="title">{{ naInfoData.title }}</div>
    <div class="subtitle">{{ naInfoData.subtitle }}</div>
  </ns-content-group>
  <ns-content-group>
    <ns-button-score-list>
      <ns-button-score-group v-model="vitaleBedrohung" v-if="!naPositive || vitaleBedrohung" :option="{
        type: 'yes-no', label: 'Konkrete akute vitale Bedrohung erwartbar?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="aProblem" v-if="!naPositive || aProblem" :option="{
        type: 'yes-no', label: 'Gefährdeter Atemweg?'}">
      </ns-button-score-group>

      <template v-if="!naPositive || bProblem">

        <ns-button-score-group v-model="atemnot" :option="{
          type: 'yes-no', label: 'Akute Atemnot?'}">
        </ns-button-score-group>

        <template v-if="atemnot">

          <hr v-if="!bProblem">
          <ns-button-score-group v-model="atemnot_atemfrequenz" v-if="!atemnot_1st || atemnot_atemfrequenz" :option="{
            type: 'yes-no', label: 'Atemfrequenz ≥ 25/min?'}">
          </ns-button-score-group>
          <ns-button-score-group v-model="atemnot_tachykardie" v-if="!atemnot_1st || atemnot_tachykardie" :option="{
            type: 'yes-no', label: 'Tachykardie ≥ 110/min?'}">
          </ns-button-score-group>
          <ns-button-score-group v-model="atemnot_sprechdyspnoe" v-if="!atemnot_1st || atemnot_sprechdyspnoe" :option="{
            type: 'yes-no', label: 'Sprechdyspnoe?'}">
          </ns-button-score-group>
          <hr v-if="!bProblem">

          <template v-if="atemnot_1st">

            <ns-button-score-group v-model="atemnot_desorientiert" v-if="!bProblem || atemnot_desorientiert" :option="{
              type: 'yes-no', label: 'Neue Desorientierung?'}">
            </ns-button-score-group>
            <ns-button-score-group v-model="atemnot_vigilanz" v-if="!bProblem || atemnot_vigilanz" :option="{
              type: 'yes-no', label: 'Neue Vigilanzminderung?'}">
            </ns-button-score-group>
            <ns-button-score-group v-model="atemnot_erschoepft" v-if="!bProblem || atemnot_erschoepft" :option="{
              type: 'yes-no', label: 'Respiratorische Erschöpfung?'}">
            </ns-button-score-group>
            <ns-button-score-group v-model="atemnot_zyanose" v-if="!bProblem || atemnot_zyanose" :option="{
              type: 'yes-no', label: 'Zyanose trotz O2-Gabe?'}">
            </ns-button-score-group>
            <ns-button-score-group v-model="atemnot_kreislauf" v-if="!bProblem || atemnot_kreislauf" :option="{
              type: 'yes-no', label: 'Bradykardie / Hypotension?'}">
            </ns-button-score-group>
            <ns-button-score-group v-model="atemnot_silentlung" v-if="!bProblem || atemnot_silentlung" :option="{
              type: 'yes-no', label: 'Silent Lung?'}">
            </ns-button-score-group>
            <hr v-if="!bProblem">

          </template>

        </template>

      </template>

      <ns-button-score-group v-model="acs" v-if="showAcs" :option="{
        type: 'yes-no', label: 'Akutes Koronarsyndrom?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="blutung" v-if="showBlutung" :option="{
        type: 'yes-no', label: 'Unkontrollierte Blutung?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="bewusstlos" v-if="showBewusstlos" :option="{
        type: 'yes-no', label: 'Bewusstlosigkeit?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="einklemmung" v-if="showEinklemmung" :option="{
        type: 'yes-no', label: 'Einklemmung/Verschüttung?'}">
      </ns-button-score-group>

      <template v-if="leitsymptome_1st && (!naPositive || leitsymptomeProblem)">

        <hr v-if="!leitsymptomeProblem">
        <ns-button-score-group v-model="hypoxie" v-if="!leitsymptomeProblem || hypoxie" :option="{
          type: 'yes-no', label: 'Anzeichen einer Hypoxie?'}">
        </ns-button-score-group>
        <ns-button-score-group v-model="hypoperfusion" v-if="!leitsymptomeProblem || hypoperfusion"  :option="{
          type: 'yes-no', label: 'Anzeichen einer Hypoperfusion?'}">
        </ns-button-score-group>
        <hr v-if="!leitsymptomeProblem">

      </template>

      <ns-button-score-group v-model="geburt" v-if="!naPositive || geburt" :option="{
        type: 'yes-no', label: 'Unmittelbar einsetzende Geburt?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="arztSpecial" v-if="!naPositive || arztSpecial" :option="{
        type: 'yes-no', label: 'Besondere Notarzt-Fertigkeiten vor Ort benötigt?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="verweigerung" v-if="!naPositive || verweigerung" :option="{
        type: 'yes-no', label: 'Transportverweigerung trotz Lebensgefahr?'}">
      </ns-button-score-group>

    </ns-button-score-list>
  </ns-content-group>
  <ns-content-group title="Hypoperfusion" v-if="!naPositive && (leitsymptome_1st && !(leitsymptomeProblem && !hypoperfusion))">
    <ns-text-content>
      <h2>Kompensierter Schock</h2>
      <ul>
        <li>Vegetative Symptome <i>(Unruhe, Blässe, Kaltschweißigkeit)</i></li>
        <li>Rekap-Zeit verlängert <i>(&ge;3s)</i></li>
        <li>Zentralisierung <i>(kalte Extremitäten)</i></li>
      </ul>
      <hr>
      <p>
        Bereits ohne typische Änderung der Vitalparameter liegt das Kriterium vor.
        Erst im <i>Spätstadium</i> kommt es auch zu:
      </p>
      <ul head>
        <li>Tachykardie</li>
        <li>RR-Abfall</li>
      </ul>
    </ns-text-content>
  </ns-content-group>

  <ns-content-group title="Notarztfertigkeiten" v-if="arztSpecial">
    <ns-text-content>
      <p>
        <i>Besondere Therapien</i> vor Ort oder während des Transportes, die ausschließlich durch einen <b>Notarzt</b> durchgeführt werden können/dürfen.
      </p>
      <ul>
        <li>Thoraxdrainage</li>
        <li>Thorakotomie</li>
        <li>Narkose</li>
        <li>Spezielle Rhythmustherapie</li>
      </ul>
    </ns-text-content>
  </ns-content-group>

</template>

<script setup lang="ts">

import { computed, ref, watch } from 'vue'

import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import NsButtonScoreList from '@/components/NsButtonScoreList.vue'
import NsButtonScoreGroup from '@/components/NsButtonScoreGroup.vue'

const vitaleBedrohung = ref(false)
const aProblem = ref(false)

const atemnot = ref(false)
const bProblem = computed(() => atemnot.value && atemnot_1st.value && atemnot_2nd.value)

const atemnot_atemfrequenz = ref(false)
const atemnot_tachykardie = ref(false)
const atemnot_sprechdyspnoe = ref(false)
const atemnot_1st = computed(() => atemnot_atemfrequenz.value || atemnot_tachykardie.value || atemnot_sprechdyspnoe.value)

const atemnot_desorientiert = ref(false)
const atemnot_vigilanz = ref(false)
const atemnot_erschoepft = ref(false)
const atemnot_zyanose = ref(false)
const atemnot_kreislauf = ref(false)
const atemnot_silentlung = ref(false)
const atemnot_2nd = computed(() => atemnot_desorientiert.value || atemnot_vigilanz.value || atemnot_erschoepft.value || atemnot_zyanose.value || atemnot_kreislauf.value || atemnot_silentlung.value)

watch(() => atemnot.value, () => {
  atemnot_atemfrequenz.value = false
  atemnot_tachykardie.value = false
  atemnot_sprechdyspnoe.value = false
})

watch(() => [ atemnot_atemfrequenz.value, atemnot_tachykardie.value, atemnot_sprechdyspnoe.value ], () => {
  atemnot_desorientiert.value = false
  atemnot_vigilanz.value = false
  atemnot_erschoepft.value = false
  atemnot_zyanose.value = false
  atemnot_kreislauf.value = false
  atemnot_silentlung.value = false
})

const acs = ref(false)
const blutung = ref(false)
const bewusstlos = ref(false)
const einklemmung = ref(false)

const resetLeitsymptome = (keep: 'acs' | 'blutung' | 'bewusstlos' | 'einklemmung') => {
  if (keep !== 'acs') acs.value = false
  if (keep !== 'blutung') blutung.value = false
  if (keep !== 'bewusstlos') bewusstlos.value = false
  if (keep !== 'einklemmung') einklemmung.value = false
}

watch(() => acs.value, (value) => {
  if (value) resetLeitsymptome('acs')
})
watch(() => blutung.value, (value) => {
  if (value) resetLeitsymptome('blutung')
})
watch(() => bewusstlos.value, (value) => {
  if (value) resetLeitsymptome('bewusstlos')
})
watch(() => einklemmung.value, (value) => {
  if (value) resetLeitsymptome('einklemmung')
})

const leitsymptome_1st = computed(() => acs.value || blutung.value || bewusstlos.value || einklemmung.value)
const leitsymptomeProblem = computed(() => leitsymptome_1st.value && (hypoxie.value || hypoperfusion.value))

const showAcs = computed(() => {
  if (!naPositive.value) {
    return !leitsymptome_1st.value || acs.value
  }
  return acs.value && leitsymptomeProblem.value
})
const showBlutung = computed(() => {
  if (!naPositive.value) {
    return !leitsymptome_1st.value || blutung.value
  }
  return blutung.value && leitsymptomeProblem.value
})
const showBewusstlos = computed(() => {
  if (!naPositive.value) {
    return !leitsymptome_1st.value || bewusstlos.value
  }
  return bewusstlos.value && leitsymptomeProblem.value
})
const showEinklemmung = computed(() => {
  if (!naPositive.value) {
    return !leitsymptome_1st.value || einklemmung.value
  }
  return einklemmung.value && leitsymptomeProblem.value
})

const hypoxie = ref(false)
const hypoperfusion = ref(false)

watch(() => leitsymptome_1st.value, () => {
  hypoxie.value = false
  hypoperfusion.value = false
})

const geburt = ref(false)
const arztSpecial = ref(false)
const verweigerung = ref(false)

const naChecks = computed(() => {
  const checks = []

  if (vitaleBedrohung.value) { checks.push('Lebensgefahr') }
  if (aProblem.value) { checks.push('gefährdetem Atemweg') }
  if (bProblem.value) { checks.push('schwerer Luftnot') }

  if (acs.value && leitsymptomeProblem.value) { checks.push('ACS') }
  if (blutung.value && leitsymptomeProblem.value) { checks.push('Blutung') }
  if (bewusstlos.value && leitsymptomeProblem.value) { checks.push('Bewusstlosigkeit') }
  if (einklemmung.value && leitsymptomeProblem.value) { checks.push('Einklemmung/Verschüttung') }

  if (geburt.value) { checks.push('Geburt') }
  if (arztSpecial.value) { checks.push('NA-Fertigkeiten') }
  if (verweigerung.value) { checks.push('Verweigerung') }

  return checks
})
const naInfoData = computed(() => {

  if (naChecks.value.length == 0) {
    return {
      title: 'Kein NA notwendig',
      subtitle: 'NA nur nach Ermessen des Sanitäters',
      color: ''
    }
  }
  else
  {
    return {
      title: 'NA notwendig',
      subtitle: 'wegen ' + naChecks.value.join(', '),
      color: '--ion-card-background:var(--ns-kof-burn-2nd);' }
  }

})

const naPositive = computed(() => naChecks.value.length>0)

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
