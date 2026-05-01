<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        <b>Strukturiertes</b> Vorgehen bei <b>einer Geburt</b> außerhalb der Klinik.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg" @action="handleAction"></ns-flow>

  <ns-flow-action ref="action_erstbeurteilung">
    <h2>Vitales Kind</h2>
    <p><i>Achtung - </i>vital ist beim Neugeborenen wesentlich weiter gefasst. <br>
      Nicht vital wäre es hier:</p>
    <hr>
    <ul head br>
      <li>Muskeltonus<i>Schlaffer Körper?</i></li>
      <li>Schnappatmung</li>
      <li>Fehlende Atmung</li>
      <li>Bradykardie<i>&lt; 100 /min</i></li>
    </ul>
  </ns-flow-action>

  <ns-content-group title="Vitalwerte">
    <ns-text-content>
      <p>
        Die Überwachung sollte vorrangig durch EKG über die <b>Herzfrequenz</b> erfolgen.<br>
        <b>SpO<sub>2</sub></b> dauert, bis gute Werte erreicht werden.
      </p>
      <hr>
      <i>Akzeptable Werte (SpO<sub>2</sub>):</i>
      <ul head>
        <li><text-mono>&nbsp;2min</text-mono>: <i>60%</i></li>
        <li><text-mono>&nbsp;3min</text-mono>: <i>70%</i></li>
        <li><text-mono>&nbsp;4min</text-mono>: <i>80%</i></li>
        <li><text-mono>&nbsp;5min</text-mono>: <i>85%</i></li>
        <li><text-mono>10min</text-mono>: <i>90%</i></li>
      </ul>
    </ns-text-content>
  </ns-content-group>

</template>

<script setup lang="ts">

import NsFlow from '@/components/library/NsFlow.vue'
import NsFlowAction from '@/components/library/NsFlowAction.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import TextMono from '@/components/TextMono.vue'

import flowSvg from './flow.svg?raw'
import { FlowActionPayload } from '@/types/flow'
import { ref } from 'vue'

const action_erstbeurteilung = ref<InstanceType<typeof NsFlowAction> | null>(null)

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'erstbeurteilung') {
    action_erstbeurteilung.value?.presentPopover(payload)
  }
}

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
