<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Kardiales Lungenödem</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikation">
      <ns-list>
        <ns-contraindication type="intolerance">Bekannte <b>Unverträglichkeit</b> ggb. Furosemid</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">Schwere Hypovolämie</ns-contraindication>
        <ns-contraindication type="acute">Schwere Hypokaliämie/-natriämie</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic"><b>Leberversagen</b> mit Bewusstseinsstörung</ns-contraindication>
        <ns-contraindication type="chronic">Nierenversagen</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Stillzeit</ns-contraindication>
        <ns-contraindication type="pediatric">Keine Anwendung <b>&lt; 12 Jahre</b> <span v-if="!onlySAA">(lt. SAA)</span></ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Relative Kontraindikation">
      <ns-list>
        <ns-contraindication type="acute">Hypotonie</ns-contraindication>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect>Allergische Haut- und Schleimhautreaktionen</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Blutdruckabfall</ns-sideeffect>
        <ns-sideeffect>Schwindel, Übelkeit</ns-sideeffect>
        <ns-sideeffect>Hörstörungen</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv20mg" v-if="isIv20mgEnabled"></ns-package>
      <ns-package :package="iv40mg" v-if="isIv40mgEnabled"></ns-package>

      <ns-dosage-indication name="Kardiales Lungenödem">
        <ns-dosage-usage type="iv">
          <div>
            <ns-dosage :dosage="{ dose: '20mg', hint: 'langsam spritzen.'}"></ns-dosage>
            <template v-if="onlyOneEnabled">
              <ns-dosage v-if="isIv20mgEnabled" :dosage="{ dose: ' 2ml', hint: '(1 Ampulle)'}"></ns-dosage>
              <ns-dosage v-if="isIv40mgEnabled" :dosage="{ dose: ' 2ml', hint: '(½ Ampulle)'}"></ns-dosage>
            </template>
          </div>
          <div v-if="!onlyOneEnabled" style="display:flex">
            <ns-package inline :package="iv20mg"></ns-package> <b>ganz.</b>
          </div>
          <div v-if="!onlyOneEnabled" style="display:flex">
            <ns-package inline :package="iv40mg"></ns-package> <b>zur Hälfte.</b>
          </div>
          <hr>
          <p>
            Langsam spritzen.
          </p>
          <hr>
          <h2>Repetition</h2>
          <p>Einmalig nach <text-underline>15 Minuten</text-underline> möglich.</p>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="<case>Vorlast</case>ca. 5 Minuten|<case>Diurese</case>20-30 Minuten"
      duration="ca. 2 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Furosemid ist ein <b>Schleifendiuretikum</b>: Es blockiert den Na⁺/K⁺/2Cl⁻-Kotransporter (NKCC2) im <b>aufsteigenden Teil der Henle-Schleife</b>. Dadurch steigt die Natriurese und damit die <b>Wasserausscheidung</b>; parallel werden auch Kalium, Calcium und Magnesium vermehrt ausgeschieden.
      </p>
      <p>
        Unabhängig davon fördert es eine Prostaglandin-Freisetzung und Nitro-ähnliche Effekte in der Gefäßwand. Das bewirkt eine frühe Venodilatation, was die <b>Vorlast (Preload) senkt</b>.
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

const props = defineProps<{
  medication: Medication,
}>()

const iv20mg = computed(() => props.medication.packages['iv-20mg-2ml'])
const iv40mg = computed(() => props.medication.packages['iv-40mg-4ml'])

const isIv20mgEnabled = computed(() => true)
const isIv40mgEnabled = computed(() => true)
const onlyOneEnabled = computed(() => [ isIv20mgEnabled.value, isIv40mgEnabled.value ].filter(Boolean).length === 1)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>