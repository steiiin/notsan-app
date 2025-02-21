<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="meds" href="/tabs/meds">
          <ion-icon aria-hidden="true" :icon="medkit" />
          <ion-label>Medikamente</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="lib" href="/tabs/lib">
          <ion-icon aria-hidden="true" :icon="library" />
          <ion-label>Wissen</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="calc" href="/tabs/calc">
          <ion-icon aria-hidden="true" :icon="calculator" />
          <ion-label>Rechner</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="emerg" href="/tabs/emerg" class="emergButton">
          <ion-icon aria-hidden="true" :icon="warning" />
          <ion-label>Notfall</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { medkit, library, calculator, warning } from 'ionicons/icons';
</script>

<style lang="css" scoped>

.emergButton {
  --color: var(--ion-color-danger);
  --color-selected: var(--ion-color-warning-shade);
}

</style>