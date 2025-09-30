<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Leichte-Mittlere Schmerzen</ns-list-item>
        <ns-list-item>Fieberkrampf</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikation">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Paracetamol</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Bekannter <b>Leberschaden</b></ns-contraindication>
        <ns-contraindication type="chronic">Bekannter
          <ns-quicktip text="G6PD-Mangel">
            <h2>Glukose-6-phosphat-Dehydrogenase-Mangel</h2>
            <p>Genetisch bedingter Hormonmangel, der zu <b>rezidivierender hämolytischer Anämie</b> führt.</p>
            <hr>
            <text-colored red><b>RedFlags:</b></text-colored>
            <ul>
              <li>Herkunft: <i>Afrika, Südeuropa</i></li>
              <li>Sind Erbkrankheiten bekannt?</li>
              <li>Gab es <i>Schwäche/Gelbsucht</i> nach Schmerzmitteleinnahme in der Vergangenheit?</li>
            </ul>
          </ns-quicktip></ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="chronic">Schwere Niereninsuffizienz</ns-contraindication>
        <ns-contraindication type="chronic">Bekannte <b>Blutbildungsstörung</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder &lt; 6 Monate</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe>Allergische Reaktionen</ns-sideeffect>
        <ns-sideeffect todo>Gemäß BPR intervenieren:</ns-sideeffect>
        <ns-sideeffect link="/library/bpr/anaphylaxie">Anaphylaxie</ns-sideeffect>
      </ns-list>
      <ns-list divider>
        <ns-sideeffect>Hypotonie</ns-sideeffect>
        <ns-sideeffect todo>Volumengabe</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="po_500mg" v-if="isPo_500mgEnabled"></ns-package>
      <ns-package :package="po_40mgml" v-if="isPo_40mgmlEnabled"></ns-package>
      <ns-package :package="supp_125mg_250mg" v-if="isSupp_125mg_250mgEnabled"></ns-package>
      <ns-package :package="iv_10mgml_100ml" v-if="isIv_10mgml_100mlEnabled"></ns-package>

      <ns-dosage-indication>
        <ns-dosage-usage type="iv" v-if="isIv_10mgml_100mlEnabled">
          <h2>Kurzinfusion</h2>
          <div>
            <ns-dosage :dosage="{
              target: '6-12 Jahre', color: 'red',
              dose: ' 500mg', hint: '(½ Infusion)' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '>12 Jahre', color: 'blue',
              dose: '1000mg', hint: '(1 Infusion)'  }">
            </ns-dosage>
          </div>
          <hr>
          <h2>Repetition</h2>
          <p>Nur <text-underline>einmalige Gabe</text-underline> vorgesehen.</p>
        </ns-dosage-usage>
        <ns-dosage-usage type="supp" v-if="isSupp_125mg_250mgEnabled">
          <h2>Zäpfchen</h2>
          <div>
            <ns-dosage :dosage="{ target: '<2 Jahre', color: 'red', dose: ' 125mg' }"></ns-dosage>
            <ns-dosage :dosage="{ target: '>2 Jahre', color: 'green', dose: ' 250mg' }"></ns-dosage>
          </div>
        </ns-dosage-usage>
        <ns-dosage-usage type="po" v-if="isPo_500mgEnabled || isPo_40mgmlEnabled">
          <template v-if="isPo_500mgEnabled">
            <h2>Tabletten</h2>
            <div>
              <ns-dosage :dosage="{
                target: '<12 Jahre', color: 'red',
                dose: ' 250mg', hint: '(½ Tablette)'}">
              </ns-dosage>
              <ns-dosage :dosage="{
                target: '>12 Jahre', color: 'blue',
                dose: ' 500mg', hint: '(1 Tablette)'}">
              </ns-dosage>
            </div>
          </template>
          <hr v-if="isPo_40mgmlEnabled && isPo_500mgEnabled">
          <template v-if="isPo_40mgmlEnabled">
            <h2>Schmerzsaft</h2>
            <div>
              <ns-dosage :dosage="{ target: 'Einmaldosis', dose: ' 100mg /10kg' }"></ns-dosage>
              <ns-dosage :dosage="{ target: 'Tagesdosis', dose: ' 400mg /10kg' }"></ns-dosage>
            </div>
          </template>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      :onset="onsetText"
      duration="4-6 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Paracetamol wirkt zum einen <b>zentral analgetisch</b>, indem es die <i>Prostaglandinwirkung</i> im Gehirn bremst. Auf die <i>periphere Cyclooxygenase</i> hat es kaum Einfluss - zählt deshalb auch nicht zu den <i>NSAR</i>.
      </p>
      <p>
        Über die <i>Hemmung peripherer Schmerz-Natriumkanäle</i> kommt es zum anderen zu einer <b>schwach lokalanästhetischen Wirkung</b>.
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
import TextMono from '@/components/TextMono.vue'
import TextUnderline from '@/components/TextUnderline.vue'
import TextColored from '@/components/TextColored.vue'

const props = defineProps<{
  medication: Medication,
}>()

const po_500mg = computed(() => props.medication.packages['po_500mg'])
const po_40mgml = computed(() => props.medication.packages['po_40mgml'])
const supp_125mg_250mg = computed(() => props.medication.packages['supp_125mg_250mg'])
const iv_10mgml_100ml = computed(() => props.medication.packages['iv_10mgml_100ml'])

const isPo_500mgEnabled = computed(() => true)
const isPo_40mgmlEnabled = computed(() => true)
const isSupp_125mg_250mgEnabled = computed(() => true)
const isIv_10mgml_100mlEnabled = computed(() => true)
const onlyOneEnabled = computed(() => [ isPo_500mgEnabled.value, isPo_40mgmlEnabled.value, isSupp_125mg_250mgEnabled.value, isIv_10mgml_100mlEnabled.value ].filter(Boolean).length === 1)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

const hasPo = computed(() => isPo_500mgEnabled.value || isPo_40mgmlEnabled.value)
const hasSupp = computed(() => isSupp_125mg_250mgEnabled.value)
const hasIv = computed(() => isIv_10mgml_100mlEnabled.value)

const onsetText = computed(() => {
  const one = onlyOneEnabled.value
  const parts = []
  if (hasIv.value) { parts.push(`${one ? '' : '<case>i.v.</case> '}5-10 Minuten${one ? '' : '|'}`) }
  if (hasPo.value) { parts.push(`${one ? '' : '<case>oral</case> '}30-60 Minuten${one ? '' : '|'}`) }
  if (hasSupp.value) { parts.push(`${one ? '' : '<case>rektal</case> '}45-60 Minuten${one ? '' : '|'}`) }
  return parts.join('')
})

</script>

<style lang="css" scoped>

</style>