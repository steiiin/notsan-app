<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>ACS</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Bekannte <b>Unverträglichkeit</b> ggb. ASS oder andere
          <ns-quicktip text="NSAR">
            <h2>Nicht-Steroidale-Antirheumatika</h2>
            <p>Schmerz-/Fiebermittel, z.B.</p>
            <ul>
              <li>Diclofenac</li>
              <li>Ibuprofen</li>
              <li>Naproxen</li>
            </ul>
          </ns-quicktip>
        </ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">Vd. auf <b>Innere Blutung</b></ns-contraindication>
        <ns-contraindication type="acute">Vd. auf <b>Aortensyndrom</b></ns-contraindication>
        <ns-contraindication type="acute">Asthmaanfall</ns-contraindication>
        <ns-contraindication type="acute"><b>Nicht beherrschbare</b> Blutung</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Bekannte <b>Blutungsneigung</b></ns-contraindication>
        <ns-contraindication type="chronic">Magen-Darm-<b>Geschwüre</b></ns-contraindication>
        <ns-contraindication type="chronic">Schwerer Leberschaden <b>(Liberzirrhose)</b></ns-contraindication>
        <ns-contraindication type="chronic">Schwere <b>Nierenfunktionsstörung</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Alle <b>&lt; 18 Jahren</b></ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe>Allergische Reaktion</ns-sideeffect>
        <ns-sideeffect severe indented>Luftnot</ns-sideeffect>
        <ns-sideeffect indented>Ausschlag</ns-sideeffect>
        <ns-sideeffect indented>Magenschmerzen, Übelkeit</ns-sideeffect>
        <ns-sideeffect link="/med/">Anaphylaxie</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Blutungsneigung</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="defaultPackage"></ns-package>

      <ns-dosage-indication name="Akutes Koronarsyndrom">
        <ns-dosage-usage type="iv">
          <ns-dosage :dosage="{ type: 'adult', dose: '500mg', hint: '(½ Flasche)' }"></ns-dosage>
          <hr>
          <p>Langsam spritzen.</p>
          <p>Eventuell ist zu einem späteren Zeitpunkt eine orale Gabe möglich.</p>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics onset="5-30 Minuten" duration="bis 7 Tage"></ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Normalerweise zerlegt die Arachidonsäure enzymatisch die <b>Cyclooxygenase-1</b> (COX-1). <br>
        Dabei werden Prostaglandine, Prostacycline und <b>Thromboxan</b> frei.
      </p>
      <p>
        <b>Acetylsalicylsäure (ASS)</b> hemmt diesen Prozess <i>irreversibel</i>. Blutplättchen die
        zur Aktivierung auf Thromboxan als Mediator angewiesen sind, können so nicht mehr verklumpen
        (sog. <b>Aggregationshemmung</b>).
      </p>
      <p>
        Erst durch die Neubildung der Blutplättchen werden diese wieder funktionsfähig - das dauert
        allerdings <b>bis sieben Tage</b>.
      </p>
      <p>
        Durch die Beeinflussung der Schmerz- und Enzündungsvermittelnden <i>Prostaglan- und cycline</i>
        kommt es zusätzlich zu weiteren Nebenwirkungen, wie Magen-Darmbeschwerden bis hin zu
        allergischen Reaktionen.
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

const props = defineProps<{
  medication: Medication,
}>()

const defaultPackage = computed(() => props.medication.packages['iv-set'])

</script>

<style lang="css" scoped>

</style>