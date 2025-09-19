<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Hypoglykämie</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Kontraindikation">
      <ns-list>
        <ns-contraindication type="none"><b>Keine</b></ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe><b>Nekrosen</b> bei paravasaler Gabe</ns-sideeffect>
        <ns-sideeffect todo>Bei unsicherem Zugang Alternative benutzen:</ns-sideeffect>
        <ns-sideeffect link="/tabs/med/glucagon">Glucagon</ns-sideeffect>
      </ns-list>
      <ns-list divider>
        <ns-sideeffect>Venenreizung</ns-sideeffect>
        <ns-sideeffect>Hypokaliämie / Hyperglykämie</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="g10" v-if="isG10Enabled"></ns-package>
      <ns-package :package="g20" v-if="isG20Enabled"></ns-package>
      <ns-package :package="g40" v-if="isG40Enabled"></ns-package>

      <ns-dosage-indication name="Hypoglykämie">
        <ns-dosage-usage type="iv">
          <div>
            <ns-dosage :dosage="{
              target: '>30kg (8J)', color: 'blue',
              dose: '8g', hint: doseAdultHint }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '<30kg', color: 'red',
              dose: '2g / 10kg' }">
            </ns-dosage>
          </div>
          <hr>
          <h2>Repetition</h2>
          <div>
            Nach <i>BZ-Kontrolle</i> möglich.
          </div>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="<case>i.v.</case>5 Minuten|<case>oral</case>10-20 Minuten"
      duration="30 Minuten">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Durch intravasale Gabe wird die <b>Plasmaglukose</b> direkt <b>erhöht.</b>
      </p>
      <p>
        Durch den Anstieg der Blutglukose wird die Insulinsekretion getriggert, wodurch die Glukose nach kurzer Zeit bereits wieder abgebaut ist, wenn keine anhaltende Glukosezufuhr erfolgt.
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

const props = defineProps<{
  medication: Medication,
}>()

const g10 = computed(() => props.medication.packages['iv-g10'])
const g20 = computed(() => props.medication.packages['iv-g20'])
const g40 = computed(() => props.medication.packages['iv-g40'])

const isG10Enabled = computed(() => true)
const isG20Enabled = computed(() => true)
const isG40Enabled = computed(() => true)
const onlyOneEnabled = computed(() => [ isG10Enabled.value, isG20Enabled.value, isG40Enabled.value ].filter(Boolean).length === 1)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

const doseAdultHint = computed(() => {
  if (onlyOneEnabled.value)
  {
    if (isG10Enabled.value) { return '(8 Ampullen)' }
    if (isG20Enabled.value) { return '(4 Ampullen)' }
    if (isG40Enabled.value) { return '(2 Ampullen)'}
  }
  return ''
})

</script>

<style lang="css" scoped>

</style>