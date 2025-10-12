<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/lib" />
        </ion-buttons>
        <ion-title>{{ list?.title ?? 'Wissen' }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" ref="mycontent">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ list?.title ?? 'Wissen' }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <NsContentListContainer v-if="entries.length" :items="entries" />
      <ns-empty-state v-else label="Liste" :key="id"></ns-empty-state>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import NsContentListContainer from '@/components/NsContentListContainer.vue'
import NsEmptyState from '@/components/NsEmptyState.vue'
import { useContentStore } from '@/stores/content'

const props = defineProps<{ id: string }>()

const content = useContentStore()

const list = computed(() => content.findLibraryListById(props.id))

const entries = computed(() => {
  if (!list.value) { return [] }
  return list.value.entries.map(entry => ({
    ...entry,
    path: `/tabs/lib/list/${list.value?.id}/${entry.id}`
  }))
})

const mycontent = ref<{ $el: HTMLIonContentElement } | null>(null)
const scrollPos = ref<number>(0)

const router = useRouter()
router.afterEach(async (to, from) => {
  if (!mycontent.value) { return }

  if (to.fullPath.includes('lib/list') && from.fullPath.includes('lib/list')) {
    if (to.fullPath.length > from.fullPath.length) {
      mycontent.value.$el.getScrollElement().then(el => {
        scrollPos.value = el.scrollTop
      })
    }
  }
})

onIonViewWillEnter(() => {
  if (!mycontent.value) { return }
  mycontent.value.$el.scrollToPoint(0, scrollPos.value, 400)
})
</script>

<style scoped>
.empty-state {
  padding: 16px;
  text-align: center;
  color: var(--ion-color-medium);
}
</style>
