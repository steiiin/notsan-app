<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Blutungen nach schwerem Trauma</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Tranexamsäure</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft / Stillzeit</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder <b>&lt; 6 Jahre</b></ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="acute">Akute Embolie</ns-contraindication>
        <ns-contraindication type="chronic">Schwerer <b>Nierenschaden</b> <i>(spez. Nierentumor)</i></ns-contraindication>
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

      <ns-package :package="iv_100mgml_5ml" v-if="isIv_100mgml_5mlEnabled"></ns-package>
      <ns-package :package="iv_100mgml_10ml" v-if="isIv_100mgml_10mlEnabled"></ns-package>

      <ns-dosage-indication>
        <ns-dosage-usage type="iv">
          <ns-dosage :dosage="{ dose: '100mg /10kg', hint: '(1ml /10kg)' }"></ns-dosage>
          <p>Langsam spritzen (<text-mono>1ml/min</text-mono>).</p>
          <hr>
          <h2>Keine Repetition</h2>
        </ns-dosage-usage>
      </ns-dosage-indication>
    </ns-content-group>

    <ns-pharmacokinetics
      onset="Wenige Minuten"
      duration="7-8 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Tranexamsäure ist ein <i>Lysin-Analogon</i> und blockiert Bindungsstellen von <i>Plaminogen/Plasmin</i> an Fibrin. Dadurch wird die <b>Fibrinolyse gehemmt</b>.
      </p>
      <p>
        Ein Gerinnsel wird stabiler. In therapeutischen Spiegeln hat Tranexamsäure <i>keinen direkten Einfluss</i> auf Gerinnungsfaktoren oder Thrombozytenfunktion.
      </p>
    </ns-pharmacodynamics>

  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue'
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
import { iv_100mgml_5ml, iv_100mgml_10ml } from './Packages'

const isIv_100mgml_5mlEnabled = computed(() => true)
const isIv_100mgml_10mlEnabled = computed(() => true)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>