<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        Stufenweises Vorgehen zur <b>Akutem Koronarsyndrom</b>.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-flow :svg="flowSvg"></ns-flow>
</template>

<script setup lang="ts">
import NsFlow from '@/components/library/NsFlow.vue'
import NsFlowAction from '@/components/library/NsFlowAction.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'

import flowSvg from './flow.svg?raw'
import { ref } from 'vue'
import { FlowActionPayload } from '@/types/flow'

</script>

<style scoped>

  /* padding: calc(0.5 * var(--ns-card-padding));  <-- move this elsewhere */
</style>
