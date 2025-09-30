<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Bronchialobstruktion</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Salbutamol</b></ns-contraindication>
        <ns-contraindication type="acute">Symptomatische <b>Tachkardie</b></ns-contraindication>
        <ns-contraindication type="pediatric">Kinder <b>&lt; 4 Jahre</b></ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="acute">ACS</ns-contraindication>
        <ns-contraindication type="chronic">Bekanntes <b>Phäochromozytom</b> <i>(spez. Nierentumor)</i></ns-contraindication>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list>
        <ns-sideeffect>Tachykardie / Rhythmusstörungen</ns-sideeffect>
        <ns-sideeffect>Unruhe / Tremor</ns-sideeffect>
        <ns-sideeffect>Wehenhemmung</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="inh_5mgml"></ns-package>

      <ns-dosage-indication>
        <ns-dosage-usage type="pi">
          <div>
            <ns-dosage :dosage="{
              target: '<12 Jahre', color: 'red',
              dose: '1,25mg', hint: '(½ Ampulle)' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '>12 Jahre', color: 'blue',
              dose: '2,50mg', hint: '(1 Ampulle)' }">
            </ns-dosage>
          </div>
          <hr>
          <h2>Repetition</h2>
          <p>Einmalig nach <text-underline>10 Minuten</text-underline> möglich.</p>
        </ns-dosage-usage>
      </ns-dosage-indication>
    </ns-content-group>

    <ns-pharmacokinetics
      onset="5-15 Minuten"
      duration="3-6 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Salbutamol ist ein kurz wirksamer <i>β2-Agonist</i> und entspannt die glatte Bronchialmuskulatur und damit zur <b>Bronchodilatation</b>.
      </p>
      <p>
        Zusätzlich wird die <i>Mediatorfreisetzung</i> aus Mastzellen gedämpft.
      </p>
    </ns-pharmacodynamics>

  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import { Medication } from '@/types/medication'

import NsContentGroup from '@/components/NsContentGroup.vue'
import NsQuicktip from '@/components/NsQuicktip.vue'
import NsList from '@/components/NsList.vue'
import NsListItem from '@/components/NsListItem.vue'
import NsContraindication from '@/components/medications/NsContraindication.vue'
import NsSideeffect from '@/components/medications/NsSideeffect.vue'
import NsPackage from '@/components/medications/NsPackage.vue'
import NsDosageIndication from '@/components/medications/NsDosageIndication.vue'
import NsDosageUsage from '@/components/medications/NsDosageUsage.vue'
import NsDosage from '@/components/medications/NsDosage.vue'
import NsPharmacokinetics from '@/components/medications/NsPharmacokinetics.vue'
import NsPharmacodynamics from '@/components/medications/NsPharmacodynamics.vue'
import TextMono from '@/components/TextMono.vue'
import TextUnderline from '@/components/TextUnderline.vue'
import TextColored from '@/components/TextColored.vue'

const props = defineProps<{
  medication: Medication,
}>()

const inh_5mgml = computed(() => props.medication.packages['inh_5mgml'])

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>