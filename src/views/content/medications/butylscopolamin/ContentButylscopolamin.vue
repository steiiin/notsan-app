<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Starke, kolikartige Schmerzen</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Butylscopolamin</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">Tachyarrhythmie</ns-contraindication>
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
        <ns-contraindication type="acute">Ileus, Stuhlverhalt</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">
          <ns-quicktip text="Myasthenia Gravis">
            <p>Autoimmunerkrankung mit gestörter Signalübertragung zwischen Nerv und Muskel.</p>
            <hr>
            <ns-c red><b>RedFlags:</b></ns-c>
            <ul>
              <li>Meistens bereits bekannt</li>
              <li>Unscharfes, doppeltes Sehen</li>
              <li>Hängendes Augenlid</li>
              <li>Schwäche der Extremitäten</li>
            </ul>
          </ns-quicktip>
        </ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Stillzeit</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder &lt; 12 Jahre (durch SAA untersagt)</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list>
        <ns-sideeffect severe>Tachykardie</ns-sideeffect>
        <ns-sideeffect severe>Blutdruckabfall</ns-sideeffect>
        <ns-sideeffect>Schwindel</ns-sideeffect>
        <ns-sideeffect todo>Flüssigkeitsersatz, ggf. Schocklagerung</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Mundtrockenheit</ns-sideeffect>
        <ns-sideeffect>Sehstörungen</ns-sideeffect>
        <ns-sideeffect>Unruhe, Angst</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="defaultPackage"></ns-package>

      <ns-dosage-indication name="Kolikartiger Schmerz">
        <ns-dosage-usage type="none">
          <h2>Ab <ns-quicktip text="NRS">
            <h2>Numeric-Rating-Scale</h2>
            <p>Schmerzskala</p>
            <ul>
              <li><b>0:</b> Keine Schmerzen</li>
              <li><b>1-2:</b> Leichte Schmerzen</li>
              <li><b>3-4:</b> Mittlere Schmerzen</li>
              <li><b>5-6:</b> Starke Schmerzen</li>
              <li><b>7-9:</b> Sehr starke Schmerzen</li>
              <li><b>10:</b> Stärkste vorstellbare Schmerzen</li>
            </ul>
          </ns-quicktip> &ge; 6</h2>
          <p>Bei <i>Nierenkolik</i> kaum wirksam.</p>
        </ns-dosage-usage>
        <ns-dosage-usage type="iv">
          <div>
            <ns-dosage :dosage="{ dose: '20mg', hint: '(1 Ampulle)', type: 'adult' }"></ns-dosage>
            <ns-dosage :dosage="{ dose: '15mg', hint: '(¾ Ampulle)', type: 'youth' }"></ns-dosage>
            <ns-dosage :dosage="{ dose: '10mg', hint: '(½ Ampulle)', type: 'child' }"></ns-dosage>
          </div>
          <hr>
          <p>Auf <ns-m>20ml</ns-m> NaCl aufziehen, langsam spritzen &amp; nachspülen. </p>
          <p>Herzfrequenz mit EKG oder SpO<sub>2</sub>-Sensor <i>überwachen</i>.</p>
        </ns-dosage-usage>
        <ns-dosage-usage type="none">
          <h2>Repetition</h2>
          <p>Nach <ns-u>5 Minuten</ns-u> kann der Rest gegeben werden.</p>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics onset="1-3min" duration="ca. 4 Stunden"></ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Butylscopolaminiumbromid gehört zur Gruppe der <b>Parasympatholytika</b>, besitzt aber keine zentrale, sondern periphere anticholinerge Wirkung.
      </p>
      <p>
        Dadurch vermindert es den Tonus der glatten Muskulatur im Bereich des Magen-Darm- und Urogenitaltraktes, was zur <b>Schmerzreduktion</b> bei Bauchkrämpfen führt.
      </p>
      <p>
        Durch die Verminderung des parasymphathischen Einflusses kommt es zur <i>Beschleunigung der Herzfrequenz</i> und durch die Entspannung der glatten Muskulatur zur Vasodilatation und in Folge zum <i>Blutdruckabfall</i>.
      </p>
      <p>
        Zusätzlich hemmt Butylscopolamin die Bronchial-, Speichel- und Schweißsekretion und führt dadurch zu den <i>weiteren Nebenwirkungen</i>.
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
import NsM from '@/components/NsM.vue'
import NsU from '@/components/NsU.vue'

const props = defineProps<{
  medication: Medication,
}>()

const defaultPackage = computed(() => props.medication.packages['iv-20mg-1ml'])

</script>

<style lang="css" scoped>

</style>