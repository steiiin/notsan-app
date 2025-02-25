<template>
  <div id="ns-content-bg">

    <ns-content-group title="Indikationen">
      <ns-list>
        <ns-list-item v-if="onlySAA">Stärkste Schmerzen nach Trauma</ns-list-item>
        <ns-list-item v-else>Starke Schmerzen</ns-list-item>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Kontraindikationen">
      <ns-list>
        <ns-contraindication type="intolerance">Unverträglichkeit ggb. <b>Esketamin</b></ns-contraindication>
        <ns-contraindication type="intolerance">Einfluss <b>psychoaktiver Substanzen</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="acute"><b>GCS</b> &lt; 12</ns-contraindication>
        <ns-contraindication type="acute"><b>Kardiales</b> Ereignis (z.B. ACS)</ns-contraindication>
        <ns-contraindication type="acute">
          <ns-quicktip text="Hirndruckzeichen">
            <p>Gesteigerter Hirndruck durch Raumforderung, z.B. bei Hirnblutung oder Hirnödem.</p>
            <hr>
            <text-colored red><b>RedFlags:</b></text-colored>
            <ul>
              <li>Kopfschmerzen</li>
              <li>Erbrechen</li>
              <li>Vigilanzminderung</li>
              <li><i>Cushing-Reflex:</i><br>
                <ul>
                  <li>Hypertonie</li>
                  <li>Bradykardie</li>
                  <li>Luftnot</li>
                </ul>
              </li>
            </ul>
          </ns-quicktip>
        </ns-contraindication>
        <ns-contraindication type="acute">RR<sub>syst.</sub> <b>&lt; 100mmHg</b> / RR<sub>syst.</sub> <b>&gt; 180mmHg</b></ns-contraindication>
      </ns-list>
      <ns-list>
        <ns-contraindication type="pediatric">Schwangerschaft</ns-contraindication>
        <ns-contraindication type="pediatric">Kinder <b>&lt; 30kg</b> (Freigabe ab ca. 8 Jahren)</ns-contraindication>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Nebenwirkungen">
      <ns-list>
        <ns-sideeffect severe>Vigilanzminderung</ns-sideeffect>
        <ns-sideeffect severe>Ateminsuffizienz</ns-sideeffect>
        <ns-sideeffect>Speichelfluss</ns-sideeffect>
        <ns-sideeffect todo>Engmaschige Überwachung</ns-sideeffect>
        <ns-sideeffect todo>Sauerstoffgabe, ggf. assistierte Beatmung</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect severe>Panik, Erregung</ns-sideeffect>
        <ns-sideeffect>Unruhe, Angst</ns-sideeffect>
        <ns-sideeffect>Euphorie (&bdquo;Neben der Spur&rdquo;)</ns-sideeffect>
        <ns-sideeffect todo>Ruhige Atmosphäre schaffen</ns-sideeffect>
        <ns-sideeffect todo>Ggf. Repetition Benzodiazepine</ns-sideeffect>
        <ns-sideeffect link="/tabs/meds/midazolam">Midazolam</ns-sideeffect>
      </ns-list>
      <ns-list>
        <ns-sideeffect severe>Blutdruckanstieg, Herzfrequenzanstieg</ns-sideeffect>
        <ns-sideeffect>Übelkeit, Erbrechen</ns-sideeffect>
        <ns-sideeffect todo>Keine weitere Dosiserhöhung</ns-sideeffect>
        <ns-sideeffect todo>Blutdruckspitze abwarten (ca. 10min)</ns-sideeffect>
      </ns-list>
    </ns-content-group>

    <ns-content-group title="Einsatz & Dosierung">

      <ns-package v-if="isiv5_5mlEnabled" :package="iv5_5ml"></ns-package>
      <ns-package v-if="isiv25_2mlEnabled" :package="iv25_2ml"></ns-package>
      <ns-package v-if="isiv25_10mlEnabled" :package="iv25_10ml"></ns-package>

      <ns-dosage-indication name="Stärkste Schmerzen">
        <ns-dosage-usage type="none">
          <h2 v-if="onlySAA">NRS &ge; 6</h2>
          <p><i>Ko-Medikation obligatorisch:</i></p>
          <ns-sideeffect link="/tabs/med/midazolam">Midazolam</ns-sideeffect>
        </ns-dosage-usage>
        <ns-dosage-usage type="iv">
          <div>
            <ns-dosage :dosage="{ dose: '1,25mg /10kg', target: 'Initial' }"></ns-dosage>
            <ns-dosage v-if="onlySAA" :dosage="{ dose: ' 2,5mg /10kg', target: 'Maximal' }"></ns-dosage>
            <ns-dosage v-else :dosage="{ dose: ' 2,5mg /10kg', target: 'Zieldosis' }"></ns-dosage>
          </div>
          <hr>
          <h2>Aufziehen</h2>
          <p>Um <i>Fehldosierung</i> zu vermeiden, immer gleiche Konzentration benutzen, dazu:
          </p>
          <div style="display:flex" v-if="isiv5_5mlEnabled">
            <span v-if="onlyOneEnabled">Ampulle&nbsp;</span>
            <ns-package inline :package="iv5_5ml" v-else></ns-package>
            <b>auf 10ml</b>
          </div>
          <div style="display:flex" v-if="isiv25_2mlEnabled">
            <span v-if="onlyOneEnabled">Ampulle&nbsp;</span>
            <ns-package inline :package="iv25_2ml" v-else></ns-package>
            <b>auf 20ml</b>
          </div>
          <div>
            <div style="display:flex; flex-wrap: wrap" v-if="isiv25_10mlEnabled">
              <i v-if="onlyOneEnabled">Ampulle&nbsp;</i>
              <ns-package inline :package="iv25_10ml" v-else></ns-package>
              <b>2ml abziehen</b>,
              <p v-if="onlyOneEnabled">dann <b>auf 20ml</b> aufziehen.</p>
              <p v-else style="margin-left: 1.2rem">dann <b>auf 20ml</b> aufziehen.</p>
            </div>
          </div>
          <p>
            <text-mono>1ml</text-mono> entspricht jetzt <i>{{ onlySAA ? 'dem Maximum' : 'der Zieldosis' }}</i> <br>
            pro <text-mono>10kgKG</text-mono>.
          </p>
          <hr>
          <h2>Initialdosis</h2>
          <p>{{ onlySAA ? 'Maximum' : 'Zieldosis' }} auf Spritze <i>markieren</i>.</p>
          <p style="opacity: .6;">
            Ein <i><text-mono>80kg</text-mono>-Patient</i> würde <text-mono>8ml</text-mono> bekommen. <i>Rest <text-mono>2ml</text-mono> markieren</i>.
          </p>
          <p>Die <b>Hälfte</b> {{ onlySAA ? 'vom Maximum' : 'der Zieldosis' }} geben.</p>
          <hr>
          <h2>Repetition</h2>
          <p>
            Nach <text-underline>4 Minuten</text-underline> Wartezeit die <br>
            andere <b>Hälfte</b> geben.
          </p>
          <p v-if="onlySAA">
            <i>Maximum erreicht.</i>
          </p>
          <p v-else>
            Alle <text-underline>60 Sekunden</text-underline> weitere <b><text-mono>0,5ml</text-mono></b> geben, bis <i>Schmerzfreiheit</i> erreicht.
          </p>
        </ns-dosage-usage>
        <ns-dosage-usage type="im" label="intramuskulär & nasal">
          <div>
            <ns-dosage :dosage="{ dose: '2,5mg /10kg', target: 'Initial' }"></ns-dosage>
            <ns-dosage v-if="onlySAA" :dosage="{ dose: '5,0mg /10kg', target: 'Maximal' }"></ns-dosage>
            <ns-dosage v-else :dosage="{ dose: '5,0mg /10kg', target: 'Zieldosis' }"></ns-dosage>
          </div>
          <template v-if="isiv5_5mlEnabled && onlyOneEnabled">
            <h2>Aufziehen</h2>
            <div style="display:flex">
              <span v-if="onlyOneEnabled">Ampulle&nbsp;</span>
              <ns-package inline :package="iv5_5ml" v-else></ns-package>
              <b>pur aufziehen</b>
            </div>
            <p>
              <text-mono>1ml</text-mono> entspricht jetzt <i>der Zieldosis</i> <br>
              pro <text-mono>10kgKG</text-mono>.
            </p>
            <hr>
            <h2>Initialdosis</h2>
            <p>Zieldosis auf Spritze <i>markieren</i>.</p>
            <p>Die <b>Hälfte</b> der Zieldosis geben.</p>
            <hr>
            <h2>Repetition</h2>
            <p>
              Nach <text-underline>4 Minuten</text-underline> Wartezeit die <br>
              andere <b>Hälfte</b> geben.
            </p>
          </template>
          <template v-else>
            <h2>Aufziehen &lt; 40kg</h2>
            <div style="display:flex" v-if="isiv5_5mlEnabled">
              <span v-if="onlyOneEnabled">Ampulle&nbsp;</span>
              <ns-package inline :package="iv5_5ml" v-else></ns-package>
              <b>pur aufziehen</b>
            </div>
            <div style="display:flex" v-if="isiv25_2mlEnabled">
              <span v-if="onlyOneEnabled">Ampulle&nbsp;</span>
              <ns-package inline :package="iv25_2ml" v-else></ns-package>
              <b>auf 10ml</b>
            </div>
            <div>
              <div style="display:flex; flex-wrap: wrap" v-if="isiv25_10mlEnabled">
                <i v-if="onlyOneEnabled">Ampulle&nbsp;</i>
                <ns-package inline :package="iv25_10ml" v-else></ns-package>
                <b>2ml abziehen</b>,
                <p v-if="onlyOneEnabled">dann <b>auf 10ml</b> aufziehen.</p>
                <p v-else style="margin-left: 1.2rem">dann <b>auf 10ml</b> aufziehen.</p>
              </div>
            </div>
            <p>
              <text-mono>1ml</text-mono> entspricht jetzt <i>der Zieldosis</i> <br>
              pro <text-mono>10kgKG</text-mono>.
            </p>
            <h2>Aufziehen &gt; 40kg</h2>
            <div style="display:flex" v-if="isiv25_2mlEnabled">
              <span v-if="onlyOneEnabled">Ampulle&nbsp;</span>
              <ns-package inline :package="iv25_2ml" v-else></ns-package>
              <b>auf 5ml</b>
            </div>
            <div>
              <div style="display:flex; flex-wrap: wrap" v-if="isiv25_10mlEnabled">
                <i v-if="onlyOneEnabled">Ampulle&nbsp;</i>
                <ns-package inline :package="iv25_10ml" v-else></ns-package>
                <b>2ml abziehen</b>,
                <p v-if="onlyOneEnabled">dann <b>auf 5ml</b> aufziehen.</p>
                <p v-else style="margin-left: 1.2rem">dann <b>auf 5ml</b> aufziehen.</p>
              </div>
            </div>
            <p>
              <text-mono>0,5ml</text-mono> entspricht jetzt <i>der Zieldosis</i> <br>
              pro <text-mono>10kgKG</text-mono>.
            </p>
            <hr>
            <h2>Initialdosis</h2>
            <p>Zieldosis auf Spritze <i>markieren</i>.</p>
            <p>Die <b>Hälfte</b> der Zieldosis geben.</p>
            <hr>
            <h2>Repetition</h2>
            <p>
              Nach <text-underline>4 Minuten</text-underline> Wartezeit die <br>
              andere <b>Hälfte</b> geben.
            </p>
          </template>
        </ns-dosage-usage>

        <!-- <ns-dosage-usage type="supp" v-if="anySuppEnabled">
          <div v-if="isSupp70Enabled">
            <ns-dosage :dosage="{ dose: '70mg', hint: '(Zäpfchen)', target: '> 14kg', color: 'green' }"></ns-dosage>
            <ns-dosage v-if="isSupp40Enabled" :dosage="{ dose: '40mg', hint: '(Zäpfchen)', target: '> 6kg', color: 'red' }"></ns-dosage>
          </div>
          <ns-dosage v-if="isSupp40Enabled" :dosage="{ dose: '40mg', hint: '(Zäpfchen)', type: 'child' }"></ns-dosage>
        </ns-dosage-usage>-->
      </ns-dosage-indication>

    </ns-content-group>

    <ns-pharmacokinetics
      onset="<case>i.v.</case>30s|<case>i.m.</case>2-5 Minuten"
      duration="10-15min">
    </ns-pharmacokinetics>

    <ns-pharmacodynamics>
      <p>
        Esketamin hat eine schwache agonisitsche <i>Wirkung an Opiodrezeptoren</i>. Vorrangig beruht die analgetische Wirkung aber auf der <i>Hemmung der NMDA-Rezeptoren</i>.
      </p>
      <p>
        Das verhindet, dass der Neurotransmitter Glutamat seine Wirkung entfaltet. Dadurch wird die synaptische Kommunikation unterbrochen. <br>
        Die Unterbrechung der normalen Informationsverarbeitung führt dazu, dass die Verarbeitung emotionaler, kognitiver und sensorischer Signale gestört wird. Das <i>Bewusstsein dissoziiert</i>, der Patient fühlt sich von seiner Umgebung abgekoppelt.
      </p>
      <p>
        Auch von <b>Schmerzreizen</b>.
      </p>
      <p>
        Durch eine Hemmung der Katecholaminwiederaufnahme und Verstärkung der Katecholamineffekte kommt es zu einer ausgeprägten <i>Stimulation des Herz-Kreislauf-Systems</i>.
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
import TextColored from '@/components/TextColored.vue'
import TextMono from '@/components/TextMono.vue'
import TextUnderline from '@/components/TextUnderline.vue'

import imgLongQt from '@/data/assets/long-qt.png'
import { arrowForwardOutline } from 'ionicons/icons'

const props = defineProps<{
  medication: Medication,
}>()

const iv5_5ml = computed(() => props.medication.packages['iv-5mg-ml--5ml'])
const iv25_2ml = computed(() => props.medication.packages['iv-25mg-ml--2ml'])
const iv25_10ml = computed(() => props.medication.packages['iv-25mg-ml--10ml'])

const isiv5_5mlEnabled = computed(() => true)
const isiv25_2mlEnabled = computed(() => true)
const isiv25_10mlEnabled = computed(() => true)
const onlyOneEnabled = computed(() => [ isiv5_5mlEnabled.value, isiv25_2mlEnabled.value, isiv25_10mlEnabled.value ].filter(Boolean).length === 1)

const onlySAA = computed(() => false) /* TODO: onlySAA-Trigger */

</script>

<style lang="css" scoped>

</style>