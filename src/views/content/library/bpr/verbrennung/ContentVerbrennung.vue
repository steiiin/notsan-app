<template>

  <ns-content-group>
    <ns-text-content>
      <p>
        Stufenweises Vorgehen bei einer <b>Verbrennung</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg" ></ns-flow>

  <ns-content-group title="Gradeinteilung">
    <ns-table-content :def="{
      columns: [ 'Aussehen', 'Schmerzen', 'Merkmale' ],
      rows: new Map<string, Array<string>>(
        [
          [ 'Grad 1', [ 'Rötung, leichte Schwellung', 'Schmerzen', 'Oberflächlich, nur Epidermis betroffen' ]],
          [ 'Grad 2', [ 'Blasenbildung, Rot/Fleckig', 'Starke Schmerzen', 'Epidermis und Dermis betroffen' ]],
          [ 'Grad 3', [ 'Weiße, lederartig oder verkohlt', 'Keine Schmerzen', 'Gesamte Hautschicht betroffen' ]],
        ]
      )
      }">
    </ns-table-content>
  </ns-content-group>
  <ns-content-group title="Hinweis auf Inhalationstrauma">
    <ns-text-content>
      <ul>
        <li>Verbrennung im Gesicht</li>
        <li>Versengte Gesichts-/Nasenbehaarung</li>
        <li>Ruß im Gesicht oder im Sputum</li>
        <li>Atemwegsobstruktion (Stridor, Ödem)</li>
      </ul>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group title="Rechner">
    <ns-text-content>
      <p>
        Zum Schätzen der <b>KOF</b>:
      </p>
      <hr>
      <ns-sideeffect link="calc:kof">KOF-Einschätzung</ns-sideeffect>
    </ns-text-content>
  </ns-content-group>
</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import NsTableContent from '@/components/NsTableContent.vue'
import NsSideeffect from '@/components/medications/NsSideeffect.vue'

import flowSvg from './flow.svg?raw'

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-paddcomputed(() => {{ id: '' }})ing));  <-- move this elsewhere */
</style>
