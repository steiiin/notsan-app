<template>
  <ns-accordion-group>
    <ns-accordion title="Sonstige">

      <ns-content-group title="Hypoglykämie" dense>
        <frag-glucose-hypoglyk-iv :patient="patient"></frag-glucose-hypoglyk-iv>
      </ns-content-group>

    </ns-accordion>
  </ns-accordion-group>
</template>

<script setup lang="ts">

import NsAccordionGroup from '@/components/NsAccordionGroup.vue';
import NsAccordion from '@/components/NsAccordion.vue';
import NsContentGroup from '@/components/NsContentGroup.vue';

import FragGlucoseHypoglykIv from '../../medications/glucose/FragGlucoseHypoglykIv.vue';

import { Patient } from '@/types/emergency';
import { computed } from 'vue';

const props = defineProps<{
  patient: Patient
}>()

</script>

<style lang="css" scoped>

</style>
