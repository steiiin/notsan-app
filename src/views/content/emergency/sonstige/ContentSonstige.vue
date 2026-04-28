<template>
  <ns-accordion title="Sonstige" value="sonstige">

    <ns-content-group title="Hypoglykämie" dense>
      <frag-glucose-hypoglyk-iv></frag-glucose-hypoglyk-iv>
    </ns-content-group>

    <ns-content-group title="Sepsis" dense id="sepsis">
      <frag-vel-sepsis></frag-vel-sepsis>
    </ns-content-group>

  </ns-accordion>
</template>

<script setup lang="ts">

import NsAccordion from '@/components/NsAccordion.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'

import FragGlucoseHypoglykIv from '../../medications/glucose/FragGlucoseHypoglykIv.vue'
import FragVelSepsis from '../../medications/vel/FragVelSepsis.vue'

</script>

<style lang="css" scoped>

</style>
