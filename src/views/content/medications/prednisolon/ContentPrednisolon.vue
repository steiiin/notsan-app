<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Anaphylxie</ns-list-item>
        <ns-list-item>Bronchialobstruktion</ns-list-item>
        <ns-list-item>Pseudokrupp</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Prednisolon</b></ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list>
        <ns-sideeffect>Hyperglykämie</ns-sideeffect>
        <ns-sideeffect>Immunsuppression</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="supp" v-if="isSuppEnabled"></ns-package>
      <ns-package :package="iv100" v-if="isIv100Enabled"></ns-package>
      <ns-package :package="iv250" v-if="isIv250Enabled"></ns-package>

      <ns-dosage-indication name="Anaphylaxie">
        <ns-dosage-usage type="supp" v-if="isSuppEnabled">
          <h2>Zäpfchen</h2>
          <ns-dosage :dosage="{ type: 'child', dose: '100mg'}"></ns-dosage>
        </ns-dosage-usage>
        <ns-dosage-usage type="iv">
          <div>
            <ns-dosage :dosage="{
              target: '>12 Jahre', color: 'blue',
              dose: '250mg', hint: ivAnalphylHintText(250) }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '8-12 Jahre', color: 'orange',
              dose: '100mg', hint: ivAnalphylHintText(100) }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '<8 Jahre', color: 'red',
              dose: ' 50mg', hint: ivAnalphylHintText(50) }">
            </ns-dosage>
          </div>
        </ns-dosage-usage>
      </ns-dosage-indication>
      <ns-dosage-indication name="Bronchialobstrukiton">
        <ns-dosage-usage type="iv">
          <div>
            <ns-dosage :dosage="{
              target: '<12 Jahre', color: 'red',
              dose: '20mg /10kg', hint: '(max. 80mg)' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '>12 Jahre', color: 'blue',
              dose: '80mg' }">
            </ns-dosage>
          </div>
        </ns-dosage-usage>
        <ns-dosage-usage type="supp">
          <ns-dosage :dosage="{ type: 'child', dose: '100mg' }"></ns-dosage>
        </ns-dosage-usage>
      </ns-dosage-indication>
      <ns-dosage-indication name="Pseudokrupp">
        <ns-dosage-usage type="supp">
          <ns-dosage :dosage="{ type: 'child', dose: '100mg' }"></ns-dosage>
        </ns-dosage-usage>
      </ns-dosage-indication>
    </ns-content-group>

    <ns-pharmacokinetics
      :onset="onsetText"
      duration="Bis 18 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Prednisolon ist ein <i>Glukokortikoid</i>. Es dämpft als "Langzeitstress-Hormon" <b>Entzündungsreaktionen</b> im Körper.
      </p>
      <p>
        Präklinisch relevant ist die <i>Membranstabilisierung</i>: die Zellmembranen werden "dichter" und die Ausschüttung von Entzündungsstoffen (u.a. Histamin) gebremst.
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
import TextColored from '@/components/TextColored.vue'

const props = defineProps<{
  medication: Medication,
}>()

const supp = computed(() => props.medication.packages['supp'])
const iv100 = computed(() => props.medication.packages['iv-100mg'])
const iv250 = computed(() => props.medication.packages['iv-250mg'])

const isSuppEnabled = computed(() => true)
const isIv100Enabled = computed(() => true)
const isIv250Enabled = computed(() => true)
const onlyOneIvEnabled = computed(() => [ isIv100Enabled.value, isIv250Enabled.value ].filter(Boolean).length === 1)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

const ivAnalphylHintText = (amount: number) => {
  if (!onlyOneIvEnabled.value) { return '' }
  if (isIv100Enabled.value)
  {
    if (amount == 250) { return '(2½ Ampullen)' }
    if (amount == 100) { return '(1 Ampulle)' }
    if (amount == 50) { return '(½ Ampulle)' }
  }
  if (isIv250Enabled.value)
  {
    if (amount == 250) { return '(1 Ampulle)' }
    if (amount == 100) { return '(2ml)' }
    if (amount == 50) { return '(1ml)' }
  }
  return ''
}


const onsetText = computed(() => {
  if (isSuppEnabled.value)
  {
    return '<case>i.v.</case>Ca. 5 Minuten|<case>rektal</case>Ca. 1 Stunde'
  }
  else
  {
    return 'Ca. 5 Minuten'
  }
})

</script>

<style lang="css" scoped>

</style>