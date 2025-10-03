<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        Alternativer Applikationsweg, wenn <br>
        kein <b>i.v.-Zugang</b> innerhalb <text-underline>2min</text-underline> möglich.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group title="Grundlagen">
    <ns-text-content>
      <p>
        Um gute Durchflussrate zu erreichen, ist eine <b>Druckinfusionsmanschette</b> obligatorisch.
      </p>
      <p>
        Nach Medikamentengabe immer mit <text-underline>NaCl</text-underline> nachspülen.
      </p>
      <p>
        Bei Erwachsenen 40mg Lidocain möglich, <br>
        Bei Kindern <b>nicht empfohlen</b>.
      </p>
      <hr>
      <p>
        <b>Kontraindiziert</b>, bei Fraktur proximal.
      </p>
      <p>
        <b>Kontraindiziert</b>, wenn letzte <text-underline>48h</text-underline> bereits <b>i.O.-Zugang</b> im selben Knochen gelegt war.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group title="Nadelgröße">
    <ns-text-content>
      <ul>
        <li head>Rosa: <i>Tibia Kind</i></li>
        <li head>Rosa: <i>Tibia Erwachsene</i></li>
        <li head>Rosa: <i>Humerus Erwachsene</i></li>
      </ul>
      <hr>
      <p>
        Nach <b>Einstechen</b> muss die oberste Markierung erkennbar sein. <i>(ca. 5mm)</i>
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group title="Durchführung">
    <ns-text-content>
      <p>
        <b><text-mono>1. </text-mono></b>20ml-Spritze mit NaCl aufziehen, Dreiwegehahn entlüften
      </p>
      <p>
        <b><text-mono>2. </text-mono></b>Punktionsstelle lokalisieren, Extremität stabilisieren
      </p>
      <p>
        <b><text-mono>3. </text-mono></b>Nadel einstechen, Tiefe kontrollieren
      </p>
      <p>
        <b><text-mono>4. </text-mono></b>Unter leichtem Druck bohren, bis Widerstand nachlässt
      </p>
      <p>
        <b><text-mono>5. </text-mono></b>Kanüle festhalten, Mandrin ausdrehen
      </p>
      <p>
        <b><text-mono>6. </text-mono></b>Stabilizer aufkleben
      </p>
      <p>
        <b><text-mono>7. </text-mono></b>Dreiwegehahn aufschrauben
      </p>
      <p>
        <b><text-mono>8. </text-mono></b>5-10ml NaCl anspülen
      </p>
    </ns-text-content>
  </ns-content-group>

  <ns-content-group title="Proximale Tibia">
    <ns-text-content>
      <h2>Erste Wahl</h2>
      <p>
        Nach Tasten der <text-underline>Tuberositas tibiae</text-underline> <i>(Höcker unterhalb Kniescheibe)</i> 1-2cm medial.
      </p>
      <p>
        Bei Kindern ca. 1-2cm distal des <text-underline>Erwachsenen</text-underline>-Punktionsortes. <br>
        <i>(Zur Schonung der Wachstumsfuge)</i>
      </p>
      <ns-svg :svg="ort_proxtibia"></ns-svg>
    </ns-text-content>
  </ns-content-group>

  <ns-content-group title="Distale Tibia">
    <ns-text-content>
      <h2>Zweite Wahl</h2>
      <p>
        Nach Tasten des <text-underline>Malleolus medialis</text-underline> <i>(Innenknöchel)</i> 1-2cm proximal.
      </p>
      <p>
        In dieser Höhe mittig in die Tibia bohren.
      </p>
      <ns-svg :svg="ort_disttibia"></ns-svg>
    </ns-text-content>
  </ns-content-group>

  <ns-content-group title="Distale Tibia">
    <ns-text-content>
      <h2>Dritte Wahl (Kinder)</h2>
      <p>
        2cm oberhalb der <text-underline>Patella</text-underline> mittig in den <text-underline>Femur</text-underline>.
      </p>
      <ns-svg :svg="ort_distfemur"></ns-svg>
    </ns-text-content>
  </ns-content-group>

</template>

<script setup lang="ts">
import NsSvg from '@/components/NsSvg.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import TextUnderline from '@/components/TextUnderline.vue'
import TextMono from '@/components/TextMono.vue'

import ort_proxtibia from './ort-proxtibia.svg?raw'
import ort_disttibia from './ort-disttibia.svg?raw'
import ort_distfemur from './ort-distfemur.svg?raw'

</script>
<style scoped>

</style>
