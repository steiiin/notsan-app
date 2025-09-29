<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Starke Schmerzen <span v-if="onlySAA">(NRS &ge; 6)</span></ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Morphin</b></ns-contraindication>
        <ns-contraindication type="acute">Sopor, Koma</ns-contraindication>
        <ns-contraindication type="acute">Atemdepression</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder <b>&lt;&nbsp;6 Jahre</b></ns-contraindication>
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
        <ns-contraindication type="chronic">Bekannte <b>Epilepsie</b></ns-contraindication>
        <ns-contraindication type="chronic">Bekannte <b>Myasthenia Gravis</b></ns-contraindication>
        <ns-contraindication type="chronic">Bekanntes <b>Phäochromozytom</b> <i>(spez. Nierentumor)</i></ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list>
        <ns-sideeffect severe>Atemdepression</ns-sideeffect>
        <ns-sideeffect todo>Sauerstoffgabe</ns-sideeffect>
        <ns-sideeffect todo>Wach halten (Ansprache, Schmerzreize)</ns-sideeffect>
        <ns-sideeffect todo>Assistierte Beatmung</ns-sideeffect>
      </ns-list>
      <ns-list divider>
        <ns-sideeffect todo>Ultima Ratio:</ns-sideeffect>
        <ns-sideeffect link="/tabs/meds/naloxon">Naloxon</ns-sideeffect>
      </ns-list>
      <ns-list divider>
        <ns-sideeffect>Blutdruckabfall</ns-sideeffect>
        <ns-sideeffect>Bradykardie</ns-sideeffect>
        <ns-sideeffect todo>Volumengabe</ns-sideeffect>
      </ns-list>
      <ns-list divider>
        <ns-sideeffect>Übelkeit / Erbrechen</ns-sideeffect>
        <ns-sideeffect todo>Bei wiederholtem Erbrechen:</ns-sideeffect>
        <ns-sideeffect link="/tabs/meds/dimenhydrinat">Dimenhydrinat</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Benommenheit / Schwindel</ns-sideeffect>
        <ns-sideeffect>Anticholinerge Wirkung</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv10_1" v-if="isIv10_1Enabled"></ns-package>
      <ns-package :package="iv20_1" v-if="isIv20_1Enabled"></ns-package>

      <ns-dosage-indication name="Schmerzen">
        <ns-dosage-usage type="iv">

          <h2>Aufziehen</h2>
          <p>Um <i>Fehldosierung</i> zu vermeiden, immer gleiche Konzentration (<text-mono>1mg/ml</text-mono>) benutzen, dazu:
          </p>
          <ns-package v-if="isIv10_1Enabled"
            :package="iv10_1" :inline-specs="{
            on: 10,
            onlyOne: onlyOneEnabled }">
          </ns-package>
          <ns-package v-if="isIv20_1Enabled"
            :package="iv20_1" :inline-specs="{
            on: 20,
            onlyOne: onlyOneEnabled }">
          </ns-package>

          <hr>

          <div>
            <ns-dosage :dosage="{ type: 'adult', dose: '2mg', hint: '(2ml)' }"></ns-dosage>
            <ns-dosage :dosage="{ type: 'child', dose: '0,5mg /10kg', hint: '(0,5ml /10kg)'}"></ns-dosage>
          </div>

          <hr>

          <h2>Repetition</h2>
          <p>
            Alle <text-underline>3-4 Minuten</text-underline> dosisgleich. <br>
            Maximal <text-mono>10mg</text-mono>.
          </p>

        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="1-2 Minuten"
      duration="2-4 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Morphin ist ein <b>µ-Opioid-Agonist</b> und <i>hyperpolarisiert Neurone</i> und <i>bremst Neurotransmitterfreisetzung</i>. Schmerzsignale werden dadurch <b>weniger weitergeleitet</b> und sind <b>emotional weniger belastend</b>.
      </p>
      <p>
        Peripher setzt Morphin <i>Histamin</i> frei und wirkt <i>vasodilatierend</i> - das <b>senkt die Vorlast</b>.
      </p>
      <p>
        Allerdings sinkt auch die <i>Atemantriebs-Antwort auf CO<sub>2</sub></i> - daher die <b>atemdepressive</b> Komponente.
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
import NsContraindication from '@/views/content/medications/NsContraindication.vue'
import NsSideeffect from '@/views/content/medications/NsSideeffect.vue'
import NsPackage from '@/views/content/medications/NsPackage.vue'
import NsDosageIndication from '@/views/content/medications/NsDosageIndication.vue'
import NsDosageUsage from '@/views/content/medications/NsDosageUsage.vue'
import NsDosage from '@/views/content/medications/NsDosage.vue'
import NsPharmacokinetics from '@/views/content/medications/NsPharmacokinetics.vue'
import NsPharmacodynamics from '@/views/content/medications/NsPharmacodynamics.vue'
import TextMono from '@/components/TextMono.vue'
import TextUnderline from '@/components/TextUnderline.vue'
import TextColored from '@/components/TextColored.vue'

const props = defineProps<{
  medication: Medication,
}>()

const iv10_1 = computed(() => props.medication.packages['iv-10mg-1ml'])
const iv20_1 = computed(() => props.medication.packages['iv-20mg-1ml'])

const isIv10_1Enabled = computed(() => true)
const isIv20_1Enabled = computed(() => true)

const onlyOneEnabled = computed(() => [ isIv10_1Enabled.value, isIv20_1Enabled.value ].filter(Boolean).length === 1)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>