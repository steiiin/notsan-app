<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item>Kardiales Lungenödem</ns-list-item>
        <ns-list-item>Hypertensiver Notfall mit kardialer Symptomatik</ns-list-item>
        <ns-list-item>Akutes Koronarsyndrom</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Absolute Kontraindikation">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Nitraten</b></ns-contraindication>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Pfefferminzöl</b></ns-contraindication>
        <ns-contraindication type="intolerance">Einnahme von
          <ns-quicktip text="PDE-5-Hemmern">
            <h2>PDE-5-Hemmer</h2>
            <p>Zur Behandlung von pulmonaler Hypertonie oder erektiler Dysfunktion.</p>
            <hr>
            <ul>
              <li head>Silfenafil: <i>Viagra, Revatio</i></li>
              <li head>Tadalafil: <i>Cialis, Adcirca</i></li>
              <li head>Vardenafil: <i>Levitra, Vivanza</i></li>
              <li head>Avanafil: <i>Spedra, Stendra (USA)</i></li>
            </ul>
          </ns-quicktip>
        </ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute">Schock</ns-contraindication>
        <ns-contraindication type="acute">Hypotonie RR<sub>syst</sub>&nbsp;&lt;&nbsp;100mmHg</ns-contraindication>
        <ns-contraindication type="acute">Inferiorer Infarkt (Hebung <b>II</b>, <b>III</b>, <b>aVF</b>)</ns-contraindication>
        <ns-contraindication type="acute">Vd. <b>Erhöhung intrakranieller</b> Druck (z.B. ICB)</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="chronic">Schwere Herzklappenstenose</ns-contraindication>
        <ns-contraindication type="chronic">Bekannte <b>Hypertrophe, obstruktive Kardiomyopathie</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Kinder &lt; 12 Jahre (durch SAA untersagt)</ns-contraindication>
      </ns-list>
    </ns-content-group>
    <ns-content-group title="Relative Kontraindikationen">
      <ns-list>
        <ns-contraindication type="acute">Hypotonie RR<sub>syst</sub>&nbsp;&lt;&nbsp;120mmHg</ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Stillzeit</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list divider>
        <ns-sideeffect severe>Blutdruckabfall / <b>Synkope</b></ns-sideeffect>
        <ns-sideeffect>Reflextachykardie</ns-sideeffect>
        <ns-sideeffect todo>Schocklagerung</ns-sideeffect>
        <ns-sideeffect todo>Volumengabe</ns-sideeffect>
      </ns-list>
      <ns-list divider>
        <ns-sideeffect>Schwindel</ns-sideeffect>
        <ns-sideeffect>Kopfschmerzen</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package :package="nitro"></ns-package>

      <ns-dosage-indication>
        <ns-dosage-usage type="po">
          <div>
            <ns-dosage :dosage="{ dose: '1 Hub', hint: '(sublingual)' }">
            </ns-dosage>
          </div>
          <hr>
          <h2>Repetition</h2>
          <div>
            Nach <i>5 Minuten</i> möglich.
          </div>
        </ns-dosage-usage>
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="1-3 Minuten"
      duration="20-30 Minuten">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Glyceroltrinitrat ist ein sog. <i>„NO-Donator”</i> - es stellt Stickstoffmonooxid im Bereich der Gefäßmuskulatur bereit, die sich dadurch entspannt.
      </p>
      <p>
        In der Dosierung des Nitrosprays kommt es vor allem zur Venendilatation, erst in hohen Dosen zur arteriellen Dilatation.
      </p>
      <p>
        Das Blut versackt im venösen System - durch dieses <i>venöses Pooling</i> sinkt die <b>Vorlast</b> - d.h. der Füllungsdruck am Herzen nimmt ab. Zusätzlich führt es zur <b>Entstauung</b> der Lunge.
      </p>
      <p>
        Zusätzlich werden die <b>Koronararterien erweitert</b> und dadurch die Perfusion verbessert.
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

const props = defineProps<{
  medication: Medication,
}>()

const nitro = computed(() => props.medication.packages['spray-nitro'])

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>