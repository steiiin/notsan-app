<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Hypertensiver Notfall</ns-list-item>
        <ns-list-item>Akutes Aortensyndrom</ns-list-item>
        <ns-list-item>Schlaganfall</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Urapidil</b></ns-contraindication>
      <ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Nicht korrigierte
          <ns-quicktip text="Aortenisthmusstenose">
            <h2>Aortenisthmusstenose</h2>
            <p>Verengung eines Teiles des Aortenbogens</p>
            <hr>
            <text-colored red><b>RedFlags:</b></text-colored>
            <ul>
              <li>Angeborene Herzfehler?</li>
              <li>Angeborene Fehlbildungen der Hauptschlagader?</li>
            </ul>
          </ns-quicktip>
        </ns-contraindication>
      </ns-list>
      </ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder <b>&lt; 12 Jahre</b></ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="acute">Schwere Herzinsuffizienz</ns-contraindication>
        <ns-contraindication type="chronic">Schwerer <b>Leberschaden</b></ns-contraindication>
        <ns-contraindication type="chronic">Schwerer <b>Nierenschaden</b></ns-contraindication>
        <ns-contraindication type="chronic">Herzklappenstenose</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe>Starker Blutdruckabfall</ns-sideeffect>
        <ns-sideeffect todo>Volumengabe / Lagerung</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Kopfschmerzen / Schwindel</ns-sideeffect>
        <ns-sideeffect>Müdigkeit / Übelkeit / Erbrechen</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv5_5" v-if="isIv5_5Enabled"></ns-package>
      <ns-package :package="iv5_10" v-if="isIv5_10Enabled"></ns-package>

      <ns-dosage-indication>
        <ns-dosage-usage type="none">
          <h2>Zielwert</h2>
          <p>
            <text-underline>Aortensyndrom</text-underline>: <text-mono>100-120mmHg</text-mono><br>
            <text-underline>Schlaganfall</text-underline>: &gt;<text-mono>180mmHg</text-mono>
          </p>
        </ns-dosage-usage>
        <ns-dosage-usage type="iv">
          <div>
            <ns-dosage :dosage="{
              color: 'blue',
              dose: '5mg', hint: '(1ml)' }">
            </ns-dosage>
          </div>
          <hr>
          <h2>Repetition</h2>
          <p>
            Nach Zielwert alle <text-underline>5 Minuten</text-underline>.<br>
            Maximal: <text-mono>25mg</text-mono>.
          </p>
        </ns-dosage-usage>
      </ns-dosage-indication>
    </ns-content-group>

    <ns-pharmacokinetics
      onset="1-5 Minuten"
      duration="1-2 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Urapidil blockiert peripher <i>α1-Rezeptoren</i>, die u.a. in der Gefäßmuskulatur sitzen. Dadurch kommt es zur Dilatation, der <b>arterielle Widerstand sinkt</b> und damit der Blutdruck.
      </p>
      <p>
        Zusätzlich wirkt es <i>zentral auf den Sympatikus</i> - wodurch die Reflextachykardie bei fallendem Blutdruck <b>ausbleibt oder weniger ausgeprägt</b> auftritt.
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
import TextMono from '@/components/TextMono.vue'
import TextUnderline from '@/components/TextUnderline.vue'
import TextColored from '@/components/TextColored.vue'

const props = defineProps<{
  medication: Medication,
}>()

const iv5_5 = computed(() => props.medication.packages['iv-5mg-ml--5ml'])
const iv5_10 = computed(() => props.medication.packages['iv-5mg-ml--10ml'])

const isIv5_5Enabled = computed(() => true)
const isIv5_10Enabled = computed(() => true)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>