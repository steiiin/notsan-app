<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Wissen</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" ref="mycontent">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Wissen</ion-title>
        </ion-toolbar>
      </ion-header>
      <NsContentListContainer :items="items" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import NsContentListContainer from '@/components/NsContentListContainer.vue'
import { useContentStore } from '@/stores/content'

const content = useContentStore()

const items = computed(() =>
  content.getLibraryItems.map(item => {
    if ('entries' in item) {
      return { ...item, path: `/tabs/lib/list/${item.id}` }
    }
    return { ...item, path: `/tabs/lib/entry/${item.id}` }
  })
)

const mycontent = ref<{ $el: HTMLIonContentElement } | null>(null)
const scrollPos = ref<number>(0)

const router = useRouter()
router.afterEach(async (to, from) => {
  if (!mycontent.value) { return }

  if (to.fullPath.includes('lib') && from.fullPath.includes('lib')) {
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
