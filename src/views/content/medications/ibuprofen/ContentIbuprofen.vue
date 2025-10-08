<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Leichte-Mittlere Schmerzen</ns-list-item>
        <ns-list-item>Fieberkrampf</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikation">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Ibuprofen</b> oder andere
          <ns-quicktip text="NSAR">
            <h2>Nicht-Steroidale-Antirheumatika</h2>
            <p>Schmerz-/Fiebermittel, z.B.</p>
            <ul>
              <li>Diclofenac</li>
              <li>Naproxen</li>
              <li>ASS</li>
            </ul>
          </ns-quicktip>
        </ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute"><b>Große OPs &amp; Traumata</b> in den letzten 4 Wochen</ns-contraindication>
        <ns-contraindication type="acute">Chirugische Eingriffe am <b>Auge oder ZNS</b> in den letzten 4 Wochen</ns-contraindication>
        <ns-contraindication type="acute">GIB oder urogenitale Blutung</ns-contraindication>
        <ns-contraindication type="acute">Schwere Dehydratation</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Aktuell Ulcus Ventriculi oder Duodeni</ns-contraindication>
        <ns-contraindication type="chronic">Schwere Leberinsuffizienz</ns-contraindication>
        <ns-contraindication type="chronic">Schwere Niereninsuffizienz</ns-contraindication>
        <ns-contraindication type="chronic">Schwere Herzinsuffizienz</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder &lt; 6 Monate</ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance"><b>6h Abstand</b> zu anderen NSAR</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">In Vergangenheit z.B. Colitis, Morbus Crohn</ns-contraindication>
        <ns-contraindication type="chronic">Herzinsuffizienz / KHK</ns-contraindication>
        <ns-contraindication type="chronic">Bekannte Porphyrie</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe>Schwere allergische Reaktionen</ns-sideeffect>
        <ns-sideeffect todo>Gemäß BPR intervenieren:</ns-sideeffect>
        <ns-sideeffect link="bpr:anaphylaxie">Anaphylaxie</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Magen-Darm-Beschwerden</ns-sideeffect>
        <ns-sideeffect>Schwindel</ns-sideeffect>
        <ns-sideeffect>Tinitus</ns-sideeffect>
        <ns-sideeffect>Erhöhte Blutungsgefahr</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="po_200mg_400mg_600mg_800mg" v-if="isPo_200mg_400mg_600mg_800mgEnabled"></ns-package>
      <ns-package :package="po_20mgml_40mgml" v-if="isPo_20mgml_40mgmlEnabled"></ns-package>
      <ns-package :package="supp_75mg_125mg_150mg_250mg" v-if="isSupp_75mg_125mg_150mg_250mgEnabled"></ns-package>
      <ns-package :package="iv_4mgml_6mgml_100ml" v-if="isIv_4mgml_6mgml_100mlEnabled"></ns-package>

      <ns-dosage-indication>
        <ns-dosage-usage type="invisible">
          <div>
            <ns-dosage :dosage="{
              target: '< 1 Jahr',
              color: 'red',
              dose: ' 50mg' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '1-3 Jahre',
              color: 'red',
              dose: '100mg' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '3-6 Jahre',
              color: 'lila',
              dose: '150mg' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '6-9 Jahre',
              color: 'green',
              dose: '200mg' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '9-12 Jahre',
              color: 'green',
              dose: '300mg' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '> 12 Jahre',
              color: 'blue',
              dose: '400mg' }">
            </ns-dosage>
            <hr>
            <ns-dosage :dosage="{
              target: 'Max. / Tag',
              dose: '3x', hint: 'Einzeldosis' }">
            </ns-dosage>
          </div>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      :onset="onsetText"
      duration="Bis 8 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Ibuprofen bremst die COX-Enzyme (COX-1/COX-2) und damit die Bildung von Prostaglandinen. Weniger Prostaglandine heißt: <b>weniger Entzündungsbotenstoffe</b> und <b>weniger Schmerzverstärkung</b> in Gewebe und Rückenmark.
      </p>
      <p>
        Durch die Prostaglandin-Bremse sinkt der Schmerzpegel (analgetisch) und die Schwellung nimmt ab (antiinflammatorisch). Gleichzeitig wird der <i>Fieber-Set-Point im Hypothalamus</i> heruntergeregelt – das <b>Fieber fällt</b>.
      </p>
      <p>
        Im Gegensatz zu ASS hemmt Ibuprofen die Thrombozytenfunktion <i>nur reversibel und kurzzeitig</i> – im Rettungsdienst primär relevant, weil es analgetisch/antipyretisch wirkt, <b>ohne eine dauerhafte Plättchenhemmung</b> zu hinterlassen.
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

  po_200mg_400mg_600mg_800mg,
  po_20mgml_40mgml,
  supp_75mg_125mg_150mg_250mg,
  iv_4mgml_6mgml_100ml,

  isPo_200mg_400mg_600mg_800mgEnabled,
  isPo_20mgml_40mgmlEnabled,
  isSupp_75mg_125mg_150mg_250mgEnabled,
  isIv_4mgml_6mgml_100mlEnabled,

  isOnlyOneEnabled,
  isAnyPoEnabled,
  isAnySuppEnabled,
  isAnyIvEnabled,

} from './Packages'

// ########################################################################################################

const onsetText = computed(() => {
  const one = isOnlyOneEnabled.value
  const parts = []
  if (isAnyIvEnabled.value) { parts.push(`${one ? '' : '<case>i.v.</case> '}5-10 Minuten${one ? '' : '|'}`) }
  if (isAnyPoEnabled.value) { parts.push(`${one ? '' : '<case>oral</case> '}30-60 Minuten${one ? '' : '|'}`) }
  if (isAnySuppEnabled.value) { parts.push(`${one ? '' : '<case>rektal</case> '}30-45 Minuten${one ? '' : '|'}`) }
  return parts.join('')
})

</script>

<style lang="css" scoped>

</style>