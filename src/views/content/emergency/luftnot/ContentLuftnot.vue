<template>
  <ns-accordion-group>
    <ns-accordion title="Luftnot">

      <!-- Obstruktion -->
      <ns-content-group title="Obstruktion" dense>

        <ns-dosage-usage type="pi" dense>
          <frag-salbutamol-obstruktion-pi></frag-salbutamol-obstruktion-pi>
          <frag-ipratropiumbromid-obstruktion-pi></frag-ipratropiumbromid-obstruktion-pi>
        </ns-dosage-usage>
        <frag-prednisolon-obstruktion-iv></frag-prednisolon-obstruktion-iv>
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

import FragSalbutamolObstruktionPi from '../../medications/salbutamol/FragSalbutamolObstruktionPi.vue';
import FragIpratropiumbromidObstruktionPi from '../../medications/ipratropiumbromid/FragIpratropiumbromidObstruktionPi.vue';
import FragPrednisolonObstruktionIv from '../../medications/prednisolon/FragPrednisolonObstruktionIv.vue';
import FragPrednisolonAnaphylaxieSupp from '../../medications/prednisolon/FragPrednisolonAnaphylaxieSupp.vue'; // use the same fragment, since dosage is the same

</script>

<style lang="css" scoped>

</style>
