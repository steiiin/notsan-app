<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        <b>Strukturiertes</b> Vorgehen bei einem <b>Krampfanfall</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowEdited" @action="handleAction"></ns-flow>

</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import NsFlowAction from '@/components/library/NsFlowAction.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsSideeffect from '@/components/medications/NsSideeffect.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import TextMono from '@/components/TextMono.vue'
import TextUnderline from '@/components/TextUnderline.vue'

import flowSvg from './flow.svg?raw'
import { FlowActionPayload } from '@/types/flow'
import { computed, ref } from 'vue'
import { useConfigStore } from '@/stores/config'
import { MedId } from '@/types/medication'

const action_instabil = ref<InstanceType<typeof NsFlowAction> | null>(null)

import { isAnySuppEnabled as isIbuSuppEnabled } from '../../../medications/ibuprofen/Packages';
const isDiazepamEnabled = computed(() => false) /* TODO: Diazepam, wenn hinzugefügt */

function handleAction(payload: FlowActionPayload) {
  if (payload.key === 'instabil') {
    action_instabil.value?.presentPopover(payload)
  }
}

const flowEdited = computed<string>(() => {

  const parser = new DOMParser()
  const document = parser.parseFromString(flowSvg, 'image/svg+xml')

  const parserError = document.querySelector('parsererror')
  if (parserError) {
    console.error('SVG konnte nicht geparst werden:', parserError.textContent)
    return flowSvg }

  document.querySelectorAll('a').forEach((element) => {
    const href =
      element.getAttribute('href')
      ?? element.getAttribute('xlink:href')
      ?? element.getAttributeNS(
        'http://www.w3.org/1999/xlink',
        'href',
      )
    if (href?.endsWith('med:diazepam') && !isDiazepamEnabled.value) { element.remove() }
    if (href?.endsWith('med:ibuprofen') && !isIbuSuppEnabled.value) { element.remove() }
  })

  return new XMLSerializer().serializeToString(document.documentElement)

})

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
