<template>

  <ns-content-group>
    <ns-text-content>
      <p>
        Stufenweises Vorgehen bei starken <b>Schmerzzuständen</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowEdited" @action="handleAction"></ns-flow>

  <ns-flow-action ref="action_kolik">
    <h2>Vd. Gallenkolik, d.h.</h2>
    <ul>
      <li>Kolikartiger Schmerz</li>
      <li>Rechtsseitiger OB-Schmerz</li>
      <li>Ausstrahlung re. Schulter</li>
    </ul>
  </ns-flow-action>

  <ns-flow-action ref="noPPR">
    <h2>Kein peripheres Schmerzmittel</h2>
    <p>In den Einstellungen wurden alle peripher wirkenden Schmerzmittel ausgeblendet, z.B.:</p>
    <hr>
    <ul>
      <li>Paracetamol</li>
      <li>Ibuprofen</li>
      <li>Metamizol</li>
    </ul>
  </ns-flow-action>

</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import NsFlowAction from '@/components/library/NsFlowAction.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'

import flowSvg from './flow.svg?raw'
import { compile, computed, ref } from 'vue'
import { FlowActionPayload } from '@/types/flow'
import { useConfigStore } from '@/stores/config'

import { isAnyIvEnabled, isAnyIvEnabled as isIbuEnabled } from '@/views/content/medications/ibuprofen/Packages'
import { isAnyIvEnabled as isParacetamolEnabled } from '@/views/content/medications/paracetamol/Packages'
const isMetamizolEnabled = computed(() => useConfigStore()?.checkMedicationEnabled(MedId.Metamizol) ?? true)

import { MedicationSwitchOption, MedId } from '@/types/medication'
import { useMedicationSwitchOption } from '@/composables/useMedicationSwitchOption'
import router from '@/router'

const flowEdited = computed(() => flowSvg.replaceAll('#RPLC-Schmerz', 'SAA ' + switchOptionPPR.value.label))

function handleAction(payload: FlowActionPayload) {
  if (payload.key == 'switchPPR') {
    const target = switchOptionPPR.value.path
    if (target) { router.push(target) }
    else { noPPR.value?.presentPopover(payload) }
  }
  else if (payload.key === 'kolik') {
    action_kolik.value?.presentPopover(payload)
  }
}

const switchOptionPPR = computed(() => {
  if (isMetamizolEnabled.value) {
    return useMedicationSwitchOption(MedId.Metamizol) }
  if (isParacetamolEnabled.value) {
    return useMedicationSwitchOption(MedId.Paracetamol) }
  if (isIbuEnabled.value) {
    return useMedicationSwitchOption(MedId.Ibuprofen) }
  return { id: '', label: 'periph. Schmerzmittel', path: null }
})

const action_kolik = ref<InstanceType<typeof NsFlowAction> | null>(null)
const noPPR = ref<InstanceType<typeof NsFlowAction> | null>(null)

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-paddcomputed(() => {{ id: '' }})ing));  <-- move this elsewhere */
</style>
