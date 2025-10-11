<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        <b>Strukturiertes</b> Vorgehen bei einem potentiell <b>kritischen Kind</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg" @action="handleAction"></ns-flow>
  <ns-content-group title="Kinderalgorithmen">
    <ns-text-content>
      <p>
        Fortfahren mit <b>(Kinder-)Algorithmen</b>:
      </p>
      <hr>
      <ns-sideeffect link="bpr:dyspnoekind">Dyspnoe (Kind)</ns-sideeffect>
    </ns-text-content>
  </ns-content-group>

  <ns-flow-action ref="action_atemwege">
    <h2>Freimachen/Sichern der Atemwege</h2>
    <p>Überprüfe und sichere die Atemwege altersgerecht. Beachte dabei die Besonderheiten bei Kindern:</p>
    <hr>
    <ul>
      <li>Kopf in <b>Neutralstellung</b> bringen (nicht überstrecken!)</li>
      <li>Fremdkörper vorsichtig entfernen, <b>wenn sichtbar</b></li>
      <li>Bei Bewusstlosigkeit: <b>Esmarchmanöver</b> (Kopf überstrecken und Kinn anheben)</li>
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

const action_atemwege = ref<InstanceType<typeof NsFlowAction> | null>(null)

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'atemwege') {
    action_atemwege.value?.presentPopover(payload)
  }
}

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
