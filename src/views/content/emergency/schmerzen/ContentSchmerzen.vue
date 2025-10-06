<template>
  <ns-accordion-group>
    <ns-accordion title="Schmerzen">

      <ns-content-group dense>

        <ns-dosage-usage type="iv" dense>
          <frag-esketamin-schmerzen-iv :patient="patient"></frag-esketamin-schmerzen-iv>
          <hr>
          <frag-midazolam-schmerzen-iv :patient="patient"></frag-midazolam-schmerzen-iv>
        </ns-dosage-usage>
        <frag-esketamin-schmerzen-nasal :patient="patient"></frag-esketamin-schmerzen-nasal>

      </ns-content-group>
      <ns-content-group dense>

      </ns-content-group>
      <ns-content-group dense>

      </ns-content-group>

    </ns-accordion>
  </ns-accordion-group>
</template>

<script setup lang="ts">

import NsAccordionGroup from '@/components/NsAccordionGroup.vue';
import NsAccordion from '@/components/NsAccordion.vue';
import NsContentGroup from '@/components/NsContentGroup.vue';
import NsDosageUsage from '@/components/medications/NsDosageUsage.vue';

import FragEsketaminSchmerzenIv from '../../medications/esketamin/FragEsketaminSchmerzenIv.vue';
import FragMidazolamSchmerzenIv from '../../medications/midazolam/FragMidazolamSchmerzenIv.vue';
import FragEsketaminSchmerzenNasal from '../../medications/esketamin/FragEsketaminSchmerzenNasal.vue';

import { Patient } from '@/types/emergency';

const props = defineProps<{
  patient: Patient
}>()

</script>

<style lang="css" scoped>

</style>
