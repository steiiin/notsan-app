<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        <b>Strukturiertes</b> Vorgehen bei Verdacht <b>Pseudokrupp</b> bei Kindern.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg"></ns-flow>
  <ns-content-group title="Differentialdiagnosen">

    <ns-table-content :def="{
      columns: [ 'Pseudokrupp', 'Epiglottitis', 'Tracheitis', 'Asthma/Allergie' ],
      rows: new Map<string, Array<string>>(
        [
          [ 'AZ', [ 'Gut', 'Schwerkrank', 'Reduziert', 'variabel' ]],
          [ 'Fieber', [ 'Subfebril', 'Hoch', '', 'Nein' ]],
          [ 'Husten', [ 'Bellend/heiser', 'Nein/Schmerzhaft', 'Produktiv', 'Nein' ]],
          [ 'Sprache', [ 'Heiser', 'Kloßig/Keine', 'normal', '' ]],
          [ 'Alter', [ '1-3J', 'Alle', '', '' ]]
        ]
      )
      }">
    </ns-table-content>

  </ns-content-group>
  <ns-content-group>
    <ns-text-content>
      <p>
        Bei allen Differentialdiagnosen ist der selbe Algorithmus anwendbar.
      </p>
      <hr>
      <p>
        Aber: bei <b>Epiglottitis</b> besteht Lebensgefahr! <br>
        Keine weitere Manipulation/Inspektion im Rachen, um Schwellungszunahme zu vermeiden.
      </p>
    </ns-text-content>
  </ns-content-group>

</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import NsTableContent from '@/components/NsTableContent.vue'

import flowSvg from './flow.svg?raw'

</script>

<style scoped>
</style>
