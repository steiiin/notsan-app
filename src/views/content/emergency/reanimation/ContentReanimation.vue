<template>
  <ns-accordion-group>
    <ns-accordion title="Reanimation">

      <frag-defibrillation :patient="patient"></frag-defibrillation>
      <frag-intubation :patient="patient"></frag-intubation>

    </ns-accordion>
  </ns-accordion-group>
</template>

<script setup lang="ts">

import NsAccordionGroup from '@/components/NsAccordionGroup.vue';
import NsAccordion from '@/components/NsAccordion.vue';

import FragDefibrillation from './FragDefibrillation.vue';
import FragIntubation from './FragIntubation.vue';

import { Patient } from '@/types/emergency';

const props = defineProps<{
  patient: Patient
}>()

</script>

<style lang="css" scoped>

</style>
