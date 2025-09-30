<template>
  <ion-page ref="pageRef">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button @click="back"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ medication?.title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" @click="openSettings">
            <ion-icon :icon="settingsOutline" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <component v-if="medicationComponent" :is="medicationComponent" :medication="medication" />
    </ion-content>
    <ion-modal
      :is-open="isSettingsOpen"
      :presenting-element="presentingElement"
      @didDismiss="closeSettings"
    >
      <MedsSettings @close="closeSettings" />
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonModal
} from '@ionic/vue';
import { useContentStore } from '@/stores/content'
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { settingsOutline } from 'ionicons/icons'
import MedsSettings from './MedsSettings.vue'

const route = useRoute()
const router = useRouter()
const content = useContentStore()

const pageRef = ref<{ $el: HTMLElement } | null>(null)
const medicationId = ref(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id)
const medication = ref(content.findMedicationById(medicationId.value))

const medicationComponent = computed(() => {
  if (medication.value && medication.value.component) {
    return defineAsyncComponent(medication.value.component);
  }
  return null;
})

const presentingElement = computed(() => pageRef.value?.$el)
const isSettingsOpen = ref(false)

const openSettings = () => {
  isSettingsOpen.value = true
}

const closeSettings = () => {
  isSettingsOpen.value = false
}

const back = () => {
  router.back()
}

</script>