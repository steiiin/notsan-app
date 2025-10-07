<template>
  <ns-accordion-group>
    <ns-accordion title="Schmerzen + Trauma">

      <!-- Traumatische Schmerzen -->
      <ns-content-group title="Esketamin & Midazolam" dense>

        <ns-dosage-usage type="iv" dense>
          <frag-esketamin-schmerzen-iv></frag-esketamin-schmerzen-iv>
          <frag-midazolam-schmerzen-iv></frag-midazolam-schmerzen-iv>
        </ns-dosage-usage>
        <frag-esketamin-schmerzen-nasal></frag-esketamin-schmerzen-nasal>

      </ns-content-group>

      <!-- Opioide -->
      <ns-content-group title="Opioide" dense>

        <ns-dosage-usage type="iv" dense>
          <frag-morphin-schmerzen-iv></frag-morphin-schmerzen-iv>
          <frag-fentanyl-schmerzen-iv></frag-fentanyl-schmerzen-iv>
          <frag-nalbuphin-schmerzen-iv></frag-nalbuphin-schmerzen-iv>
        </ns-dosage-usage>

        <ns-dosage-usage type="nasal" label="i.m./nasal" dense>
          <frag-fentanyl-schmerzen-nasal></frag-fentanyl-schmerzen-nasal>
          <frag-nalbuphin-schmerzen-nasal></frag-nalbuphin-schmerzen-nasal>
        </ns-dosage-usage>

      </ns-content-group>

      <ns-content-group title="Trauma" dense>
        <frag-tranexam-trauma></frag-tranexam-trauma>
      </ns-content-group>

      <!-- Sonstige -->
      <ns-content-group title="Nicht-Opioide" dense>

        <ns-dosage-usage type="iv" dense>
          <frag-butylscopolamin-schmerzen></frag-butylscopolamin-schmerzen>
          <frag-ibuprofen-schmerzen-iv></frag-ibuprofen-schmerzen-iv>
          <frag-paracetamol-schmerzen-iv></frag-paracetamol-schmerzen-iv>
        </ns-dosage-usage>

        <ns-dosage-usage type="supp" dense v-if="useSuppositories">
          <frag-ibuprofen-schmerzen-supp></frag-ibuprofen-schmerzen-supp>
          <frag-paracetamol-schmerzen-supp></frag-paracetamol-schmerzen-supp>
        </ns-dosage-usage>

        <ns-dosage-usage type="po" dense>
          <frag-ibuprofen-schmerzen-po></frag-ibuprofen-schmerzen-po>
          <frag-paracetamol-schmerzen-po></frag-paracetamol-schmerzen-po>
        </ns-dosage-usage>

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

import FragTranexamTrauma from '../../medications/tranexam/FragTranexamTrauma.vue';

import FragMorphinSchmerzenIv from '../../medications/morphin/FragMorphinSchmerzen.vue';
import FragFentanylSchmerzenIv from '../../medications/fentanyl/FragFentanylSchmerzenIv.vue';
import FragFentanylSchmerzenNasal from '../../medications/fentanyl/FragFentanylSchmerzenNasal.vue';
import FragNalbuphinSchmerzenIv from '../../medications/nalbuphin/FragNalbuphinSchmerzenIv.vue';
import FragNalbuphinSchmerzenNasal from '../../medications/nalbuphin/FragNalbuphinSchmerzenNasal.vue';

import FragButylscopolaminSchmerzen from '../../medications/butylscopolamin/FragButylscopolaminSchmerzen.vue';
import FragIbuprofenSchmerzenIv from '../../medications/ibuprofen/FragIbuprofenSchmerzenIv.vue';
import FragIbuprofenSchmerzenSupp from '../../medications/ibuprofen/FragIbuprofenSchmerzenSupp.vue';
import FragIbuprofenSchmerzenPo from '../../medications/ibuprofen/FragIbuprofenSchmerzenPo.vue';
import FragParacetamolSchmerzenIv from '../../medications/paracetamol/FragParacetamolSchmerzenIv.vue';
import FragParacetamolSchmerzenSupp from '../../medications/paracetamol/FragParacetamolSchmerzenSupp.vue';
import FragParacetamolSchmerzenPo from '../../medications/paracetamol/FragParacetamolSchmerzenPo.vue';

import { isAnySuppEnabled as isIbuSuppEnabled } from '../../medications/ibuprofen/Packages';
import { isAnySuppEnabled as isParaSuppEnabled } from '../../medications/paracetamol/Packages';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { computed } from 'vue';

const useSuppositories = computed(() => patient.age < 12 && (isIbuSuppEnabled.value || isParaSuppEnabled.value));

</script>

<style lang="css" scoped>

</style>
