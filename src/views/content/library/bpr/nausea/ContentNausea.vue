<template>

  <ns-content-group>
    <ns-text-content>
      <p>
        Stufenweises Vorgehen für massive <b>Übelkeit/Erbrechen</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg" @action="handleAction"></ns-flow>
  <ns-content-group title="Aromatherapie">
  <ns-text-content>
    <p>
      Die Inhalation von <i>Isopropanol-Dämpfen</i> bewirkt eine <i>olfaktorische Stimulation</i> und unterdrückt dadurch <b>Übelkeit</b> im Brechzentrum.
    </p>
    <hr>
    <h2>Durchführung</h2>
    <p>
      <i>Tupfer</i> mit alkoholischen <b>Desinfektionsmittel</b> tränken.
    </p>
    <p>
      Dem Patienten in kurzem Abstand vor die Nase halten &amp; <b>Dämpfe einatmen</b> lassen.
    </p>
  </ns-text-content>
</ns-content-group>

  <ns-flow-action ref="action_relevant">
    <h2>Relevante Übelkeit, d.h.</h2>
    <ul>
      <li>Anhaltendes Erbrechen</li>
      <li>Medikamenten/Chemo-induziert</li>
      <li>Aspirationsgefahr</li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_situativanw">
    <h2>Schlecht anwendbar, z.B.:</h2>
    <ul>
      <li>Polytrauma/Zeitdruck</li>
      <li>Bewusstloser Patient</li>
      <li>Nicht Kooperativ</li>
    </ul>
  </ns-flow-action>

</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import NsFlowAction from '@/components/library/NsFlowAction.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'

import flowSvg from './flow.svg?raw'
import { ref } from 'vue'
import { FlowActionPayload } from '@/types/flow'

const action_relevant = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_situativanw = ref<InstanceType<typeof NsFlowAction> | null>(null)

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'relevant') {
    action_relevant.value?.presentPopover(payload)
  }
  else if (payload.key === 'situativanw') {
    action_situativanw.value?.presentPopover(payload)
  }
}
</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
