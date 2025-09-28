<template>

  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Reanimation</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Ablauf">
      <ns-flow :flow="airwayFlow" />
    </ns-content-group>

  </div>
</template>

<script setup lang="ts">
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsList from '@/components/NsList.vue'
import NsListItem from '@/components/NsListItem.vue'
import NsFlow from '@/components/NsFlow.vue'
import type { NsFlowData } from '@/types/flow'

const airwayFlow: NsFlowData = {
  nodes: [
    { id: 'assessment', data: { label: 'Bewusstsein\nprüfen' } },
    { id: 'open-airway', data: { label: 'Atemweg\nfreimachen' } },
  ],
  edges: [
    { source: 'assessment', target: 'open-airway' },
    { source: 'open-airway', target: 'ventilate' },
  ],
}
</script>

<style lang="css" scoped>

</style>