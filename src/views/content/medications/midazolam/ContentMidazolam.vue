<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Komplizierter Krampfanfall</ns-list-item>
        <ns-list-item>Analgosedierung</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikationen">
      <ns-list subtitle="Generell">
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Midazolam</b></ns-contraindication>
        <ns-contraindication type="acute"><b>Hypoxisch bedingter</b> Krampfanfall</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder &lt; 3 Monate</ns-contraindication>
      </ns-list>
      <ns-list subtitle="bei Analgosedierung zusätzlich">
        <ns-contraindication type="intolerance"><b>Intoxikation</b> mit Alkohol/Drogen</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">Sopor, Koma</ns-contraindication>
        <ns-contraindication type="acute">Atemdepression</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Bekannte <b>Myasthenia Gravis</b></ns-contraindication>
        <ns-contraindication type="chronic">Bekannte <b>Obstruktive Schlafapnoe</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder &lt; 1 Jahr</ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="acute">Leichte Bewusstseinsstörung (<b>Somnolenz</b>)</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Chronisch Respiratorische Insuffizienz</ns-contraindication>
        <ns-contraindication type="chronic">Schwerer Leberschaden</ns-contraindication>
        <ns-contraindication type="chronic">Schwerer Nierenschaden</ns-contraindication>
        <ns-contraindication type="chronic">Schwere Herzinsuffizienz</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe>Atemdepression</ns-sideeffect>
        <ns-sideeffect todo>NA-Nachforderung (Antidot <b>Flumazenil</b>)</ns-sideeffect>
        <ns-sideeffect todo>Sauerstoffgabe</ns-sideeffect>
        <ns-sideeffect todo>Wach halten (Ansprache, Schmerzreize)</ns-sideeffect>
        <ns-sideeffect todo>Assistierte Beatmung</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Allergische Reaktion</ns-sideeffect>
        <ns-sideeffect>Müdigkeit / Sedierung</ns-sideeffect>
        <ns-sideeffect>Blutdruckabfall</ns-sideeffect>
        <ns-sideeffect>Paradoxe Reaktion (Erregung)</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv5_1" v-if="isIv5_1Enabled"></ns-package>
      <ns-package :package="iv1_5" v-if="isIv1_5Enabled"></ns-package>
      <ns-package :package="iv5_3" v-if="isIv5_3Enabled"></ns-package>
      <ns-package :package="buccl" v-if="isBucclEnabled"></ns-package>

      <ns-dosage-indication name="Krampfanfall">

        <ns-dosage-usage type="none" v-if="!onlyOneIvEnabled">
          <h2><text-colored red>Achtung</text-colored></h2>
          <p>
            Unbedingt auf richtige Dosierung <br>
            (<text-mono>5mg/ml</text-mono> oder <text-mono>1mg/ml</text-mono>) achten.
          </p>
        </ns-dosage-usage>

        <ns-dosage-usage type="po" v-if="isBucclEnabled">

          <h2>Buccale Gabe</h2>
          <div>
            <ns-dosage :dosage="{
              target: '< 1 Jahr', color: 'orange',
              dose: ' 2,5mg', hint: '(gelb)' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: 'Kindergarten', color: 'blue',
              dose: ' 5,0mg', hint: '(blau)' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: 'Grundschule', color: 'lila',
              dose: ' 7,5mg', hint: '(lia)' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '> 10 Jahre', color: 'red',
              dose: '10,0mg', hint: '(rot)' }">
            </ns-dosage>
          </div>

          <h2>Repetition</h2>
          <p>
            Einmalig möglich mit<br>
            <text-mono><text-colored lila>7,5mg (lila)</text-colored></text-mono> und<br>
            <text-mono><text-colored red>&nbsp;10mg (rot)</text-colored></text-mono>.<br>
          </p>

        </ns-dosage-usage>
        <ns-dosage-usage type="nasal">

          <h2>MAD-Nasenzerstäuber</h2>
          <div>
            <ns-dosage :dosage="{
              target: '< 2 Jahre', color: 'red',
              dose: ' 2,5mg' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '2-7 Jahre', color: 'orange',
              dose: '   5mg' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '> 7 Jahre', color: 'blue',
              dose: '  10mg' }">
            </ns-dosage>
          </div>
          <h2>Repetition</h2>
          <p>Dosisgleich ab 2 Jahren einmalig.</p>

        </ns-dosage-usage>
        <ns-dosage-usage type="iv">

          <h2>Aufziehen</h2>
          <p>Um <i>Fehldosierung</i> zu vermeiden, immer gleiche Konzentration benutzen (<text-mono>5mg/ml</text-mono>), dazu:
          </p>
          <ns-package v-if="isIv1_5Enabled"
            :package="iv1_5" :inline-specs="{
            onlyOne: onlyOneIvEnabled }">
          </ns-package>
          <ns-package v-if="isIv5_1Enabled"
            :package="iv5_1" :inline-specs="{
            on: 5,
            onlyOne: onlyOneIvEnabled }">
          </ns-package>
          <ns-package v-if="isIv5_3Enabled"
            :package="iv5_3" :inline-specs="{
            on: 5, off: 1,
            onlyOne: onlyOneIvEnabled }">
          </ns-package>

          <hr>

          <h2>Initialdosis</h2>
          <ns-dosage :dosage="{
            color: 'blue',
            dose: '1mg /10kg' }">
          </ns-dosage>
          <p>
            Anfänglich <text-underline>auf Hälfte</text-underline> reduzieren, <br>
            wenn <text-colored red><b>&lt;50kg</b></text-colored> oder
            <text-colored red><b>&gt;60J</b></text-colored>.
          </p>

          <hr>

          <h2>Repetition</h2>
          <p>
            Nach <text-underline>5 Minuten</text-underline> Wartezeit <br>
            Dosisgleich möglich. (Max. <text-mono>20mg</text-mono>)
          </p>

        </ns-dosage-usage>
      </ns-dosage-indication>

      <ns-dosage-indication name="Analgosedierung">
        <ns-dosage-usage type="iv">

          <div>
            <ns-dosage :dosage="{
              target: '<50kg / >60J', color: 'red',
              dose: '1mg' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '>50kg / <60J', color: 'blue',
              dose: '2mg' }">
            </ns-dosage>
          </div>
          <hr>
          <p>Langsam spritzen.</p>

        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      :onset="onsetText"
      :duration="durationText">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Midazolam ist ein <i>Benzodiazepin</i>. Diese verstärken den Effekt des körpereigenen <b>GABA</b> am GABA-A-Rezeptor.
      </p>
      <p>
        Vereinfacht gesagt, <i>feuern die Nervenzellen weniger</i> - die <i>Übererregung des ZNS</i> wird beruhigt.
      </p>
      <p>
        Benzodiazepine bewirken in unterschiedlicher Wichtung <b>Anxiolyse</b>, <b>Sedierung</b>, <b>anterograde Amnesie</b> und in höheren Dosen eine <b>Krampfdurchbrechung</b>.
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

const iv5_1 = computed(() => props.medication.packages['iv-5mg-ml--1ml'])
const iv5_3 = computed(() => props.medication.packages['iv-5mg-ml--3ml'])
const iv1_5 = computed(() => props.medication.packages['iv-1mg-ml--5ml'])
const buccl = computed(() => props.medication.packages['buccolam'])

const isIv5_1Enabled = computed(() => true)
const isIv5_3Enabled = computed(() => true)
const isIv1_5Enabled = computed(() => true)

const isBucclEnabled = computed(() => true)

const onlyOneEnabled = computed(() => [ onlyOneIvEnabled.value, isBucclEnabled.value ].filter(Boolean).length === 1)
const onlyOneIvEnabled = computed(() => [ isIv5_1Enabled.value, isIv5_3Enabled.value, isIv1_5Enabled.value ].filter(Boolean).length === 1)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

const hasIv = computed(() => isIv1_5Enabled.value || isIv5_1Enabled.value || isIv5_3Enabled.value)
const hasBuc = computed(() => isBucclEnabled.value)

const onsetText = computed(() => {
  let one = onlyOneEnabled.value
  const parts = []
  if (hasIv.value) {
    parts.push('<case>i.v.</case>1-5 Minuten|<case>nasal</case>5-10 Minuten|')
    one = false
  }
  if (hasBuc.value) { parts.push(`${one ? '' : '<case>buccal</case> '}10-15 Minuten${one ? '' : '|'}`) }
  return parts.join('')
})
const durationText = computed(() => {
  let one = onlyOneEnabled.value
  const parts = []
  if (hasIv.value) {
    parts.push('<case>i.v.</case>1-2 Stunden|<case>nasal</case>1-2 Stunden|')
    one = false
  }
  if (hasBuc.value) { parts.push(`${one ? '' : '<case>buccal</case> '}Bis 4 Stunden${one ? '' : '|'}`) }
  return parts.join('')
})

</script>

<style lang="css" scoped>

</style>