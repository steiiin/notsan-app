<template>
  <ns-accordion-group>
    <ns-accordion title="Krampfanfall">

      <ns-content-group dense>

        <frag-midazolam-krampfanfall-buccal></frag-midazolam-krampfanfall-buccal>
        <frag-midazolam-krampfanfall-nasal></frag-midazolam-krampfanfall-nasal>
        <frag-midazolam-krampfanfall-iv></frag-midazolam-krampfanfall-iv>

      </ns-content-group>

    </ns-accordion>
  </ns-accordion-group>
</template>

<script setup lang="ts">

import NsAccordionGroup from '@/components/NsAccordionGroup.vue';
import NsAccordion from '@/components/NsAccordion.vue';
import NsContentGroup from '@/components/NsContentGroup.vue';

import FragMidazolamKrampfanfallBuccal from '../../medications/midazolam/FragMidazolamKrampfanfallBuccal.vue';
import FragMidazolamKrampfanfallNasal from '../../medications/midazolam/FragMidazolamKrampfanfallNasal.vue';
import FragMidazolamKrampfanfallIv from '../../medications/midazolam/FragMidazolamKrampfanfallIv.vue';

</script>

<style lang="css" scoped>

</style>
