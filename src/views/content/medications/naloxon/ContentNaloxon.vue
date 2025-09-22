<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Opioid-Intoxikation</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Naloxon</b></ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe>Entzugssyndrom</ns-sideeffect>
        <ns-sideeffect todo>Fraktioniert geben <i>(Spontanatmung &amp; Schutzreflexe, nicht wach)</i></ns-sideeffect>
      </ns-list>
      <ns-list divider>
        <ns-sideeffect severe>Rebound-Effekt</ns-sideeffect>
        <ns-sideeffect todo>Kontinuierliche Überwachung nach Gabe</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Schwindel</ns-sideeffect>
        <ns-sideeffect>Schwitzen / Tremor / Muskelkrämpfe</ns-sideeffect>
        <ns-sideeffect>Tachykardie / Blutdruckanstieg</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv04_1"></ns-package>

      <ns-dosage-indication>
        <ns-dosage-usage type="iv">

          <h2>Aufziehen</h2>
          <p>Um <i>Fehldosierung</i> zu vermeiden, immer gleiche Konzentration (<text-mono>0,1mg/ml</text-mono>) benutzen, dazu:
          </p>
          <ns-package
            :package="iv04_1" :inline-specs="{
            on: 4, onlyOne: true }">
          </ns-package>

          <hr>

          <div>
            <ns-dosage :dosage="{
              color: 'blue',
              dose: '0,1mg', hint: '(1ml)' }">
            </ns-dosage>
          </div>

          <hr>

          <h2>Repetition</h2>
          <p>
            Alle <b>2 Minuten</b> wiederholen.<br>
            <i>Fraktioniert, bis <text-underline>Spontanatmung und Schutzreflexe</text-underline> vorhanden.</i>
          </p>

        </ns-dosage-usage>
        <ns-dosage-usage type="nasal">

          <p>
            Der <b>MAD</b>-Zerstäuber ist <text-underline>obligatorisch</text-underline>,<br>
            da Bioverfügbarkeit nur bei 40-50%.
          </p>
          <p>
            Nur benutzen, wenn kein i.v.-Zugang möglich.
          </p>
          <ns-dosage :dosage="{ dose: '0,4mg', hint: '(1 Ampulle)' }"></ns-dosage>

        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="<case>i.v.</case>1-2 Minuten|<case>nasal</case>3-10 Minuten"
      duration="30-90 Minuten">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Naloxon ist ein <i>kompetitver Opiod-Rezeptor-Antagonist</i>, d.h. es <b>verdrängt</b> Opioide vom Rezeptor und <b>hebt deren Effekte auf</b>.
      </p>
      <p>
        Die Antagonisierung ist <i>reversibel</i> und die Wirkung <i>kürzer, als bei vielen Opioiden</i> - dadurch kehrt die Wirkung der zu "bekämpfenden" Opiate nach ca. 30 Minuten zurück (<b>Rebound</b>).
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

const iv04_1 = computed(() => props.medication.packages['iv-04mg-1ml'])

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>