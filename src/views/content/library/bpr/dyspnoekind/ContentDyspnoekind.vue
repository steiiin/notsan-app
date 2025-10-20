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
  <ns-flow-action ref="action_branchasthma">
    <h2>Hinweise auf Asthmaanfall</h2>
    <ul>
      <li>Einziehungen</li>
      <li>Einsatz Atemhilfsmuskulatur</li>
      <li>Exspiratorisches Giemen</li>
      <li>Evtl. Silent Chest</li>
      <li>Evtl. bek. Asthma bronchiale</li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_branchpseudokrupp">
    <h2>Hinweise auf Pseudokrupp</h2>
    <ul>
      <li>Alter meist bis 3 Jahre</li>
      <li>AZ nicht kritisch krank</li>
      <li>Plötzlicher Beginn</li>
      <li>Bellender, heiserer Husten</li>
      <li>Temp. subfebril (37,5-37,9°C)</li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_branchbolus">
    <h2>Hinweise auf Atemwegsverlegung</h2>
    <ul>
      <li>Inspiratorischer Stridor</li>
      <li>Plötzlicher Beginn</li>
      <li>Husten/Würgen</li>
      <li>Gerade gegessen</li>
      <li>Gerade gespielt</li>
    </ul>
  </ns-flow-action>

</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import NsFlowAction from '@/components/library/NsFlowAction.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'

import flowSvg from './flow.svg?raw'
import { FlowActionPayload } from '@/types/flow'
import { ref } from 'vue'

const action_respvers = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_branchasthma = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_branchpseudokrupp = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_branchbolus = ref<InstanceType<typeof NsFlowAction> | null>(null)

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'respvers') {
    action_respvers.value?.presentPopover(payload)
  }
  else if (payload.key === 'branchasthma') {
    action_branchasthma.value?.presentPopover(payload)
  }
  else if (payload.key === 'branchpseudokrupp') {
    action_branchpseudokrupp.value?.presentPopover(payload)
  }
  else if (payload.key === 'branchbolus') {
    action_branchbolus.value?.presentPopover(payload)
  }
}

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
