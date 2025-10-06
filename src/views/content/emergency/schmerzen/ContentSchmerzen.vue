<template>
  <ns-accordion-group>
    <ns-accordion title="Schmerzen">

      <!-- Traumatische Schmerzen -->
      <ns-content-group dense>

        <ns-dosage-usage type="iv" dense>
          <frag-esketamin-schmerzen-iv :patient="patient"></frag-esketamin-schmerzen-iv>
          <frag-midazolam-schmerzen-iv :patient="patient"></frag-midazolam-schmerzen-iv>
        </ns-dosage-usage>
        <frag-esketamin-schmerzen-nasal :patient="patient"></frag-esketamin-schmerzen-nasal>

      </ns-content-group>

      <!-- Opioide -->
      <ns-content-group dense>

        <ns-dosage-usage type="iv" dense>
          <frag-morphin-schmerzen-iv :patient="patient"></frag-morphin-schmerzen-iv>
          <frag-fentanyl-schmerzen-iv :patient="patient"></frag-fentanyl-schmerzen-iv>
          <frag-nalbuphin-schmerzen-iv :patient="patient"></frag-nalbuphin-schmerzen-iv>
        </ns-dosage-usage>

        <ns-dosage-usage type="nasal" label="i.m./nasal" dense>
          <frag-fentanyl-schmerzen-nasal :patient="patient"></frag-fentanyl-schmerzen-nasal>
          <frag-nalbuphin-schmerzen-nasal :patient="patient"></frag-nalbuphin-schmerzen-nasal>
        </ns-dosage-usage>

      </ns-content-group>

      <!-- Kolikschmerz -->
      <ns-content-group dense>

      </ns-content-group>

      <!-- Weitere -->
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

import FragMorphinSchmerzenIv from '../../medications/morphin/FragMorphinSchmerzen.vue';
import FragFentanylSchmerzenIv from '../../medications/fentanyl/FragFentanylSchmerzenIv.vue';
import FragFentanylSchmerzenNasal from '../../medications/fentanyl/FragFentanylSchmerzenNasal.vue';
import FragNalbuphinSchmerzenIv from '../../medications/nalbuphin/FragNalbuphinSchmerzenIv.vue';
import FragNalbuphinSchmerzenNasal from '../../medications/nalbuphin/FragNalbuphinSchmerzenNasal.vue';

import { Patient } from '@/types/emergency';

const props = defineProps<{
  patient: Patient
}>()

</script>

<style lang="css" scoped>

</style>
