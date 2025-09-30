<template>

  <!-- SAA: 2025 -->

  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Anaphylaxie</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Dimetinden</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Stillzeit</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder &lt; 12 Jahre (durch SAA untersagt)</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="acute">
          <ns-quicktip text="Engwinkelglaukom"> <!-- TODO: Passus Engwinkelglaukom, existiert 3x -- evtl. in eigenes Snippet packen -->
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
        <ns-contraindication type="chronic">Epilepsie</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list>
        <ns-sideeffect severe>Sedierung, insb. bei Alkoholeinfluss</ns-sideeffect>
        <ns-sideeffect>Müdigkeit</ns-sideeffect>
        <ns-sideeffect todo>Verstärkte Vigilanzkontrolle</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect severe>Eingeschränkte Verkehrstüchtigkeit <b>(24h)</b></ns-sideeffect>
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

      <ns-package :package="iv_4mg"></ns-package>

      <ns-dosage-indication name="Anaphylaxie">
        <ns-dosage-usage type="iv">

          <ns-dosage :dosage="{ dose: '1mg /10kg', hint: '(1ml /10kg)', type: 'none' }"></ns-dosage>
          <hr>
          <p><text-underline>Keine</text-underline> Repetition.</p>

        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics onset="15-20 Minuten" duration="ca. 12 Stunden"></ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Dimetinden ist ein <b>Histamin-Antagonist</b>, der an H1-Rezeptoren wirkt.
      </p>
      <p>
        Histamin spielt als Neurotransmitter eine wichtige Rolle für die Immunreaktion, die Blockade <b>schwächt</b> demnach die <b>Symptome bei allergischen Reaktionen</b> ab.
      </p>
      <p>
        Durch eine hohe Affinität an muskarinergen Rezeptoren besitzt es eine zusätzliche anticholinerge Wirkung. Zusammen mit der zentralen H1-Blockade bewirkt es deswegen <i>Müdigkeit und Sedierung</i>.
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

const props = defineProps<{
  medication: Medication,
}>()

const iv_4mg = computed(() => props.medication.packages['iv_4mg'])

</script>

<style lang="css" scoped>

</style>