<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button @click="back"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ medication?.title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <component v-if="medicationComponent" :is="medicationComponent" :medication="medication" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
import { useContentStore } from '@/stores/content'
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const content = useContentStore()

const medicationId = ref(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id)
const medication = ref(content.findMedicationById(medicationId.value))

const medicationComponent = computed(() => {
  if (medication.value && medication.value.component) {
    return defineAsyncComponent(medication.value.component);
  }
  return null;
})

const back = () => {
  router.back()
}

</script>