<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        <b>Strukturiertes</b> Vorgehen bei einer unklaren <b>Atemnot</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg" @action="handleAction"></ns-flow>

  <ns-flow-action ref="action_respvers">
    <ul head br>
      <li>Atemfrequenz?<i>Bradypnoe oder Tachypnoe?</i></li>
      <li>Erhöhte Atemarbeit?<i>Einziehungen?</i></li>
      <li>Vermindertes Atemzugvolumen?<i>Flache Atmung? Auskultation Schwach?</i></li>
      <li>Zyanose/Blässe?<i>Trotz Sauerstoffgabe?</i></li>
      <li>Herzfrequenz?<i>Tachykardie?</i></li>
      <li>Bewusstsein?<i>Vigilanzminderung? Erschöpfung?</i></li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_branchbolus">
    <h2>Hinweise auf Atemwegsverlegung</h2>
    <ul>
      <li>Inspiratorischer Stridor</li>
      <li>Plötzlicher Beginn</li>
      <li>Husten/Würgen</li>
      <li>Gerade gegessen</li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_branchspannungspneu">
    <h2>Hinweise auf Spannungspneumothorax</h2>
    <ul>
      <li>Tachypnoe</li>
      <li>Thoraxschmerz</li>
      <li>Abgeschwächtes Atemgeräusch</li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_branchlae">
    <h2>Hinweise auf Lungenarterienembolie</h2>
    <ul>
      <li>Plötzlicher Beginn</li>
      <li>Auskultation unauffällig</li>
      <li>Thoraxschmerz, ggf. atemabhängig</li>
      <li>Bluthusten</li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_branchobstr">
    <h2>Hinweise auf Asthmaanfall</h2>
    <ul>
      <li>Plötzlicher Beginn</li>
      <li>Giemen/Brummen/Silent Lung</li>
      <li>kein Fieber</li>
    </ul>
    <hr>
    <h2>Hinweise auf COPD</h2>
    <ul>
      <li>Schleichender Beginn</li>
      <li>Giemen/Brummen/Silent Lung</li>
      <li>Evtl. Fieber</li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_branchoedem">
    <h2>Hinweise auf Lungenödem</h2>
    <ul>
      <li>Rasselgeräusche</li>
      <li>kein Fieber</li>
      <li>Evtl. periphere Ödeme</li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_branchpneumonie">
    <h2>Hinweise auf Pneumonie</h2>
    <ul>
      <li>Rasselgeräusche</li>
      <li>Fieber</li>
      <li>Schleichender Beginn</li>
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
const action_branchbolus = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_branchspannungspneu = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_branchlae = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_branchobstr = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_branchoedem = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_branchpneumonie = ref<InstanceType<typeof NsFlowAction> | null>(null)

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'respvers') {
    action_respvers.value?.presentPopover(payload)
  }
  else if (payload.key === 'branchbolus') {
    action_branchbolus.value?.presentPopover(payload)
  }
  else if (payload.key === 'branchspannungspneu') {
    action_branchspannungspneu.value?.presentPopover(payload)
  }
  else if (payload.key === 'branchlae') {
    action_branchlae.value?.presentPopover(payload)
  }
  else if (payload.key === 'branchobstr') {
    action_branchobstr.value?.presentPopover(payload)
  }
  else if (payload.key === 'branchoedem') {
    action_branchoedem.value?.presentPopover(payload)
  }
  else if (payload.key === 'branchpneumonie') {
    action_branchpneumonie.value?.presentPopover(payload)
  }
}

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
