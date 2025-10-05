<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Akutes Koronarsyndrom</ns-list-item>
        <ns-list-item>Lungenarterienembolie</ns-list-item>
        <ns-list-item>Akuter peripherer arterieller Verschluss</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikation">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Nitraten</b></ns-contraindication>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Pfefferminzöl</b></ns-contraindication>
        <ns-contraindication type="intolerance">In der Vergangenheit
          <ns-quicktip text="HIT">
            <h2>Heparin-induzierte Thrombozytopenie</h2>
            <p>Seltene Komplikation nach Heparintherapie, die zu einem Abfall der Thrombozytenzahl und einem erhöhtem Thrombosrisiko führt.</p>
          </ns-quicktip>
        </ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">Vd. <b>Aortensyndrom</b></ns-contraindication>
        <ns-contraindication type="acute"><b>Große OPs &amp; Traumata</b> in den letzten 4 Wochen</ns-contraindication>
        <ns-contraindication type="acute">Chirugische Eingriffe am <b>Auge oder ZNS</b> in den letzten 4 Wochen</ns-contraindication>
        <ns-contraindication type="acute">Vd. <b>Schlaganfall oder ICB</b></ns-contraindication>
        <ns-contraindication type="acute">GIB oder urogenitale Blutung</ns-contraindication>
        <ns-contraindication type="acute">Unkontrollierbare schwere Hypertonie</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Aktuell Ulcus Ventriculi oder Duodeni</ns-contraindication>
        <ns-contraindication type="chronic">Schwere Leberinsuffizienz</ns-contraindication>
        <ns-contraindication type="chronic">Schwere Niereninsuffizienz</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Kinder &lt; 12 Jahre (durch SAA untersagt)</ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Antikoagulation im Medikamentenplan <i>(außer ACS)</i></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list>
        <ns-sideeffect>Allergische Reaktion</ns-sideeffect>
        <ns-sideeffect>Blutungsgefahr</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv_25000ieml_0_2ml" v-if="isIv_25000ieml_0_2mlEnabled"></ns-package>
      <ns-package :package="iv_5000ieml_1ml" v-if="isIv_5000ieml_1mlEnabled"></ns-package>
      <ns-package :package="iv_5000ieml_5ml" v-if="isIv_5000ieml_5mlEnabled"></ns-package>

      <ns-dosage-indication>
        <ns-dosage-usage type="iv">
          <div>
            <ns-dosage :dosage="{ dose: '5.000IE', hint: doseHint }"></ns-dosage>
            <ns-dosage v-if="hasToWarn && !onlyOneEnabled" :dosage="{ dose: 'Auf richtige Ampullengröße achten!', color: 'red' }"></ns-dosage>
          </div>
          <hr>
          <h2>Keine Repetition</h2>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="Sofort"
      duration="1-3 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Die Blutgerinnung wird u.a. durch <i>Antithrombin</i> selbst limitiert.
      </p>
      <p>
        Heparin verstärkt die Wirkung dieser körpereigenen Bremse massiv: <i>Thrombin und Faktor Xa</i> werden schneller ausgeschaltet, sodass sich ein vorhandener Thrombus <b>nicht weiter vergrößert</b>.
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
  iv_25000ieml_0_2ml,
  iv_5000ieml_5ml,
  iv_5000ieml_1ml,
  isIv_25000ieml_0_2mlEnabled,
  isIv_5000ieml_5mlEnabled,
  isIv_5000ieml_1mlEnabled,
} from './Packages'

// ########################################################################################################

const onlyOneEnabled = computed(() => [ isIv_25000ieml_0_2mlEnabled.value, isIv_5000ieml_5mlEnabled.value, isIv_5000ieml_1mlEnabled.value ].filter(Boolean).length === 1)

// ########################################################################################################

const hasToWarn = computed(() => isIv_5000ieml_5mlEnabled.value)
const doseHint = computed(() => {
  if (hasToWarn.value)
  {
    if (onlyOneEnabled.value) { return '(nur 1ml aus der Ampulle)' }
  }
  else
  {
    return '(1 Ampulle)'
  }
  return ''
})

</script>

<style lang="css" scoped>

</style>