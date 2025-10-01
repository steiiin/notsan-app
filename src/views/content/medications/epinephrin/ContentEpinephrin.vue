<template>

  <!-- SAA: 2025 -->

  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Reanimation</ns-list-item>
        <ns-list-item>Bradykardie</ns-list-item>
        <ns-list-item>Anaphylaxie</ns-list-item>
        <ns-list-item>Pseudokrupp</ns-list-item>
        <ns-list-item>Atemwegsobstruktion</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Kontraindikationen">
      <ns-list>
        <ns-contraindication type="none"><b>Keine, </b>wegen Lebensgefahr</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe>Herzfrequenzanstieg</ns-sideeffect>
        <ns-sideeffect severe>Blutdruckanstieg</ns-sideeffect>
        <ns-sideeffect severe>Angina Pectoris (erh. kardialer O<sub>2</sub>-Bedarf)</ns-sideeffect>
        <ns-sideeffect>Herzrhythmusstörungen</ns-sideeffect>
        <ns-sideeffect>Unruhe, Angst</ns-sideeffect>
        <ns-sideeffect todo>Anwendung abbrechen</ns-sideeffect>
        <ns-sideeffect todo>Wirk-Ende abwarten <i>(bereits nach Sekunden)</i></ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv_1mg"></ns-package>

      <ns-dosage-indication name="Reanimation">
        <ns-dosage-usage type="invisible">
          <h2>Schockbar (VF, VT)</h2>
          <p>Nach dem 3. erfolglosen Schock</p>
          <h2>Nicht Schockbar (PEA, Asystolie)</h2>
          <p>So schnell, wie möglich</p>
        </ns-dosage-usage>
        <ns-dosage-usage type="iv">
          <ns-dosage :dosage="{ type: 'adult', dose: '1mg', hint: '(1 Ampulle)' }"></ns-dosage>
          <hr>
          <ns-dosage :dosage="{ type: 'child', dose: '0,01mg/kg' }"></ns-dosage>
          <div>
            <p>Bei <text-colored red>Kinder-REA</text-colored> 1 Ampulle auf <text-mono>20mg</text-mono> NaCl aufziehen, dann:</p>
            <ns-dosage :dosage="{ type: 'child', dose: '1ml/5kg' }"></ns-dosage>
          </div>
        </ns-dosage-usage>
        <ns-dosage-usage type="invisible">
          <h2>Repetition</h2>
          <p>Alle <text-underline>4 Minuten</text-underline> nach erster Gabe</p>
        </ns-dosage-usage>
      </ns-dosage-indication>

      <ns-dosage-indication name="Anaphylaxie">
        <ns-dosage-usage type="invisible">
          <p>Bei <text-underline>ausgeprägter allergischer Reaktion, </text-underline>d.h. <i>Schockzeichen, Atemnot, Schleimhautödem</i></p>
        </ns-dosage-usage>
        <ns-dosage-usage type="im">
          <ns-dosage :dosage="{
            target: 'Ab 12 Jahren', color: 'blue',
            dose: ' 0,5mg', hint: '(½ Ampulle)' }">
          </ns-dosage>
          <div>
            <p>Hier <i>totfraumfreie</i> 1ml-Spritze verwenden:</p>
            <ns-dosage :dosage="{
              target: 'Kind (6-12)', color: 'orange',
              dose: ' 0,3mg', hint: '≙  0,3ml' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: 'Kind (<6)', color: 'red',
              dose: '0,15mg', hint: '≙ 0,15ml' }">
            </ns-dosage>
          </div>
        </ns-dosage-usage>
        <ns-dosage-usage type="invisible">
          <h2>Repetition</h2>
          <p>Nach <text-underline>5 Minuten</text-underline> möglich</p>
        </ns-dosage-usage>
      </ns-dosage-indication>

      <ns-dosage-indication name="Instabile Bradykardie">
        <ns-dosage-usage type="invisible">
          <p><text-underline>Instabilitätskriterien</text-underline> sind z.B. <i>Vigilanzminderung, Schock, Dyspnoe</i></p>
        </ns-dosage-usage>
        <ns-dosage-usage type="iv">
          <ns-dosage :dosage="{ type: 'none', dose: '2-10µg/min' }"></ns-dosage>
          <hr>
          <h2>Perfusor vorbereiten</h2>
          <p>
            1 Ampulle auf <text-mono>50ml</text-mono> NaCl Perfusorspritze aufziehen. Beschriften: <text-colored grey><text-mono>20µg/ml</text-mono></text-colored>
          </p>
          <ns-dosage :dosage="{
            target: 'Laufrate',
            dose: '6 - 30ml / h' }">
          </ns-dosage>
        </ns-dosage-usage>
      </ns-dosage-indication>

      <ns-dosage-indication name="Atemwegsobstruktion (Schleimhautödem/Pseudokrupp)">
        <ns-dosage-usage type="invisible">
          <p>Wenn <text-underline>SpO<sub>2</sub> &lt; 90%,</text-underline> trotz Sauerstoffgabe</p>
        </ns-dosage-usage>
        <ns-dosage-usage type="pi">
          <ns-dosage :dosage="{ target: 'Vernebler', dose: '4mg', hint: '(4 Ampullen)' }"></ns-dosage>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="<case>i.v.</case>wenige Sekunden|<case>i.m.</case>3-10 Minuten"
      duration="<case>i.v.</case>2-3 Minuten|<case>i.m.</case>20-30 Minuten">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>Adrenalin ist ein <b>Katecholamin</b>, es verengt kleine Blutgefäße & erweitert große, zentrale Gefäße.</p>
      <p>
        Adrenalin ist ein Stresshormon und schafft als solches die Voraussetzungen für die rasche <b>Bereitstellung von Energiereserven</b>, die in gefährlichen Situationen das Überleben sichern sollen.
      </p>
      <p>
        Von besonderer Wichtigkeit ist die Wirkung von Adrenalin auf das Herz-Kreislauf-System. Hierzu zählt u.a. der Anstieg des zentralen Blutvolumens, der durch <b>Kontraktion kleiner Blutgefäße</b>, insbesondere in der Haut und in den Nieren, über die Aktivierung von α1-Adrenozeptoren geschieht.
      </p>
      <p>
        Die Anwendung des Adrenalins bei Atemwegserkrankungen basiert auf seiner <b>bronchienrelaxierenden</b> Wirkung, die über eine Aktivierung von β2-Adrenozeptoren vermittelt wird. Systemische Nebenwirkungen nach Resorption müssen jedoch in Kauf genommen werden.
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
import TextUnderline from '@/components/TextUnderline.vue'
import TextMono from '@/components/TextMono.vue'
import { iv_1mg } from './Packages'

</script>

<style lang="css" scoped>

</style>