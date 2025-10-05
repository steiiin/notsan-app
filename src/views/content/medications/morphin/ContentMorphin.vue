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

      <ns-package :package="iv_10mg" v-if="isIv_10mgEnabled"></ns-package>
      <ns-package :package="iv_20mg" v-if="isIv_20mgEnabled"></ns-package>

      <ns-dosage-indication name="Schmerzen">
        <ns-dosage-usage type="iv">

          <h2>Aufziehen</h2>
          <p>Um <i>Fehldosierung</i> zu vermeiden, immer gleiche Konzentration (<text-mono>1mg/ml</text-mono>) benutzen, dazu:
          </p>
          <ns-package v-if="isIv_10mgEnabled"
            :package="iv_10mg" :inline-specs="{
            on: 10,
            onlyOne: isOnlyOneEnabled }">
          </ns-package>
          <ns-package v-if="isIv_20mgEnabled"
            :package="iv_20mg" :inline-specs="{
            on: 20,
            onlyOne: isOnlyOneEnabled }">
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

  iv_10mg,
  iv_20mg,

  isIv_10mgEnabled,
  isIv_20mgEnabled,
  isOnlyOneEnabled,

} from './Packages'

// ########################################################################################################

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>