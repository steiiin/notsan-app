<template>

  <!-- SAA: 2025 -->

  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Reanimation</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Bekannte <b>Jod-Allergie</b></ns-contraindication>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Amiodaron</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Keine Säuglinge/Kleinkinder (&lt; 3 Jahre)</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="iv_150mg"></ns-package>

      <ns-dosage-indication name="Reanimation">
        <ns-dosage-usage type="iv">
          <h2>Nach 3. <i>erfolgloser</i> Defibrillation</h2>
          <ns-dosage :dosage="{ dose: '300mg', hint: '(2 Ampullen)', type: 'adult' }"></ns-dosage>
          <div>
            <ns-dosage :dosage="{ dose: '50mg /10kg', hint: '(1ml /10kg)', type: 'child' }"></ns-dosage>
            <p>Bei <text-colored red>Kindern</text-colored> maximal 2 Ampullen (<text-mono>6ml</text-mono>)</p>
          </div>
          <hr>
          <h2>Nach 5. <i>erfolgloser</i> Defibrillation</h2>
          <ns-dosage :dosage="{ dose: '150mg', hint: '(1 Ampulle)', type: 'adult' }"></ns-dosage>
          <p>
            Bei <text-colored red>Kindern</text-colored> wie bei 1. Gabe, <br>
            aber maximal 1 Ampulle (<text-mono>150mg</text-mono>)
          </p>
          <hr>
          <p>Langsam spritzen & Nachspülen</p>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics onset="2-5 Minuten" duration="ca. 15 Minuten"></ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Amiodaron gehört zu den wichtigsten Medikamenten zur Behandlung einiger Herzrhythmusstörungen.
      </p>
      <p>
        Es wird durch die von ihm induzierte Verlängerung des Aktionspotentials und der Refraktärzeit im Myokard den <b>Klasse III-Antiarrhythmika</b> zugeordnet.
      </p>
      <p>
        Amiodaron hemmt spannungssensitive Kaliumkanäle im Myokard, wodurch es zu einem verzögerten Kaliumausstrom während der Repolarisationsphase des Aktionspotenzials kommt. <br>
        Hierdurch wird die Repolarisationsdauer und die Refraktärzeit ebendieses verlängert und <i>Re-Entry-Mechanismen unterbunden</i>.
      </p>
      <p>
        Die Herzfrequenz sinkt, im Rahmen der Reanimation steigt die Chance auf eine <b>erfolgreiche Defibrillation</b> mit Erreichen eines ROSC.
      </p>
    </ns-pharmacodynamics>

  </div>
</template>

<script setup lang="ts">

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
import TextColored from '@/components/TextColored.vue'
import TextMono from '@/components/TextMono.vue'

const props = defineProps<{
  medication: Medication,
}>()

const iv_150mg = props.medication.packages['iv_150mg']

</script>

<style lang="css" scoped>

</style>