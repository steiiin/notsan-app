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
      <div v-else class="empty-state">
        <p>Der gewünschte Inhalt konnte nicht gefunden werden.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { computed, defineAsyncComponent } from 'vue'

import { useContentStore } from '@/stores/content'

const props = defineProps<{
  entryId: string
  listId?: string
}>()

const content = useContentStore()

const entry = computed(() => {
  if (props.listId) {
    return content.findLibraryEntryInList(props.listId, props.entryId)
  }
  return content.findLibraryEntryById(props.entryId)
})

const entryComponent = computed(() => {
  if (entry.value && entry.value.component) {
    return defineAsyncComponent(entry.value.component)
  }
  return null
})

const defaultHref = computed(() => {
  if (props.listId) {
    return `/tabs/lib/list/${props.listId}`
  }
  return '/tabs/lib'
})
</script>

<style scoped>
.empty-state {
  padding: 16px;
  text-align: center;
  color: var(--ion-color-medium);
}
</style>
