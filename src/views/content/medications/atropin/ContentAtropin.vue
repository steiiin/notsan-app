<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Instabile Bradykardie</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Atropin</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">
            <ns-quicktip text="Engwinkelglaukom">
            <p>Blockierter Abfluss von Kammerwasser im Auge und gefährlicher Augeninnendruckanstieg.</p>
            <hr>
            <ns-c red><b>RedFlags:</b></ns-c>
            <ul>
              <li>Plötzlicher, intensiver Augenschmerz</li>
              <li>Sehstörungen</li>
              <li>Rote, geschwollene Augen</li>
              <li>Übelkeit, Erbrechen</li>
            </ul>
          </ns-quicktip>
        </ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Alle <b>&lt; 18 Jahre</b> durch SAA untersagt</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect>Tachykardie, Arrhythmie</ns-sideeffect>
        <ns-sideeffect>Sehstörungen, Auslösung <b>Glaukomanfall</b></ns-sideeffect>
        <ns-sideeffect>Mundtrockenheit</ns-sideeffect>
        <ns-sideeffect>Hautrötung</ns-sideeffect>
        <ns-sideeffect>Harnverhalt</ns-sideeffect>
        <ns-sideeffect>Unruhe, Verwirrtheit</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect todo>Anwendung abbrechen</ns-sideeffect>
        <ns-sideeffect todo>Alternativen benutzen</ns-sideeffect>
        <ns-sideeffect link="/library/bpr/bradykardie">Bradykardie</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="defaultPackage"></ns-package>

      <ns-dosage-indication name="Bradykardie">
        <ns-dosage-usage type="iv">
          <ns-dosage :dosage="{ type: 'adult', dose: '0,5mg', hint: '(1 Ampulle)' }"></ns-dosage>
          <h2>Repetition</h2>
          <p>Bei <i>nachweisbarer, aber nicht ausreichender</i> Wirkung, nach <ns-u>3-5 Minuten</ns-u> möglich.</p>
          <p>Maximaldosis: <ns-m>3mg</ns-m> (6 Ampullen)</p>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics onset="2-3min" duration="30min - 1h"></ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Atropin gehört zu der Gruppe der <b>Parasympatholytika</b>.
      </p>
      <p>
        Es blockiert die <i>muskarinergen Rezeptoren</i>, auf die normalerweise das Acetylcholin des Parasympathikus wirkt.
      </p>
      <p>
        Diese Eigenschaft führt zu einer breiten Palette pharmakologischer Wirkungen:
      </p>
      <p>
        Atropin <b>steigert die Herzfrequenz</b> und beschleunigt die AV-Überleitung.
      </p>
      <p>
        Gleichzeitig <b>erweitert es die Bronchien</b>, reduziert die Peristaltik und Sekretion im Gastrointestinaltrakt und entspannt die glatte Muskulatur.
      </p>
      <p>
        Im Auge verursacht Atropin eine Akkommodationshemmung sowie Mydriasis (Pupillenerweiterung). Zudem verringert es die Schweißproduktion und senkt die Speichelbildung.
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
import NsC from '@/components/NsC.vue'
import NsU from '@/components/NsU.vue'
import NsM from '@/components/NsM.vue'

const props = defineProps<{
  medication: Medication,
}>()

const defaultPackage = computed(() => props.medication.packages['iv-0.5mg-1ml'])

</script>

<style lang="css" scoped>

</style>