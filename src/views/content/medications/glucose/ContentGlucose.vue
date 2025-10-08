<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Hypoglykämie</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Kontraindikation">
      <ns-list>
        <ns-contraindication type="none"><b>Keine</b></ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe><b>Nekrosen</b> bei paravasaler Gabe</ns-sideeffect>
        <ns-sideeffect todo>Bei unsicherem Zugang Alternative benutzen:</ns-sideeffect>
        <ns-sideeffect link="med:glucagon">Glucagon</ns-sideeffect>
      </ns-list>
      <ns-list divider>
        <ns-sideeffect>Venenreizung</ns-sideeffect>
        <ns-sideeffect>Hypokaliämie / Hyperglykämie</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv_1g_10ml" v-if="isIv_1g_10mlEnabled"></ns-package>
      <ns-package :package="iv_2g_10ml" v-if="isIv_2g_10mlEnabled"></ns-package>
      <ns-package :package="iv_4g_10ml" v-if="isIv_4g_10mlEnabled"></ns-package>

      <ns-dosage-indication name="Hypoglykämie">
        <ns-dosage-usage type="iv">
          <div>
            <ns-dosage :dosage="{
              target: '> 30kg (8J)', color: 'blue',
              dose: '8g', hint: doseAdultHint }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '< 30kg', color: 'red',
              dose: '2g /10kg' }">
            </ns-dosage>
          </div>
          <hr>
          <h2>Repetition</h2>
          <div>
            Nach <i>BZ-Kontrolle</i> möglich.
          </div>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="<case>i.v.</case>5 Minuten|<case>oral</case>10-20 Minuten"
      duration="30 Minuten">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Durch intravasale Gabe wird die <b>Plasmaglukose</b> direkt <b>erhöht.</b>
      </p>
      <p>
        Durch den Anstieg der Blutglukose wird die Insulinsekretion getriggert, wodurch die Glukose nach kurzer Zeit bereits wieder abgebaut ist, wenn keine anhaltende Glukosezufuhr erfolgt.
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

import {

  iv_1g_10ml,
  iv_2g_10ml,
  iv_4g_10ml,

  isIv_1g_10mlEnabled,
  isIv_2g_10mlEnabled,
  isIv_4g_10mlEnabled,
  isOnlyOneEnabled,

} from './Packages'

// ########################################################################################################

const doseAdultHint = computed(() => {
  if (isOnlyOneEnabled.value)
  {
    if (isIv_1g_10mlEnabled.value) { return '(8 Ampullen)' }
    if (isIv_2g_10mlEnabled.value) { return '(4 Ampullen)' }
    if (isIv_4g_10mlEnabled.value) { return '(2 Ampullen)'}
  }
  return ''
})

</script>

<style lang="css" scoped>

</style>