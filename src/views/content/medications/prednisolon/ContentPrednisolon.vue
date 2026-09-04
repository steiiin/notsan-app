<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Bronchialobstruktion</ns-list-item>
        <ns-list-item>Pseudokrupp</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Prednisolon</b></ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list>
        <ns-sideeffect>Hyperglykämie</ns-sideeffect>
        <ns-sideeffect>Immunsuppression</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="supp_100mg" v-if="isSupp_100mgEnabled"></ns-package>
      <ns-package :package="iv_100mg" v-if="isIv_100mgEnabled"></ns-package>
      <ns-package :package="iv_250mg" v-if="isIv_250mgEnabled"></ns-package>

      <ns-dosage-indication name="Bronchialobstrukiton">
        <ns-dosage-usage type="iv">
          <div>
            <ns-dosage :dosage="{
              target: '<12 Jahre', color: 'red',
              dose: '1 mg /kg', hint: '(max. 50mg)' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '>12 Jahre', color: 'blue',
              dose: '50mg' }">
            </ns-dosage>
          </div>
        </ns-dosage-usage>
        <ns-dosage-usage type="supp">
          <ns-dosage :dosage="{ type: 'child', dose: '100mg' }"></ns-dosage>
        </ns-dosage-usage>
      </ns-dosage-indication>
      <ns-dosage-indication name="Pseudokrupp">
        <ns-dosage-usage type="supp">
          <ns-dosage :dosage="{ type: 'child', dose: '100mg' }"></ns-dosage>
        </ns-dosage-usage>
      </ns-dosage-indication>
    </ns-content-group>

    <ns-pharmacokinetics
      :onset="onsetText"
      duration="Bis 18 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Prednisolon ist ein <i>Glukokortikoid</i>. Es dämpft als "Langzeitstress-Hormon" <b>Entzündungsreaktionen</b> im Körper.
      </p>
      <p>
        Präklinisch relevant ist die <i>Membranstabilisierung</i>: die Zellmembranen werden "dichter" und die Ausschüttung von Entzündungsstoffen (u.a. Histamin) gebremst.
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

import {

  supp_100mg,
  iv_100mg,
  iv_250mg,

  isSupp_100mgEnabled,
  isIv_100mgEnabled,
  isIv_250mgEnabled,
  isOnlyOneIvEnabled,

} from './Packages'

// ########################################################################################################

const ivAnalphylHintText = (amount: number) => {
  if (!isOnlyOneIvEnabled.value) { return '' }
  if (isIv_100mgEnabled.value)
  {
    if (amount == 250) { return '(2½ Ampullen)' }
    if (amount == 100) { return '(1 Ampulle)' }
    if (amount == 50) { return '(½ Ampulle)' }
  }
  if (isIv_250mgEnabled.value)
  {
    if (amount == 250) { return '(1 Ampulle)' }
    if (amount == 100) { return '(2ml)' }
    if (amount == 50) { return '(1ml)' }
  }
  return ''
}


const onsetText = computed(() => {
  if (isSupp_100mgEnabled.value)
  {
    return '<case>i.v.</case>Ca. 5 Minuten|<case>rektal</case>Ca. 1 Stunde'
  }
  else
  {
    return 'Ca. 5 Minuten'
  }
})

</script>

<style lang="css" scoped>

</style>