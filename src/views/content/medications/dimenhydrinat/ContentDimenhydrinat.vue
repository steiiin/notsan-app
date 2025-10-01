<template>

  <!-- SAA: 2025 -->

  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Übelkeit & Erbrechen mit Aspirationsgefahr</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Dimenhydrinat</b></ns-contraindication>
        <ns-contraindication type="intolerance">Einnahme von
          <ns-quicktip text="MAO-Hemmer">
            <h2>MAO-Hemmer</h2>
            <p>MAO-Hemmer erhöhen Monoamine im Gehirn, wirken antidepressiv.</p>
            <hr>
            <ul>
              <li head>Tranylcypromin: <i>Parnate</i></li>
              <li head>Moclobemid: <i>Aurorix</i></li>
              <li head>Phenelzin: <i>Nardil</i></li>
              <li head>Selegilin: <i>Eldepryl, Movern, Selgin</i></li>
            </ul>
          </ns-quicktip>
        </ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">
          <ns-quicktip text="Engwinkelglaukom"> <!-- TODO: Passus Engwinkelglaukom, existiert 4x -- evtl. in eigenes Snippet packen -->
            <p>Blockierter Abfluss von Kammerwasser im Auge und gefährlicher Augeninnendruckanstieg.</p>
            <hr>
            <text-colored red><b>RedFlags:</b></text-colored>
            <ul>
              <li>Plötzlicher, intensiver Augenschmerz</li>
              <li>Sehstörungen</li>
              <li>Rote, geschwollene Augen</li>
              <li>Übelkeit, Erbrechen</li>
            </ul>
          </ns-quicktip>
        </ns-contraindication>
        <ns-contraindication type="acute">Akute Bronchialobstruktion (Asthmaanfall, exarz. COPD)</ns-contraindication>
        <ns-contraindication type="acute">Abgelaufener Krampfanfall (Epilepsie, Eklamsie)</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Bekannte <ns-quicktip text="Porphyrie">
          Angeborene <b>Blutbildungsstörung</b>, ist in der Regel dem Patienten bekannt.
        </ns-quicktip></ns-contraindication>
        <ns-contraindication type="chronic">Bekanntes <ns-quicktip text="Long-QT-Syndrom">
          <p>
            Seltene <b>Herzerkrankung</b> mit pathologisch verlängertem QT-Interval im EKG.<br>
            Typisch sind anfallsweise auftretende Tachykardien, oft in Form einer Torsades-des-Pointes (einer Form der ventrikulären Tachykardie).
          </p>
          <hr>
          <text-colored red><b>RedFlag:</b></text-colored><br>
          <p>
            Wenn <b>QT</b>-Interval größer <b>50%</b> von <b>RR</b>-Abstand, dann <text-colored red>auffällig</text-colored>.
            <img :src="imgLongQt" />
          </p>
        </ns-quicktip></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Unter <b>Wehentätigkeit</b></ns-contraindication>
        <ns-contraindication type="pediatric">Keine Kinder &lt; {{ anySuppEnabled ? '1 Jahr' : '6 Jahre' }}</ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="acute">Herzrhythmusstörungen</ns-contraindication>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Stillzeit</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list>
        <ns-sideeffect severe>Sedierung, insb. bei Alkoholeinfluss</ns-sideeffect>
        <ns-sideeffect>Müdigkeit</ns-sideeffect>
        <ns-sideeffect todo>Verstärkte Vigilanzkontrolle</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Eingeschränkte Verkehrstüchtigkeit für Stunden</ns-sideeffect>
        <ns-sideeffect todo>Aufklärung des Patienten</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Sehstörungen</ns-sideeffect>
        <ns-sideeffect>Mund- & Hauttrockenheit</ns-sideeffect>
        <ns-sideeffect>Gastrointestinale Beschwerden</ns-sideeffect>
        <ns-sideeffect>Unruhe, Angst</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv_62mg"></ns-package>
      <ns-package v-if="isSupp40Enabled" :package="supp_40mg"></ns-package>
      <ns-package v-if="isSupp70Enabled" :package="supp_70mg"></ns-package>

      <ns-dosage-indication name="Übelkeit & Erbrechen">
        <ns-dosage-usage type="iv">
          <div>
            <ns-dosage :dosage="{ dose: '62mg', hint: '(1 Ampulle)', color: 'blue', target: '> 14 Jahre' }"></ns-dosage>
            <ns-dosage :dosage="{ dose: '31mg', hint: '(½ Ampulle)', color: 'orange', target: '≥ 6 Jahre' }"></ns-dosage>
          </div>
          <template v-if="!onlySAA">
            <hr>
            <h2>Achtung bei Kleinkindern</h2>
            <p>Bei <i>i.v-Überdosierung</i> lebensbedrohliche Nebenwirkungen möglich. <i>Gewichtsadaptiert:</i></p>
            <ns-dosage :dosage="{ dose: '1,25mg / kg', type: 'none', color: 'red' }"></ns-dosage>
            <div>
              <p>In Ampulle <text-mono>6,2mg / ml</text-mono>, d.h.:</p>
              <ns-dosage :dosage="{ dose: '1ml /5kg', type: 'none', color: 'red' }"></ns-dosage>
            </div>
          </template>
        </ns-dosage-usage>
        <ns-dosage-usage type="supp" v-if="anySuppEnabled">
          <div v-if="isSupp70Enabled">
            <ns-dosage :dosage="{ dose: '70mg', hint: '(Zäpfchen)', target: '> 14kg', color: 'green' }"></ns-dosage>
            <ns-dosage v-if="isSupp40Enabled" :dosage="{ dose: '40mg', hint: '(Zäpfchen)', target: '> 6kg', color: 'red' }"></ns-dosage>
          </div>
          <ns-dosage v-if="isSupp40Enabled" :dosage="{ dose: '40mg', hint: '(Zäpfchen)', type: 'child' }"></ns-dosage>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics v-if="anySuppEnabled"
      onset="<case>i.v.</case>3-5 Minuten|<case>p.r.</case>15-30 Minuten"
      duration="3-6 Stunden">
    </ns-pharmacokinetics>
    <ns-pharmacokinetics v-else onset="3-5 Minuten" duration="3-6 Stunden"></ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Dimenhydrinat ist ein <b>Histaminrezeptor-Antagonist</b>.
      </p>
      <p>
        Im Brechzentrum <i>(Area postrema)</i> ist Histamin ein wichtiger Neurotransmitter zur Signalweiterleitung.
      </p>
      <p>
        Die Blockade der Histaminrezeptoren <b>unterdrückt</b> dadurch die <b>Übelkeit</b> und <i>verhindert Erbrechen</i>.
      </p>
      <p>
        Durch eine Affinität an muskarinergen Rezeptoren besitzt es eine zusätzliche anticholinerge Wirkung. Zusammen mit der zentralen H1-Blockade bewirkt es zusätzlich <i>Müdigkeit und Sedierung</i>.
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
import TextColored from '@/components/TextColored.vue'
import TextMono from '@/components/TextMono.vue'
import TextUnderline from '@/components/TextUnderline.vue'

import imgLongQt from '@/data/assets/long-qt.png'

const props = defineProps<{
  medication: Medication,
}>()

const iv_62mg = props.medication.packages['iv_62mg']
const supp_40mg = props.medication.packages['supp_40mg']
const supp_70mg = props.medication.packages['supp_70mg']

const isSupp40Enabled = computed(() => false)
const isSupp70Enabled = computed(() => false)
const anySuppEnabled = computed(() => isSupp40Enabled.value || isSupp70Enabled.value)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>