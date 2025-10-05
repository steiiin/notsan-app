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

      <ns-package :package="iv_5mgml_5ml" v-if="isIv_5mgml_5mlEnabled"></ns-package>
      <ns-package :package="iv_5mgml_10ml" v-if="isIv_5mgml_10mlEnabled"></ns-package>

      <ns-dosage-indication>
        <ns-dosage-usage type="invisible">
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

import { iv_5mgml_5ml, iv_5mgml_10ml } from './Packages'
import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const configStore = useConfigStore()

// ########################################################################################################

const isIv_5mgml_5mlEnabled = computed(() => configStore.checkPackageEnable(MedId.Urapidil, iv_5mgml_5ml.id))
const isIv_5mgml_10mlEnabled = computed(() => configStore.checkPackageEnable(MedId.Urapidil, iv_5mgml_10ml.id))

</script>

<style lang="css" scoped>

</style>