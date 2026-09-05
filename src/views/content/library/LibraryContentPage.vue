<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="defaultHref"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ entry?.title ?? 'Wissen' }}</ion-title>
        <ns-modified :datetime="modified"></ns-modified>
      </ion-toolbar>
    </ion-header>
    <ion-content ref="mycontent">
      <component v-if="entryComponent" :is="entryComponent" />
      <ns-empty-state v-else label="Eintrag" :id="entryId"></ns-empty-state>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { computed, defineAsyncComponent } from 'vue'
import NsEmptyState from '@/components/NsEmptyState.vue';
import NsModified from '@/components/NsModified.vue';
import { useContentStore } from '@/stores/content'
import { useRoute } from 'vue-router'
import { getContentModified } from '@/service/version'

const props = defineProps<{
  entryId: string
  listId?: string
}>()

const content = useContentStore()
const route = useRoute()
const modified = computed(() => getContentModified(route.path))

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

</style>
