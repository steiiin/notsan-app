<template>

  <!-- DBRD: 2025 -->

  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Leichte-Mittlere Schmerzen</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Metamizol</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Bekanntes <b>Analgetika-Asthma-Syndrom</b></ns-contraindication>
        <ns-contraindication type="chronic">Agranulozystose durch <b>Metamizol</b> in Vergangenheit</ns-contraindication>
        <ns-contraindication type="chronic">Erkrankungen des <b>Blutbildenden Systems</b></ns-contraindication>
        <ns-contraindication type="chronic">Bekannter
          <ns-quicktip text="G6PD-Mangel">
            <h2>Glukose-6-phosphat-Dehydrogenase-Mangel</h2>
            <p>Genetisch bedingter Hormonmangel, der zu <b>rezidivierender hämolytischer Anämie</b> führt.</p>
            <hr>
            <text-colored red><b>RedFlags:</b></text-colored>
            <ul>
              <li>Herkunft: <i>Afrika, Südeuropa</i></li>
              <li>Sind Erbkrankheiten bekannt?</li>
              <li>Gab es <i>Schwäche/Gelbsucht</i> nach Schmerzmitteleinnahme in der Vergangenheit?</li>
            </ul>
          </ns-quicktip></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Stillzeit</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder &lt; 12 Jahre</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe>Allergische Reaktion</ns-sideeffect>
        <ns-sideeffect severe indented>Luftnot</ns-sideeffect>
        <ns-sideeffect indented>Ausschlag</ns-sideeffect>
        <ns-sideeffect indented>Magenschmerzen, Übelkeit</ns-sideeffect>
        <ns-sideeffect link="bpr:anaphylaxie">Anaphylaxie</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect severe>Tachykardie</ns-sideeffect>
        <ns-sideeffect severe>Blutdruckabfall</ns-sideeffect>
        <ns-sideeffect>Schwindel</ns-sideeffect>
        <ns-sideeffect todo>Flüssigkeitsersatz, ggf. Schocklagerung</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv_500mgml_2ml"></ns-package>

      <ns-dosage-indication>
        <ns-dosage-usage type="iv">

          <div>
            <ns-dosage :dosage="{
              target: '<50 kg', color: 'red',
              dose: ' 500mg', hint: '(½ Ampulle)' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '>50 kg', color: 'blue',
              dose: '1000mg', hint: '(1 Ampulle)'  }">
            </ns-dosage>
          </div>
          <h2>Als Kurzinfusion</h2>
          <p>über <text-underline>15min</text-underline> langsam einlaufen lassen.</p>
          <hr>
          <p><text-underline>Keine</text-underline> Repetition.</p>

        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics onset="2-8 Minuten" duration="3-4 Stunden"></ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Metamizol ist ein <i>Prodrug</i>, d.h. es wird nach Gabe in aktive Metaboliten umgewandelt.
      </p>
      <p>
        Metamizol hemmt die <strong>Cyclooxygenasen (COX)</strong> und reduziert dadurch die Bildung von Prostaglandinen. Das führt zu einer deutlichen <strong>Schmerzlinderung</strong> und <strong>Fiebersenkung</strong>.
      </p>
      <p>
        Zusätzlich scheint Metamizol auch <strong>zentral zu wirken</strong> – unter anderem über serotonerge Bahnen und Signalwege wie <strong>cGMP</strong>. Dadurch wird die Schmerzverarbeitung im zentralen Nervensystem abgeschwächt.
      </p>
      <p>
        Ein weiterer Effekt ist die <strong>spasmolytische Wirkung</strong>, insbesondere bei Koliken. Sie entsteht durch die Öffnung von <strong>Kaliumkanälen</strong> und eine Verminderung des <strong>Calciumeinstroms</strong> in glatte Muskulatur – das entspannt die Muskeln und lindert Krämpfe.
      </p>
    </ns-pharmacodynamics>

  </div>
</template>

<script setup lang="ts">

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
import TextColored from '@/components/TextColored.vue'
import TextMono from '@/components/TextMono.vue'
import TextUnderline from '@/components/TextUnderline.vue'
import { iv_500mgml_2ml } from './Packages'

</script>

<style lang="css" scoped>

</style>