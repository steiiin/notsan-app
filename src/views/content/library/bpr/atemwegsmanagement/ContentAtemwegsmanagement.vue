<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        Stufenweises Vorgehen zur <b>Sicherung</b> und Aufrechterhaltung der Atemwege.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg" @action="handleAction"></ns-flow>
  <ns-content-group title="PTO">
    <ns-text-content>
      <h2>Rettungsversuch!</h2>
      <p>
        <text-underline>Ultima Ration</text-underline> bei einer <b>Cannot-Ventilate-Cannot-Intubate</b>-Situation
      </p>
      <hr>
      <h2>Material</h2>
      <ul>
        <li>Größte <text-underline>Venenverweilkanüle</text-underline></li>
        <li><text-underline>2ml</text-underline>-Spritze</li>
        <li>Absaug-Fingertip</li>
        <li><text-underline>5ml</text-underline>-Spritze</li>
        <li>NaCl</li>
      </ul>
      <hr>
      <h2>Durchführung</h2>
      <p>
        Desinfizieren.
      </p>
      <p>
        Den Kolben der <b>2ml</b>-Spritze entfernen, <br>
        Fingertip aufstecken und mit Sauerstoffleitung verbinden.
      </p>
      <p>
        <b>5ml</b>-Spritze mit <b>NaCl</b> aufziehen.<br>
        Auf den <b>Verweilkatheter</b> diese Spritze aufstecken.
      </p>
      <img :src="lig_conicum"></img>
      <p>
        Durch das <b>Ligamentum conicum</b> hindurch die Trachea punktieren.<br>
        Verweilkatheter unter Entfernung des Stahlmadrin vorschieben.
      </p>
      <p>
        Die <b>2ml</b>-Spritze konnektieren.
        Sauerstoff-Flow auf mindestens <b>8l/min</b> stellen.
      </p>
      <p>
        Durch rhythmischen Verschließen des Fingertips wird eine <b>Oxygenierung</b> ermöglicht.
      </p>
    </ns-text-content>
  </ns-content-group>

  <ns-flow-action ref="action_sga">
    <h2>Supraglottische Atemwegshilfe</h2>
    <p>Instrumente zur Atemwegssicherung, mit Ventilationsöffnung <i>oberhalb</i> der Glottis.</p>
    <hr>
    <ul>
      <li>Larynxtubus <i>(z.B. LTS-D<sup>®</sup>)</i></li>
      <li>Larynxmaske <i>(z.B. LMA, i-gel<sup>®</sup>)</i></li>
    </ul>
  </ns-flow-action>

</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import NsFlowAction from '@/components/library/NsFlowAction.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import TextUnderline from '@/components/TextUnderline.vue'

import lig_conicum from '@/data/assets/lig-conicum.png'
import flowSvg from './flow.svg?raw'
import { ref } from 'vue'
import { FlowActionPayload } from '@/types/flow'

const action_sga = ref<InstanceType<typeof NsFlowAction> | null>(null)

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'sga') {
    action_sga.value?.presentPopover(payload)
  }
}

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
