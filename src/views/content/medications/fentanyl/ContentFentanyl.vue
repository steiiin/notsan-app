<template>

  <!-- SAA: 2025 -->

  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Starke Schmerzen <span v-if="onlySAA">(NRS &ge; 6)</span></ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Bekannte <b>Unverträglichkeit</b> ggb. Fentanyl</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">Atemdepression</ns-contraindication>
        <ns-contraindication type="acute">Sopor, Koma</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Keine Anwendung <b>&lt; 21kg KG (ca. 6 Jahre)</b> <span v-if="!onlySAA">(lt. SAA)</span></ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Opioidabhängigkeit</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">Leichte Bewusstseinsstörung (<b>Somnolenz</b>)</ns-contraindication>
        <ns-contraindication type="acute">Obstipation / Ileus</ns-contraindication>
        <ns-contraindication type="acute">Atemwegsobstruktion</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Bekannte <b>Myasthenia Gravis</b></ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe>Atemdepression, Hypoventilation</ns-sideeffect>
        <ns-sideeffect todo>Kommandoatmung</ns-sideeffect>
        <ns-sideeffect todo>O<sub>2</sub>-Gabe</ns-sideeffect>
        <ns-sideeffect todo><b>Assistierte</b> Beatmung (Beutel-Maske)</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Blutdruckabfall</ns-sideeffect>
        <ns-sideeffect>Bradykardie</ns-sideeffect>
      </ns-list>
      <ns-list divider>
        <ns-sideeffect>Schwindel, Übelkeit, <b>Erbrechen</b></ns-sideeffect>
        <ns-sideeffect>Benommenheit</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect todo>Ultima Ratio:</ns-sideeffect>
        <ns-sideeffect link="/tabs/meds/naloxon">Naloxon</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv01mg" v-if="isiv01Enabled"></ns-package>
      <ns-package :package="iv05mg" v-if="isiv05Enabled"></ns-package>

      <ns-dosage-indication name="Stärkste Schmerzen">
        <ns-dosage-usage type="none">
          <h2 v-if="onlySAA">NRS &ge; 6</h2>
        </ns-dosage-usage>
        <ns-dosage-usage type="iv">

          <div>
            <p>
              Im Abstand von <text-underline>3-4 Minuten</text-underline>:
            </p>
            <ns-dosage :dosage="{ dose: '1ml', hint: '(0,05mg)'}"></ns-dosage>
          </div>
          <hr>
          <p>
            Langsam spritzen.
          </p>
          <hr>
          <div>
            <ns-dosage :dosage="{ target: 'Maximal', dose: '2µg /kg' }"></ns-dosage>
            <ns-dosage :dosage="{ target: ' ', dose: '1ml /25kg' }"></ns-dosage>
          </div>

        </ns-dosage-usage>
        <ns-dosage-usage type="im">

          <div>
            <p>
              Im Abstand von <text-underline>3-4 Minuten</text-underline>:
            </p>
            <ns-dosage :dosage="{ dose: '1ml', hint: '(0,05mg)'}"></ns-dosage>
          </div>
          <hr>
          <p>
            Langsam spritzen.
          </p>
          <hr>
          <div>
            <ns-dosage :dosage="{ target: 'Maximal', dose: '2µg /kg' }"></ns-dosage>
            <ns-dosage :dosage="{ target: ' ', dose: '1ml /25kg' }"></ns-dosage>
          </div>

        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="<case>i.v.</case>1-2 Minuten|<case>i.m./nasal</case>5-10 Minuten"
      duration="<case>i.v.</case>30 Minuten|<case>i.m./nasal</case>1 Stunde">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Fentanyl entfaltet seine primäre analgetische Wirkung überwiegend über die <b>Aktivierung der
        μ-Opioidrezeptoren</b>. Bei Bindung an diese Rezeptoren kommt es zur Hemmung der
        Neurotransmitterfreisetzung, was insbesondere zu einer supraspinalen
        Schmerzhemmung führt.
      </p>
      <p>
        Diese Eigenschaft ermöglicht eine <i>intensive Analgesie</i>.
      </p>
      <p>
        Die hohe Lipophilie von Fentanyl begünstigt zudem ein <b>schnelles Überqueren der Blut-Hirn-Schranke</b>, was zu einem nahezu sofortigen Wirkungseintritt führt.
      </p>
      <p>
        Dennoch erfordert der Einsatz eine <b>intensive Überwachung</b>, da es durch seine zentrale Wirkung auch zu Nebenwirkungen wie <i>Atemdepression und Kreislaufinstabilitäten</i> kommen kann.
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
import NsContraindication from '@/components/NsContraindication.vue'
import NsSideeffect from '@/components/NsSideeffect.vue'
import NsPackage from '@/components/NsPackage.vue'
import NsDosageIndication from '@/components/NsDosageIndication.vue'
import NsDosageUsage from '@/components/NsDosageUsage.vue'
import NsDosage from '@/components/NsDosage.vue'
import NsPharmacokinetics from '@/components/NsPharmacokinetics.vue'
import NsPharmacodynamics from '@/components/NsPharmacodynamics.vue'
import TextMono from '@/components/TextMono.vue'
import TextUnderline from '@/components/TextUnderline.vue'

const props = defineProps<{
  medication: Medication,
}>()

const iv01mg = computed(() => props.medication.packages['iv-01mg-2ml'])
const iv05mg = computed(() => props.medication.packages['iv-05mg-10ml'])

const isiv01Enabled = computed(() => true)
const isiv05Enabled = computed(() => true)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>