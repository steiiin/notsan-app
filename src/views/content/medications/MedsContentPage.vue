<template>
  <ion-page ref="pageRef">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/meds"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ medication?.title ?? 'Medikament' }}</ion-title>
        <ns-modified :datetime="modified"></ns-modified>
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
import NsModified from '@/components/NsModified.vue';

import { useContentStore } from '@/stores/content'
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { getContentModified } from '@/service/version'

const props = defineProps<{
  medId: string
}>()

const content = useContentStore()
const route = useRoute()
const modified = computed(() => getContentModified(route.path))

const medication = computed(() => content.findMedicationById(props.medId))
const medicationComponent = computed(() => {
  if (medication.value && medication.value.component) {
    return defineAsyncComponent(medication.value.component);
  }
  return null;
})

</script>
