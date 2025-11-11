<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        <b>Strukturiertes</b> Vorgehen bei einer <b>instabilen Bradykardie</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg" @action="handleAction"></ns-flow>

  <ns-content-group title="Schrittmachertherapie">
    <ns-text-content>
      <p>
        <b><text-mono>1. </text-mono></b>Defi-Pads aufkleben <text-underline>(anterior-posterior)</text-underline>
      </p>
      <p>
        <b><text-mono>2. </text-mono></b>3/4-Pol EKG aufkleben
      </p>
      <p>
        <b><text-mono>3. </text-mono></b>Schrittmacher-Nodus aktivieren
      </p>
      <p>
        <b><text-mono>4. </text-mono></b>DEMAND-Modus einschalten
      </p>
      <p>
        <b><text-mono>5. </text-mono></b>Frequenz <text-underline>70/min</text-underline>, Intensität schnell steigern, bis 1:1-Ankopplung erreicht
      </p>
      <p>
        <b><text-mono>6. </text-mono></b>15mA Sicherheitsüberschuss einstellen
      </p>
      <hr>
      <p>
        Kontrolle der peripheren/zentralen Pulse.
      </p>
    </ns-text-content>
  </ns-content-group>

  <ns-flow-action ref="action_instabil">
    <h2>Instabilitätszeichen, z.B.:</h2>
    <p></p>
    <ul>
      <li>Thoraxschmerz</li>
      <li>Herzinsuffizienz</li>
      <li>Schock</li>
    </ul>
    <ul>
      <li>Bewusstseinsstörung</li>
      <li>Synkopen</li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_asystoliegefahr">
    <h2>Asystoliegefahr:</h2>
    <p></p>
    <ul>
      <li>Kürzliche Asystolie?</li>
      <li>AV-Block II° Typ 2</li>
      <li>AV-Block III°, breiter QRS</li>
      <li>Ventrikuläre Pausen &gt; 3s</li>
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

const action_instabil = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_asystoliegefahr = ref<InstanceType<typeof NsFlowAction> | null>(null)

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'instabil') {
    action_instabil.value?.presentPopover(payload)
  }
  else if (payload.key === 'asystoliegefahr') {
    action_asystoliegefahr.value?.presentPopover(payload)
  }
}

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
