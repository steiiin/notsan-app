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
    { id: 'start', type: 'start-end', label: 'Startpunkt' },
    { id: 'assessment', type: 'process', data: { label: 'Bewusstsein\nprüfen' } },
    {
      id: 'decision',
      type: 'decision',
      data: { label: 'Atmung\nvorhanden?', quicktip: '10 Sekunden prüfen' },
    },
    { id: 'open-airway', type: 'task', data: { label: 'Atemweg\nfreimachen' } },
    { id: 'monitor', type: 'process', data: { label: 'Vitalparameter\nüberwachen' } },
    {
      id: 'library-link',
      type: 'link',
      data: { label: 'Weitere Infos zur Beatmung', path: '/tabs/lib' },
    },
    { id: 'end', type: 'start-end', data: { label: 'Behandlung\nabschließen' } },
  ],
  edges: [
    { source: 'start', target: 'assessment' },
    { source: 'assessment', target: 'decision' },
    { source: 'decision', target: 'open-airway' },
    { source: 'open-airway', target: 'monitor' },
    { source: 'monitor', target: 'library-link' },
    { source: 'library-link', target: 'end' },
  ],
}
</script>

<style lang="css" scoped>

</style>