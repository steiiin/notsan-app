<template>
  <ns-content-group title="Pharmakokinetik" v-if="!!onset || !!duration">
      <ion-grid class="ns-pharmacokin">
        <ion-row v-if="!!onset">
          <ion-col class="labelcolumn">
            <ion-icon :icon="stopwatchOutline"></ion-icon>
            <span class="label">Wirkeintritt:</span>
          </ion-col>
          <ion-col>{{ onset }}</ion-col>
        </ion-row>
        <ion-row v-if="!!duration">
          <ion-col class="labelcolumn">
            <ion-icon :icon="timer"></ion-icon>
            <span class="label">Wirkdauer:</span>
          </ion-col>
          <ion-col>{{ duration }}</ion-col>
        </ion-row>
      </ion-grid>
    </ns-content-group>
</template>

<script setup lang="ts">
import { IonIcon, IonGrid, IonCol, IonRow } from '@ionic/vue';
import { stopwatchOutline, timer } from 'ionicons/icons';
import NsContentGroup from '@/components/NsContentGroup.vue'
defineProps<{
  onset?: string,
  duration?: string,
}>()
</script>

<style lang="css" scoped>
.ns-pharmacokin ion-col
{
  display: flex;
  align-items: center;
  gap: .3rem;
}
.ns-pharmacokin ion-icon
{
  font-size: 1.5rem;
}
.ns-pharmacokin .labelcolumn
{
  max-width: 15rem;
}
.ns-pharmacokin .label
{
  font-weight: bold;
}
</style>
