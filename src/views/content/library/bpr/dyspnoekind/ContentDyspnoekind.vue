<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        <b>Strukturiertes</b> Vorgehen bei einer unklaren <b>Atemnot</b> bei Kindern.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg" @action="handleAction"></ns-flow>

  <ns-flow-action ref="action_respvers">
    <h2>Respiratorische Versagen</h2>
    <p>Kritische Störungen bei Kindern beginnen häufig mit einem A/B-Problem:</p>
    <hr>
    <ul head br>
      <li>Atemfrequenz?<i>Bradypnoe oder Tachypnoe?</i></li>
      <li>Erhöhte Atemarbeit?<i>Einziehungen? Kopfnicken?</i></li>
      <li>Vermindertes Atemzugvolumen?<i>Flache Atmung? Auskultation Schwach?</i></li>
      <li>Zyanose/Blässe?<i>Trotz Sauerstoffgabe?</i></li>
      <li>Herzfrequenz?<i>Tachykardie?</i></li>
      <li>Bewusstsein?<i>Vigilanzminderung? Erschöpfung?</i></li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_maskoptim">
    <h2>Maskenbeatmung optimieren</h2>
    <ul>
      <li>Optimierung des Maskensitzes</li>
      <li>Guedel/Wendl einsetzen</li>
      <li>Doppel-C-Griff</li>
    </ul>
  </ns-flow-action>
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
import NsSideeffect from '@/components/medications/NsSideeffect.vue'
import NsTextContent from '@/components/NsTextContent.vue'

import flowSvg from './flow.svg?raw'
import { FlowActionPayload } from '@/types/flow'
import { ref } from 'vue'

const action_respvers = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_maskoptim = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_sga = ref<InstanceType<typeof NsFlowAction> | null>(null)

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'respvers') {
    action_respvers.value?.presentPopover(payload)
  }
  else if (payload.key === 'maskoptim') {
    action_maskoptim.value?.presentPopover(payload)
  }
  else if (payload.key === 'sga') {
    action_sga.value?.presentPopover(payload)
  }
}

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
