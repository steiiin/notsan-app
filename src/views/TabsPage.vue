<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="meds" href="/tabs/meds" @click="openMeds">
          <ion-icon aria-hidden="true" :icon="medkit" />
          <ion-label>Medikamente</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="lib" href="/tabs/lib" @click="openLibrary">
          <ion-icon aria-hidden="true" :icon="library" />
          <ion-label>Wissen</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="calc" href="/tabs/forms" @click="openForms">
          <ion-icon aria-hidden="true" :icon="calculator" />
          <ion-label>Rechner</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="emerg" href="/tabs/emergency" class="emergButton">
          <ion-icon aria-hidden="true" :icon="warning" />
          <ion-label>Notfall</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
<script setup lang="ts">

import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, useIonRouter } from '@ionic/vue'
import { medkit, library, calculator, warning } from 'ionicons/icons'

const ionRouter = useIonRouter()

const openMeds = () => {
  ionRouter.navigate('/tabs/meds', 'root', 'replace')
}
const openLibrary = () => {
  ionRouter.navigate('/tabs/lib', 'root', 'replace')
}
const openForms = () => {
  ionRouter.navigate('/tabs/forms', 'root', 'replace')
}

</script>
<style lang="css" scoped>

.emergButton {
  --color-selected: var(--ion-color-danger);
}

</style>
