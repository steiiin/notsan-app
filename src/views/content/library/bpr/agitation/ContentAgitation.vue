<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        <b>Strukturiertes</b> Vorgehen bei einem <b>starken Erregungszustand</b>.
      </p>
      <ul>
        <li>Psychischer Ausnahmezustand</li>
        <li>Aggressivität</li>
        <li>Hyperventilation</li>
        <li>Agitiertheit</li>
      </ul>
    </ns-text-content>
  </ns-content-group>

  <ns-flow :svg="flowEdited"></ns-flow>

  <ns-content-group title="SAA Sedativa">
    <ns-sideeffect v-if="isMidazolamEnabled" link="med:midazolam">Midazolam</ns-sideeffect>
  </ns-content-group>

</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'

import flowSvg from './flow.svg?raw'
import { computed } from 'vue'

import { useConfigStore } from '@/stores/config'
import { MedId } from '@/types/medication'
import { useMedicationSwitchOption } from '@/composables/useMedicationSwitchOption'
import NsSideeffect from '@/components/medications/NsSideeffect.vue'

const configStore = useConfigStore()
const isMidazolamEnabled = computed(() => configStore?.checkMedicationEnabled(MedId.Midazolam) ?? true)
// Tavor
// Diazepam

const flowEdited = computed(() => {
  const sedativa: Array<string> = []
  if (isMidazolamEnabled.value) { sedativa.push(useMedicationSwitchOption(MedId.Midazolam).label) }
  // Tavor
  // Diazepam

  return flowSvg
    .replaceAll('#RPLC-Unvtrgl', sedativa.join('/'))
})


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
