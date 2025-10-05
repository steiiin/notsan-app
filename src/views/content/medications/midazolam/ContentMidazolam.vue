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

      <ns-package :package="iv_5mgml_1ml" v-if="isIv_5mgml_1mlEnabled"></ns-package>
      <ns-package :package="iv_1mgml_5ml" v-if="isIv_1mgml_5mlEnabled"></ns-package>
      <ns-package :package="iv_5mgml_3ml" v-if="isIv_5mgml_3mlEnabled"></ns-package>
      <ns-package :package="buccal_2_5mg_5mg_7_5mg_10mg" v-if="isBuccal_2_5mg_5mg_7_5mg_10mgEnabled"></ns-package>

      <ns-dosage-indication name="Krampfanfall">

        <ns-dosage-usage type="invisible" v-if="!onlyOneIvEnabled">
          <h2><text-colored red>Achtung</text-colored></h2>
          <p>
            Unbedingt auf richtige Dosierung <br>
            (<text-mono>5mg/ml</text-mono> oder <text-mono>1mg/ml</text-mono>) achten.
          </p>
        </ns-dosage-usage>

        <ns-dosage-usage type="po" v-if="isBuccal_2_5mg_5mg_7_5mg_10mgEnabled">

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
          <p>Um <i>Fehldosierung</i> zu vermeiden, immer gleiche Konzentration (<text-mono>1mg/ml</text-mono>)benutzen, dazu:
          </p>
          <ns-package v-if="isIv_1mgml_5mlEnabled"
            :package="iv_1mgml_5ml" :inline-specs="{
            onlyOne: onlyOneIvEnabled }">
          </ns-package>
          <ns-package v-if="isIv_5mgml_1mlEnabled"
            :package="iv_5mgml_1ml" :inline-specs="{
            on: 5,
            onlyOne: onlyOneIvEnabled }">
          </ns-package>
          <ns-package v-if="isIv_5mgml_3mlEnabled"
            :package="iv_5mgml_3ml" :inline-specs="{
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

import { iv_5mgml_1ml, iv_5mgml_3ml, iv_1mgml_5ml, buccal_2_5mg_5mg_7_5mg_10mg } from './Packages'
import { MedId } from '@/types/medication'
import { useConfigStore } from '@/stores/config'
const configStore = useConfigStore()

// ########################################################################################################

const isIv_5mgml_1mlEnabled = computed(() => configStore.checkPackageEnable(MedId.Midazolam, iv_5mgml_1ml.id))
const isIv_5mgml_3mlEnabled = computed(() => configStore.checkPackageEnable(MedId.Midazolam, iv_5mgml_3ml.id))
const isIv_1mgml_5mlEnabled = computed(() => configStore.checkPackageEnable(MedId.Midazolam, iv_1mgml_5ml.id))
const isBuccal_2_5mg_5mg_7_5mg_10mgEnabled = computed(() => configStore.checkPackageEnable(MedId.Midazolam, buccal_2_5mg_5mg_7_5mg_10mg.id))

const onlyOneEnabled = computed(() => [ onlyOneIvEnabled.value, isBuccal_2_5mg_5mg_7_5mg_10mgEnabled.value ].filter(Boolean).length === 1)
const onlyOneIvEnabled = computed(() => [ isIv_5mgml_1mlEnabled.value, isIv_5mgml_3mlEnabled.value, isIv_1mgml_5mlEnabled.value ].filter(Boolean).length === 1)

const hasIv = computed(() => isIv_1mgml_5mlEnabled.value || isIv_5mgml_1mlEnabled.value || isIv_5mgml_3mlEnabled.value)
const hasBuc = computed(() => isBuccal_2_5mg_5mg_7_5mg_10mgEnabled.value)

// ########################################################################################################

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