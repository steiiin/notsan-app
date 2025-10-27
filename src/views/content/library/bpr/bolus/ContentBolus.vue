<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        <b>Strukturiertes</b> Vorgehen bei einer <b>Atemwegsverlegung</b> durch einen Fremdkörper.
      </p>
    </ns-text-content>
  </ns-content-group>

  <ns-content-multi-container>
    <ns-content-group>
      <ns-text-content>
        <p>
          <text-colored green>Hinweise auf <b>leichtgradige</b> Verlegung:</text-colored>
        </p>
        <ul>
          <li>Verbale Antwort oder Schreien</li>
          <li>Lautes Husten</li>
          <li>Einatmung vor Husten möglich</li>
        </ul>
      </ns-text-content>
    </ns-content-group>
    <ns-content-group>
      <ns-text-content>
        <p>
          <text-colored red>Hinweise auf <b>schwere</b> Verlegung:</text-colored>
        </p>
        <ul>
          <li>Schwere Dyspnoe</li>
          <li>Inspiratorischer Stridor</li>
          <li>Inverse Atmung</li>
          <li>Antworten unmöglich</li>
        </ul>
      </ns-text-content>
    </ns-content-group>
  </ns-content-multi-container>

  <ns-flow :svg="flowSvg"></ns-flow>

  <ns-content-group title="Rückenschläge">
    <ns-text-content>
      <ul>
        <li>Beuge den Pat. nach vorn über</li>
        <li>Lege die flache Hand zwischen die Schulterblätter</li>
        <li>Schlage 5x kräftig, aber kontrolliert</li>
      </ul>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group title="Heimlich-Manöver">
    <ns-text-content>
      <ul>
        <li>Stelle dich hinter den Patienten</li>
        <li>Balle die Faust und lege diese zwischen Nabel und Brustkorb</li>
        <li>Fasse die Faust mit der anderen Hand und ziehe ruckartig nach innen und oben</li>
      </ul>
      <div gallery>
        <img :src="heimlich_st1"></img>
        <img :src="heimlich_st2"></img>
        <img :src="heimlich_st3"></img>
        <img :src="heimlich_st4"></img>
      </div>
    </ns-text-content>
  </ns-content-group>

</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsContentMultiContainer from '@/components/NsContentMultiContainer.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import TextColored from '@/components/TextColored.vue'

import flowSvg from './flow.svg?raw'

import heimlich_st1 from './heimlich-st1.svg'
import heimlich_st2 from './heimlich-st2.svg'
import heimlich_st3 from './heimlich-st3.svg'
import heimlich_st4 from './heimlich-st4.svg'

</script>

<style scoped>
  div[gallery] {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  div[gallery] img {
    max-width: calc(50% - 2px);
  }
  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
