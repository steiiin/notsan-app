<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Starke Schmerzen <span v-if="onlySAA">(NRS &ge; 6)</span></ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Nalbuphin</b></ns-contraindication>
        <ns-contraindication type="intolerance">Dauermedikation <b>Opiate</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">Sopor, Koma</ns-contraindication>
        <ns-contraindication type="acute">Atemdepression</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Schwerer <b>Leberschaden</b></ns-contraindication>
        <ns-contraindication type="chronic">Schwerer <b>Nierenschaden</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder <b>&lt;&nbsp;6 Jahre</b></ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Opioidabhängigkeit</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">Leichte Bewusstseinsstörung (<b>Somnolenz</b>)</ns-contraindication>
        <ns-contraindication type="acute">Obstipation / Ileus</ns-contraindication>
        <ns-contraindication type="acute">Atemwegsobstruktion</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Bekannte <b>Epilepsie</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Stillzeit</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list>
        <ns-sideeffect severe>Atemdepression</ns-sideeffect>
        <ns-sideeffect todo>Sauerstoffgabe</ns-sideeffect>
        <ns-sideeffect todo>Wach halten (Ansprache, Schmerzreize)</ns-sideeffect>
        <ns-sideeffect todo>Assistierte Beatmung</ns-sideeffect>
      </ns-list>
      <ns-list divider>
        <ns-sideeffect todo>Ultima Ratio:</ns-sideeffect>
        <ns-sideeffect link="/tabs/med/naloxon">Naloxon</ns-sideeffect>
      </ns-list>
      <ns-list divider>
        <ns-sideeffect>Übelkeit / Erbrechen</ns-sideeffect>
        <ns-sideeffect todo>Bei wiederholtem Erbrechen:</ns-sideeffect>
        <ns-sideeffect link="/tabs/med/dimenhydrinat">Dimenhydrinat</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect>Benommenheit / Schwindel</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv20_2"></ns-package>

      <ns-dosage-indication name="Schmerzen">
        <ns-dosage-usage type="iv">

          <h2>Aufziehen</h2>
          <p>Um <i>Fehldosierung</i> zu vermeiden, immer gleiche Konzentration (<text-mono>1mg/ml</text-mono>) benutzen, dazu:
          </p>
          <ns-package
            :package="iv20_2" :inline-specs="{
            on: 20,
            onlyOne: true }">
          </ns-package>

          <hr>

          <div>
            <ns-dosage :dosage="{
              target: '< 65 Jahre', color: 'blue',
              dose: '2mg /10kg', hint: '(2ml /10kg)' }">
            </ns-dosage>
            <ns-dosage :dosage="{
              target: '>65 Jahre', color: 'red',
              dose: '1mg /10kg', hint: '(1ml /10kg)'}">
            </ns-dosage>
          </div>

          <hr>

          <h2>Repetition</h2>
          <p>
            <text-colored blue>Erwachsene</text-colored> <text-underline>2-3 Minuten</text-underline> dosisgleich. <br>
            Maximal <text-mono>20mg</text-mono>.
          </p>
          <p><text-colored red>Bei Kindern</text-colored> <text-underline>keine Repetition</text-underline>.</p>

        </ns-dosage-usage>
        <ns-dosage-usage type="im" label="nasal, i.m. & s.c.">

          <div>
            <ns-dosage :dosage="{ dose: '   2mg /10kg' }"></ns-dosage>
            <ns-dosage :dosage="{ dose: '0,25ml /25kg' }"></ns-dosage>
          </div>
          <hr>
          <p>
            Intramuskuläre Gabe <b><text-colored red>schmerzt</text-colored></b>.
          </p>

        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="<case>i.v.</case>2-3 Minuten|<case>i.m./s.c.</case>Ca. 15 Minuten"
      duration="3-6 Stunden">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Nalbuphin ist ein gemischt wirkendes Opioid: <b>κ-Agonist</b> und gleichzeitig <b>μ-Antagonist/-Partialagonist</b>.
      </p>
      <p>
        Durch die <i>µ-Antagonisierung</i> hat es weniger stark ausgeprägte <b>Atemdämpfung</b> und <b>Sedierung/Euphorisierung</b> - die <b>analgetische</b> Wirkung ist dennoch erhalten.
      </p>
      <p>
        Allerdings kann es potentere Opioide (auch Dauermedikation) in ihrere Wirkung bremsen.
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

const iv20_2 = computed(() => props.medication.packages['iv-20mg-2ml'])

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>