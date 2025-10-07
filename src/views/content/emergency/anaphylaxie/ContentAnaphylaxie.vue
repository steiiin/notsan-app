<template>
  <ns-accordion-group>
    <ns-accordion title="Anaphylaxie">

      <ns-content-group dense>
        <frag-epinephrine-anaphylaxie></frag-epinephrine-anaphylaxie>
        <ns-dosage-usage type="iv" dense>

          <frag-dimetinden-anaphylaxie></frag-dimetinden-anaphylaxie>
          <frag-prednisolon-anaphylaxie-iv></frag-prednisolon-anaphylaxie-iv>

        </ns-dosage-usage>
        <frag-prednisolon-anaphylaxie-supp></frag-prednisolon-anaphylaxie-supp>
      </ns-content-group>

    </ns-accordion>
  </ns-accordion-group>
</template>

<script setup lang="ts">

import NsAccordionGroup from '@/components/NsAccordionGroup.vue';
import NsAccordion from '@/components/NsAccordion.vue';
import NsContentGroup from '@/components/NsContentGroup.vue';
import NsDosageUsage from '@/components/medications/NsDosageUsage.vue';

import FragEpinephrineAnaphylaxie from '../../medications/epinephrin/FragEpinephrineAnaphylaxie.vue';
import FragDimetindenAnaphylaxie from '../../medications/dimetinden/FragDimetindenAnaphylaxie.vue';
import FragPrednisolonAnaphylaxieSupp from '../../medications/prednisolon/FragPrednisolonAnaphylaxieSupp.vue';
import FragPrednisolonAnaphylaxieIv from '../../medications/prednisolon/FragPrednisolonAnaphylaxieIv.vue';

</script>

<style lang="css" scoped>

</style>
