<template>
  <ion-page ref="pageRef">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button @click="back"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ medication?.title ?? 'Medikament' }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <component v-if="medicationComponent" :is="medicationComponent" />
      <ns-empty-state v-else label="Medikament" :id="medId"></ns-empty-state>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue'
import NsEmptyState from '@/components/NsEmptyState.vue'

import { useContentStore } from '@/stores/content'
import { computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  medId: string
}>()

const router = useRouter()
const content = useContentStore()

const medication = computed(() => content.findMedicationById(props.medId))
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