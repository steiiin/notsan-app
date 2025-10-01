<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Asthmaanfall</ns-list-item>
        <ns-list-item>Exazerbierte COPD</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Kontraindikation">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Ipratropium</b> oder andere
          <ns-quicktip text="Atropinderivate">
            <h2>Parasympatholytika</h2>
            <p>Wirken dem Ruhe-Teil des vegetativen Nervensystems entgegen, z.B.</p>
            <ul>
              <li>Atropin</li>
              <li>Buscopan</li>
              <li>Spiriva <i>(Tiotropium)</i></li>
            </ul>
          </ns-quicktip>
        </ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">Symptomatische <b>Tachykardie/-arrhythmie</b></ns-contraindication>
        <ns-contraindication type="acute">
          <ns-quicktip text="Engwinkelglaukom">
            <p>Blockierter Abfluss von Kammerwasser im Auge und gefährlicher Augeninnendruckanstieg.</p>
            <hr>
            <text-colored red><b>RedFlags:</b></text-colored>
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
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder &lt; 6 Jahre</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect>Allergische Reaktion</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Kopfschmerzen / Schwindel / Unruhe</ns-sideeffect>
        <ns-sideeffect>Sehstörungen</ns-sideeffect>
        <ns-sideeffect>Mundtrockenheit / Husten</ns-sideeffect>
        <ns-sideeffect>Tachykardie</ns-sideeffect>
        <ns-sideeffect>Übelkeit / Bauchschmerzen</ns-sideeffect>
        <ns-sideeffect>Obstipation / Harnverhalt</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="inh_250ug" v-if="isInh_250ugEnabled"></ns-package>
      <ns-package :package="inh_500ug" v-if="isInh_500ugEnabled"></ns-package>

      <ns-dosage-indication>
        <ns-dosage-usage type="pi">
          <div>
            <ns-dosage :dosage="{
              target: 'Ab 12J', color: 'blue',
              dose: '0,5mg ', hint: ampAmount(0.5) }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: ' < 12J', color: 'red',
              dose: '0,25mg', hint: ampAmount(0.25) }">
            </ns-dosage>
          </div>
          <div v-if="!onlyOneEnabled">
            Auf die richtige <b>Ampullengröße</b> achten!
          </div>
          <hr>
          <h2>Repetition</h2>
          <div>
            Nach <i>30 Minuten</i> möglich.
          </div>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="Ca. 15 Minuten"
      duration="3-5 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Ipratropium blockiert <i>muskarinerge Rezeptoren</i> in den Bronchien.
      </p>
      <p>
        Dadurch <b>entspannen</b> sich die <b>glatten Atemwegsmuskeln</b> - der Bronchospasmus lässt nach. Zusätzlich wird <b>weniger Schleim</b> produziert.
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
import { inh_250ug, inh_500ug } from './Packages'

const isInh_250ugEnabled = computed(() => false)
const isInh_500ugEnabled = computed(() => true)
const onlyOneEnabled = computed(() => [ isInh_250ugEnabled.value, isInh_500ugEnabled.value ].filter(Boolean).length === 1)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

const ampAmount = (dose: number) => {
  if (onlyOneEnabled.value)
  {
    let size = 1
    if (isInh_250ugEnabled.value) { size = 0.25 }
    else if (isInh_500ugEnabled.value) { size = 0.5 }
    const amount = dose/size
    return `(${amount==0.5 ? '½' : amount} Ampulle${amount<=1 ? '' : 'n'})`
  }
  return ''
}

</script>

<style lang="css" scoped>

</style>