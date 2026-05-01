<template>
  <ns-content-group>
    <ns-text-content>
      <p>
        Präklinische Geburt vor Ort.
      </p>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group title="Vorbereitung">
    <ns-text-content>
      <ul>
        <li>Anlage <b>pVK</b></li>
        <li>Ausreichende <b>Raumtemperatur</b> beachten</li>
        <li><b>Ruhige Atmosphäre</b> schaffen</li>
        <li><b>Gebärende</b> nicht mehr laufen lassen</li>
      </ul>
      <hr>
      <ul>
        <li>Lagerung mit <i>leicht erhöhtem Oberkörper</i> und <br><i>angewinkelten, gespreizten</i> Beinen</li>
        <li>Handtücher bereitlegen</li>
        <li>Sterile Unterlage vorlegen <i>(z.B. Brandwundentuch)</i></li>
        <li>Kompressen, 2 Nabelklemmen + sterile Schere bereitlegen</li>
      </ul>
    </ns-text-content>
  </ns-content-group>
  <ns-content-group title="Geburt">
    <ns-text-content>
      <h2><text-mono>1.</text-mono> Führendes Kindsteil</h2>
      <ul>
        <li>Dammschutz und Führung bei Durchgleiten des Kopfes.</li>
        <li>Nach Entwicklung des Kopfes sofortiger Ausschluss einer Umschlingung der Nabelschnur am Kopf.</li>
      </ul>
      <!-- TODO: Arm zuerst -->
      <!-- TODO: Nabelschnurumschlingung -->
      <hr>
      <h2><text-mono>2.</text-mono> Kindlicher Körper</h2>
      <ul>
        <li>Vordere Schulter unter Senkung des Kopfes entwickeln, bis Oberarmmitte sichtbar ist.</li>
        <li>Hintere Schulter unter Anheben des Kopfes <b>ohne</b> Zug entwickeln.</li>
      </ul>
      <hr>
      <text-colored red><b>Nicht am Kind ziehen.</b></text-colored>
    </ns-text-content>
  </ns-content-group>
</template>

<script setup lang="ts">
import NsSvg from '@/components/NsSvg.vue'
import NsContentGroup from '@/components/NsContentGroup.vue'
import NsTextContent from '@/components/NsTextContent.vue'
import TextUnderline from '@/components/TextUnderline.vue'
import TextMono from '@/components/TextMono.vue'
import TextColored from '@/components/TextColored.vue'

</script>
<style scoped>

</style>
