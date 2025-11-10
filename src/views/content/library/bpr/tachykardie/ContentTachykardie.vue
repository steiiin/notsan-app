<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        <b>Strukturiertes</b> Vorgehen bei einer <b>instabilen Tachykardie</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg" @action="handleAction"></ns-flow>

  <ns-content-group title="Kardioversion">
    <ns-text-content>
      <p>
        <b><text-mono>1. </text-mono></b>Defi-Pads aufkleben <text-underline>(Sternum/Apex)</text-underline>
      </p>
      <p>
        <b><text-mono>2. </text-mono></b>Reanimationsbereitschaft herstellen
      </p>
      <p>
        <b><text-mono>3. </text-mono></b>Defibrillationsmodus wählen
      </p>
      <p>
        <b><text-mono>4. </text-mono></b>Synchronisation einschalten!
      </p>
      <p>
        <b><text-mono>5. </text-mono></b>Energie wählen <text-underline>(120J)</text-underline>
      </p>
      <p>
        <b><text-mono>6. </text-mono></b>3x Schock <i>(oder bis Konversion eingetreten)</i>
      </p>
      <hr>
      <p>
        Wenn 3. Versuch erfolglos:
      </p>
      <ns-sideeffect link="med:amiodaron">Amiodaron</ns-sideeffect>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group title="Valsalva-Manöver">
    <ns-text-content>
      <p>
        <b><text-mono>1. </text-mono></b>20ml-Spritze dem Patienten geben
      </p>
      <p>
        <b><text-mono>2. </text-mono></b>Aufforderung den Kolben herauszupusten (ca. 15 Sekunden lang)
      </p>
      <p>
        <b><text-mono>3. </text-mono></b>Anschließend sofortige Umlagerung: Oberkörper liegend, Beine für ca. 15 Sekunden hochhalten
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

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'instabil') {
    action_instabil.value?.presentPopover(payload)
  }
}

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
