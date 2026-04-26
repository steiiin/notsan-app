<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        Stufenweises Vorgehen bei <b>Anaphylaxie</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg" @action="handleAction"></ns-flow>

  <ns-flow-action ref="action_basic">
    <h2>Allergische Reaktion (I)</h2>
    <p>Leichte Auswirkungen.</p>
    <hr>
    <ul>
      <li>Hautreaktionen <i>(z.B. Juckreiz, Quaddeln, Rötung)</i></li>
      <li>Abdominelle Beschwerden <i>(z.B. Schmerzen, Übelkeit)</i></li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_severe">
    <h2>Anaphylaxie (II+III)</h2>
    <p>Zusätzlich zur Hautreaktion treten ABCD-Probleme auf.</p>
    <hr>
    <ul>
      <li><b>A</b> <i>(z.B. Schwellung, Heiserkeit, Stridor)</i></li>
      <li><b>B</b> <i>(z.B. Tachypnoe, Obstruktion, Zyanose)</i></li>
      <li><b>C</b> <i>(z.B. Kaltschweißigkeit, Schockig)</i></li>
      <li><b>D</b> <i>(z.B. Verwirrung, Unruhe, Eintrübung)</i></li>
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

const action_basic = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_severe = ref<InstanceType<typeof NsFlowAction> | null>(null)

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'basic') {
    action_basic.value?.presentPopover(payload)
  }
  else if (payload.key === 'severe') {
    action_severe.value?.presentPopover(payload)
  }
}

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
