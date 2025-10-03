<template>
  <ns-accordion-group>
    <ns-accordion title="Reanimation">

      <frag-defibrillation :patient="patient"></frag-defibrillation>
      <frag-intubation :patient="patient"></frag-intubation>

      <ns-content-group title="Medikamente" dense>
        <ns-dosage-usage type="iv" dense>

          <frag-epinephrine-reanimation :patient="patient"></frag-epinephrine-reanimation>
          <frag-amiodaron-reanimation :patient="patient"></frag-amiodaron-reanimation>

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

import FragDefibrillation from './FragDefibrillation.vue';
import FragIntubation from './FragIntubation.vue';

import FragEpinephrineReanimation from '../../medications/epinephrin/FragEpinephrineReanimation.vue';
import FragAmiodaronReanimation from '../../medications/amiodaron/FragAmiodaronReanimation.vue';

import { Patient } from '@/types/emergency';

const props = defineProps<{
  patient: Patient
}>()

</script>

<style lang="css" scoped>

</style>
