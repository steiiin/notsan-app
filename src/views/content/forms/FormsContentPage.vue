<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="defaultHref"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ entry?.title ?? 'Wissen' }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <component v-if="entryComponent" :is="entryComponent" />
      <ns-empty-state v-else label="Formular" :id="entryId"></ns-empty-state>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { computed, defineAsyncComponent } from 'vue'
import NsEmptyState from '@/components/NsEmptyState.vue';
import { useContentStore } from '@/stores/content'

const props = defineProps<{
  entryId: string
  listId?: string
}>()

const content = useContentStore()

const entry = computed(() => {
  if (props.listId) {
    return content.findFormEntryInList(props.listId, props.entryId)
  }
  return content.findFormEntryById(props.entryId)
})

const entryComponent = computed(() => {
  if (entry.value && entry.value.component) {
    return defineAsyncComponent(entry.value.component)
  }
  return null
})

const defaultHref = computed(() => {
  if (props.listId) {
    return `/tabs/forms/list/${props.listId}`
  }
  return '/tabs/forms'
})
</script>

<style scoped>

</style>
