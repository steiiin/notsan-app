<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        Transportentscheidung nach <b>DBRD</b> bei <b>bevorstehender Geburt</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group>
    <ns-button-score-list>

      <ns-button-score-group v-model="wehen2min" v-if="!geburt_1st || wehen2min" :option="{
        type: 'yes-no', label: 'Wehen < 2 Minuten?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="pressdrang" v-if="!geburt_1st || pressdrang" :option="{
        type: 'yes-no', label: 'Pressdrang/Presswehen?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="kindskopf" v-if="!geburt_1st || kindskopf" :option="{
        type: 'yes-no', label: 'Kindskopf bereits sichtbar?'}">
      </ns-button-score-group>
      <ns-button-score-group v-model="anusKlaffen" v-if="!geburt_1st || anusKlaffen" :option="{
        type: 'yes-no', label: 'Klaffender Anus?'}">
      </ns-button-score-group>

      <template v-if="geburt_1st">

        <hr v-if="!geburt_2nd">
        <ns-button-score-group v-model="plazentaPrae" v-if="!geburt_2nd || plazentaPrae" :option="{
          type: 'yes-no', label: 'Plazenta Praevia?'}">
        </ns-button-score-group>
        <ns-button-score-group v-model="lageSL" v-if="!geburt_2nd || lageSL" :option="{
          type: 'yes-no', label: 'Schädellage (SL)?'}">
        </ns-button-score-group>
        <ns-button-score-group v-model="lageBEL" v-if="!geburt_2nd || lageBEL" :option="{
          type: 'yes-no', label: 'Beckenendlage (BEL)?'}">
        </ns-button-score-group>
        <ns-button-score-group v-model="lageQL" v-if="!geburt_2nd || lageQL" :option="{
          type: 'yes-no', label: 'Querlage (QL)?'}">
        </ns-button-score-group>

      </template>

    </ns-button-score-list>
  </ns-content-group>
  <ns-content-group :style="transportInfoData.color">
    <div class="title">{{ transportInfoData.title }}</div>
    <div class="subtitle">{{ transportInfoData.subtitle }}</div>
  </ns-content-group>
  <ns-content-group v-if="!geburt_1st">
    <ns-text-content>
      <ul>
        <li><b>Mutterpass</b> einsehen &amp; mitnehmen</li>
        <li>Lagerung in Wunschposition</li>
        <li>Bei <i>Blasensprung</i> ausschließlich <b>liegend</b></li>
        <li>Lagerung in <i>Linksseitenlage</i> anstreben, wegen <br>CAVE: <b>Vena-Cava-Kompressionssyndrom</b></li>
      </ul>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group v-if="geburt_1st && !nichtMoeglich">
    <ns-text-content>
      <ul>
        <li><b>Mutterpass</b> einsehen &amp; mitnehmen</li>
        <li><b>pVK</b> anlegen</li>
      </ul>
      <hr>
      <ns-sideeffect link="saa:geburt">Geburt vor Ort</ns-sideeffect>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group v-if="geburt_1st && nichtMoeglich">
    <ns-text-content>
      <ul>
        <li><b>Mutterpass</b> mitnehmen</li>
        <li><b>pVK</b> anlegen</li>
        <li><b>NA-Nachforderung</b> <i>obligatorisch</i></li>
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
import NsSideeffect from '@/components/medications/NsSideeffect.vue'

const wehen2min = ref(false)
const pressdrang = ref(false)
const kindskopf = ref(false)
const anusKlaffen = ref(false)
const geburt_1st = computed(() => wehen2min.value || pressdrang.value || kindskopf.value || anusKlaffen.value)

const plazentaPrae = ref(false)
const lageSL = ref(false)
const lageBEL = ref(false)
const lageQL = ref(false)
const geburt_2nd = computed(() => plazentaPrae.value || lageSL.value || lageBEL.value || lageQL.value)
const nichtMoeglich = computed(() => plazentaPrae.value || lageBEL.value || lageQL.value)

const transportInfoData = computed(() => {

  if (geburt_1st.value)
  {
    if (nichtMoeglich.value)
    {
      return {
        title: 'Keine Entbindung möglich',
        subtitle: 'Sofortiger Notfalltransport in Kreißsaal',
        color: '--ion-card-background:var(--ns-kof-burn-3rd);'
      }
    }
    else
    {
      return {
        title: 'Entbindung vor Ort',
        subtitle: 'Kein Transport ',
        color: '--ion-card-background:var(--ns-kof-burn-2nd);'
      }
    }
  }
  return {
    title: 'Transport ins Krankenhaus',
    subtitle: 'Versorgung nach rettungsdienstl. Standard',
    color: '',
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
