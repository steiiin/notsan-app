<template>
  <ns-accordion-group>
    <ns-accordion title="Anaphylaxie">

      <ns-content-group dense>
        <frag-epinephrine-anaphylaxie :patient="patient"></frag-epinephrine-anaphylaxie>
        <ns-dosage-usage type="iv" dense>

          <frag-dimetinden-anaphylaxie :patient="patient"></frag-dimetinden-anaphylaxie>
          <frag-prednisolon-anaphylaxie-iv :patient="patient"></frag-prednisolon-anaphylaxie-iv>

        </ns-dosage-usage>
        <frag-prednisolon-anaphylaxie-supp :patient="patient"></frag-prednisolon-anaphylaxie-supp>
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

import { Patient } from '@/types/emergency';

const props = defineProps<{
  patient: Patient
}>()

</script>

<style lang="css" scoped>

</style>
