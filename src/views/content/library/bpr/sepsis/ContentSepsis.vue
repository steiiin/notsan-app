<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        <b>Strukturiertes</b> Vorgehen bei einer <b>Sepsis</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg" @action="handleAction"></ns-flow>

  <ns-flow-action ref="action_verdacht">
    <h2>Infektzeichen, z.B.:</h2>
    <p></p>
    <ul>
      <li>Fieber (nicht zwingend)</li>
      <li>Husten, Auswurf</li>
      <li>Grippale Symptome</li>
      <li>Hauterscheinungen (Erysipel, Wunden)</li>
      <li>Gastro-Beschwerden</li>
      <li>Uro-Beschwerden</li>
      <li>Immunsuppression</li>
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

const action_verdacht = ref<InstanceType<typeof NsFlowAction> | null>(null)

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'verdacht') {
    action_verdacht.value?.presentPopover(payload)
  }
}

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
