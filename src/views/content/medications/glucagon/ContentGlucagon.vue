<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Hypoglykämie</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Kontraindikation">
      <ns-list>
        <ns-contraindication type="intolerance">Bekannte <b>Unverträglichkeit</b> ggb. Glucagon</ns-contraindication>
        <ns-contraindication type="intolerance">Einnahme von
          <ns-quicktip text="Indometacin">
            <h2>NSAR-Schmerzmittel</h2>
            <p>Vor allem bei Rheuma, z.B.</p>
            <ul>
              <li>Amuno</li>
              <li>Elmetacin</li>
              <li>Indocolir</li>
              <li>Indomet</li>
              <li>Indo-paed</li>
              <li>Indo Top</li>
              <li>Luiflex</li>
            </ul>
          </ns-quicktip>
        </ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Nasal <b>&ge; 4 Jahre</b> <span v-if="!onlySAA">(lt. SAA)</span></ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe>Paradoxe Wirkung bei <b>Indometacin</b></ns-sideeffect>
        <ns-sideeffect todo>Intravenöse Gabe von Glucose</ns-sideeffect>
        <ns-sideeffect link="med:glucose">Glucose</ns-sideeffect>
      </ns-list>
      <ns-list divider>
        <ns-sideeffect>Übelkeit / Erbrechen</ns-sideeffect>
        <ns-sideeffect>Tachykardie / Hypertonie</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="im_1mg" v-if="isIm_1mgEnabled"></ns-package>
      <ns-package :package="nasal_3mg" v-if="isNasal_3mgEnabled"></ns-package>

      <ns-dosage-indication name="Hypoglykämie">
        <ns-dosage-usage type="im" v-if="isIm_1mgEnabled">
          <div>
            <ns-dosage :dosage="{
              target: '> 25kg (8J)', color: 'blue',
              dose: '  1mg', hint: '(Ganze Spritze)'}">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '< 25kg', color: 'red',
              dose: '0,5mg', hint: '(½ Spritze)'}">
            </ns-dosage>
          </div>
        </ns-dosage-usage>
        <ns-dosage-usage type="nasal" v-if="isNasal_3mgEnabled">
          <h2>Ab 4 Jahren</h2>
          <div>
            <ns-dosage :dosage="{ dose: '3mg', hint: '(Ganzes Nasenspray)' }"></ns-dosage>
          </div>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      :onset="onsetText"
      duration="ca. 1,5 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Glucagon ist ein Hormon, dass in der Leber die <b>Glykogenspeicher</b> leert <i>(vorausgesetzt, diese sind vorhanden)</i> und dadurch den <b>Blutzucker ansteigen</b> lässt.
      </p>
      <p>
        Am Herzen steigert es die Kalziumverfügbarkeit und steigert dadurch <b>Herzkraft&nbsp;&amp;&nbsp;-frequenz</b>.
      </p>
      <p>
        Durch eine Relaxation der glatten Muskulator des Gastrointestinaltrakts, kann es zu <b>Übelkeit/Erbrechen</b> kommen.
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

  im_1mg,
  nasal_3mg,

  isIm_1mgEnabled,
  isNasal_3mgEnabled,
  isOnlyOneEnabled,

} from './Packages'

// ########################################################################################################

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

const onsetText = computed(() => {
  if (isOnlyOneEnabled.value)
  {
    if (isIm_1mgEnabled.value) {
      return '10-30 Minuten'
    } else {
      return 'Ca. 15 Minuten'
    }
  }
  else
  {
    return '<case>i.m.</case>10-30 Minuten|<case>nasal</case>Ca. 15 Minuten'
  }
})

</script>

<style lang="css" scoped>

</style>