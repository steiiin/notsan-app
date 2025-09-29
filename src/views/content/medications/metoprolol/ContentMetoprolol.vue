<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list divider>
        <ns-list-item>Im Rahmen <b>STEMI/OMI</b>:</ns-list-item>
      </ns-list>
      <ns-list>
        <ns-list-item>Nicht schmerzbedingtes, <b>tachykardes Vorhofflimmern</b> <i>(&gt;100/min)</i></ns-list-item>
        <ns-list-item><b>Multiple VES</b> <i>(mind. 1-2 / 15s)</i></ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Kontraindikation">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Metoprolol</b></ns-contraindication>
        <ns-contraindication type="intolerance">Vormedikation mit
          <ns-quicktip text="Verapamil-Derivaten">
            <h2>Calciumantagonisten vom Verapamil-Typ</h2>
            <p>Diese Medikamente wirken hauptsächlich auf das Herz und die glatte Muskulatur der Blutgefäße; zu einer Senkung der Herzfrequenz, einer Verringerung der Kontraktionskraft des Herzens und einer Gefäßerweiterung.</p>
            <hr>
            <ul>
              <li head>Verapamil: <i>Isoptin</i></li>
              <li head>Gallopamil: <i>Procorum</i></li>
            </ul>
          </ns-quicktip>
        </ns-contraindication>
        <ns-contraindication type="intolerance">Gleichzeitige Gabe von <b>Glyceroltrinitrat</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">Akute <b>dekomp. Herzinsuffizienz</b></ns-contraindication>
        <ns-contraindication type="acute"><b>Hypotonie</b> (RR<sub>syst</sub>&nbsp;&lt;&nbsp;120mmHg)</ns-contraindication>
        <ns-contraindication type="acute"><b>Bradykardie</b> (&lt;&nbsp;60/min)</ns-contraindication>
        <ns-contraindication type="acute">AV-Block <b>II°/III°</b></ns-contraindication>
        <ns-contraindication type="acute">
          <ns-quicktip text="Hyperkaliämie im EKG">
            <p>
              Bei einer <b>Hyperkaliämie</b> findet sich im EKG:
            </p>
            <ul>
              <li>Verkürzung PQ-Zeit</li>
              <li>Zunahme QRS-Dauer</li>
              <li>Hohe T-Welle</li>
            </ul>
            <hr>
            <p>
              <img :src="imgHyperkaliaemieEkg" />
            </p>
          </ns-quicktip>
        </ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Kinder/Jugendliche</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list>
        <ns-sideeffect>Bradykardie</ns-sideeffect>
        <ns-sideeffect>Hypotonie</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv5mg5ml"></ns-package>

      <ns-dosage-indication>
        <ns-dosage-usage type="iv">
          <div>
            <ns-dosage :dosage="{ type: 'adult', dose: '2mg', hint: '(2ml)' }"></ns-dosage>
          </div>
          <hr>
          <h2>Repetition</h2>
          <div>
            <ns-dosage :dosage="{ dose: '2mg', hint: '(2ml) nach 3 Minuten' }"></ns-dosage>
            <ns-dosage :dosage="{ dose: '1mg', hint: '(1ml) nach 3 weiteren Minuten' }"></ns-dosage>
          </div>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="Wenige Minuten"
      duration="5-8 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Metoprolol blockiert <i>β1-Rezeptoren am Herz</i> - dadurch sinkt <b>Herzfrequenz&amp;-kraft</b>, der Sauerstoffbedarf sinkt.
      </p>
      <p>
        Außerdem <i>bremst es die AV-Überleitung</i>: Impulse vom Vorhof erreichen die Kammer langsamer. Das <b>stabilisiert die Herzfrequenz</b> und dämpft schnelle Überleitungen.
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

import imgHyperkaliaemieEkg from '@/data/assets/hyperkaliaemie-ekg.png'

const props = defineProps<{
  medication: Medication,
}>()

const iv5mg5ml = computed(() => props.medication.packages['iv-5mg-5ml'])

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>