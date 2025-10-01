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
        <ns-sideeffect link="/library/bpr/anaphylaxie">Anaphylaxie</ns-sideeffect>
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
            <ns-dosage :dosage="{ type: 'adult', dose: 'bis 1.200mg / Tag' }"></ns-dosage>
            <ns-dosage :dosage="{
              target: '< 1 Jahr',
              color: 'red',
              dose: '50mg' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '1-3 Jahre',
              color: 'red',
              dose: '100mg' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '4-5 Jahre',
              color: 'lila',
              dose: '150mg' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '6-11 Jahre',
              color: 'green',
              dose: '200mg' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '> 12 Jahre',
              color: 'orange',
              dose: ' 75mg /10kg' }">
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

const props = defineProps<{
  medication: Medication,
}>()

const po_200mg_400mg_600mg_800mg = props.medication.packages['po_200mg_400mg_600mg_800mg']
const po_20mgml_40mgml = props.medication.packages['po_20mgml_40mgml']
const supp_75mg_125mg_150mg_250mg = props.medication.packages['supp_75mg_125mg_150mg_250mg']
const iv_4mgml_6mgml_100ml = props.medication.packages['iv_4mgml_6mgml_100ml']

const isPo_200mg_400mg_600mg_800mgEnabled = computed(() => true)
const isPo_20mgml_40mgmlEnabled = computed(() => true)
const isSupp_75mg_125mg_150mg_250mgEnabled = computed(() => true)
const isIv_4mgml_6mgml_100mlEnabled = computed(() => true)
const onlyOneEnabled = computed(() => [ isPo_200mg_400mg_600mg_800mgEnabled.value, isPo_20mgml_40mgmlEnabled.value, isSupp_75mg_125mg_150mg_250mgEnabled.value, isIv_4mgml_6mgml_100mlEnabled.value ].filter(Boolean).length === 1)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

const hasPo = computed(() => isPo_200mg_400mg_600mg_800mgEnabled.value || isPo_20mgml_40mgmlEnabled.value)
const hasSupp = computed(() => isSupp_75mg_125mg_150mg_250mgEnabled.value)
const hasIv = computed(() => isIv_4mgml_6mgml_100mlEnabled.value)

const onsetText = computed(() => {
  const one = onlyOneEnabled.value
  const parts = []
  if (hasIv.value) { parts.push(`${one ? '' : '<case>i.v.</case> '}5-10 Minuten${one ? '' : '|'}`) }
  if (hasPo.value) { parts.push(`${one ? '' : '<case>oral</case> '}30-60 Minuten${one ? '' : '|'}`) }
  if (hasSupp.value) { parts.push(`${one ? '' : '<case>rektal</case> '}30-45 Minuten${one ? '' : '|'}`) }
  return parts.join('')
})

</script>

<style lang="css" scoped>

</style>