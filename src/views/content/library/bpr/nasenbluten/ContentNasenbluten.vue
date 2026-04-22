<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        Stufenweises Vorgehen bei unstillbarem <b>Nasenbluten</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg" @action="handleAction"></ns-flow>
  <ns-content-group title="Nasentamponade (Blasenkatheter)">
    <ns-text-content>
      <p>
        Wenn keine kommerzielle Nasentamponade verfügbar ist, kann auch ein Blasenkatheter eingebracht werden, <text-underline>Blockung im Rachen</text-underline> und Zurückziehen.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group title="Nasentamponade (TXA+Adrenalin)">
    <ns-text-content>
      <h2>Mullkompresse</h2>
      <p>
        Alternativ Mullkompresse &quot;aufdröseln&quot;, mit <text-underline>Tranexamsäure</text-underline> und <text-underline>Adrenalin</text-underline> benetzen.<br>
        Tamponade dann in die Nase einbringen.
      </p>
      <h2>Dosierung</h2>
      <div>
        <ns-dosage mono :dosage="{
          target: 'Tranexamsäure',  dose: '500mg', color: 'blue' }">
        </ns-dosage>
        <ns-dosage mono :dosage="{
          target: 'Adrenalin',  dose: '  2mg', color: 'red' }">
        </ns-dosage>
      </div>
    </ns-text-content>
  </ns-content-group>

  <ns-flow-action ref="action_basic">
    <h2>Basismaßnahmen</h2>
    <ul>
      <li>Kopf vornüber</li>
      <li>Nasenflügel komprimieren</li>
      <li>Nacken kühlen</li>
      <li>Blut ausspucken</li>
      <li>ggf. Tranexamsäure per MAD</li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_extend">
    <h2>Erweiterte Maßnahmen</h2>
    <ul>
      <li>Absaugen</li>
      <li>Nasentamponade</li>
      <li>Atemwegssicherung</li>
    </ul>
  </ns-flow-action>
  <ns-flow-action ref="action_qLebensbedrohlich">
    <h2>Massives Nasenbluten</h2>
    <ul>
      <li>Anhaltende Blutung aus beiden Nasenlöchern</li>
      <li>Aspiration/-gefahr</li>
      <li>Hämorrhagischer Schock</li>
    </ul>
  </ns-flow-action>

</template>

<script setup lang="ts">

import NsFlow from '@/components/library/NsFlow.vue'
import NsFlowAction from '@/components/library/NsFlowAction.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import TextUnderline from '@/components/TextUnderline.vue'
import NsDosage from '@/components/medications/NsDosage.vue'

import flowSvg from './flow.svg?raw'

import { ref } from 'vue'
import { FlowActionPayload } from '@/types/flow'

const action_basic = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_extend = ref<InstanceType<typeof NsFlowAction> | null>(null)
const action_qLebensbedrohlich = ref<InstanceType<typeof NsFlowAction> | null>(null)

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'basic') {
    action_basic.value?.presentPopover(payload)
  }
  else if (payload.key === 'extend') {
    action_extend.value?.presentPopover(payload)
  }
  else if (payload.key === 'qLebensbedrohlich') {
    action_qLebensbedrohlich.value?.presentPopover(payload)
  }
}

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
