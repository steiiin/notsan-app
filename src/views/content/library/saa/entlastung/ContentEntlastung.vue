<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        Zur Entlastung beim <text-underline>Spannungspneumothorax</text-underline> bei zunehmender hämdynamischer und respiratorischer Instabilität.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow @action="handleAction" :svg="flowSvg"></ns-flow>
  <ns-content-group title="Grundlagen">
    <ns-text-content>
      <p>
        Eine Entlastungspunktion ist nur eine <b>Notfallmaßnahme</b> zur Überbrückung bis zur Thoraxdrainage.
      </p>
      <p>
        Wechsel des <text-underline>Punktionsortes</text-underline> bei ausbleibendem Erfolg.
      </p>
      <hr>
      <p>
        Immer <b>oberhalb</b> der Rippe punktieren, um Gefäß- und Nervenverletzungen zu vermeiden.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group title="Durchführung">
    <ns-text-content>
      <p>
        <b><text-mono>1. </text-mono></b>20ml-Spritze <text-underline>zur Hälfte</text-underline> mit  NaCl aufziehen
      </p>
      <p>
        <b><text-mono>2. </text-mono></b>Spritze auf die Punktionskanüle aufstecken
      </p>
      <p>
        <b><text-mono>3. </text-mono></b>Punktionsort lokalisieren &amp; desinfizieren
      </p>
      <p>
        <b><text-mono>4. </text-mono></b>Punktion am <text-underline>Oberrand der Rippe</text-underline>, senkrecht zur Thoraxwand
      </p>
      <p>
        <b><text-mono>5. </text-mono></b>bei Aspiration von Luft Stahlmandrin entfernen&nbsp;/&nbsp;Kanüle <i>gleichzeitig</i> vorschieben
      </p>
      <p>
        <b><text-mono>6. </text-mono></b>Fixierung mit Pflasterrolle als Knickschutz <i>(Monaldi)</i>
      </p>
    </ns-text-content>
  </ns-content-group>

  <ns-content-group title="Bühlau">
    <ns-text-content>
      <p>
        <b>4.</b>-<b>5. ICR</b> vordere bis mittlere Axillarlinie.
      </p>
      <p>
        <text-underline>Triangle of Safety</text-underline> beachten:
      </p>
      <ns-svg :svg="ort_triangle"></ns-svg>
    </ns-text-content>
  </ns-content-group>

  <ns-content-group title="Monaldi">
    <ns-text-content>
      <p>
        <b>2.</b>-<b>3. ICR</b> Medioklavikularlinie.
      </p>
      <p>
        Gemäß <text-underline>ATLS-Empfehlungen</text-underline> <b>nicht mehr empfohlen</b>.
      </p>
    </ns-text-content>
  </ns-content-group>

  <ns-flow-action ref="action_bproblem">
    <h2>Spezifische B-Symptome</h2>
    <ul>
      <li>Akute Dyspnoe / Tachypnoe</li>
      <li>Abgeschwächtes Atemgeräusch</li>
      <li>Thoraxschmerz</li>
      <li>Schnelle Verschlechterung</li>
      <li><i>Evtl. Hautemphysem</i></li>
    </ul>
  </ns-flow-action>

  <ns-flow-action ref="action_cproblem">
    <h2>Spezifische C-Symptome</h2>
    <ul>
      <li>Tachykardie</li>
      <li>Hypotonie / Schock</li>
      <li>Schnelle Verschlechterung</li>
      <li><i>Evtl. Halsvenenstauung</i></li>
    </ul>
  </ns-flow-action>

</template>

<script setup lang="ts">
import NsSvg from '@/components/NsSvg.vue'
import NsFlow from '@/components/library/NsFlow.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import TextUnderline from '@/components/TextUnderline.vue'
import TextMono from '@/components/TextMono.vue'
import NsFlowAction from '@/components/library/NsFlowAction.vue'

import flowSvg from './flow.svg?raw'
import ort_triangle from './ort-triangle.svg?raw'

import { ref } from 'vue'
import { FlowActionPayload } from '@/types/flow'

const action_bproblem = ref<InstanceType<typeof NsFlowAction> | null>(null);
const action_cproblem = ref<InstanceType<typeof NsFlowAction> | null>(null);

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'bprobleme') {
    action_bproblem.value?.presentPopover(payload)
  }
  else if (payload.key === 'cprobleme') {
    action_cproblem.value?.presentPopover(payload)
  }
}

</script>
<style scoped>

</style>
