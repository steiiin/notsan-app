<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Medikamente</ion-title>
        <ion-buttons slot="end">
          <!-- <ion-button fill="clear" @click="showSearch">
            <ion-icon :icon="searchOutline" slot="icon-only" />
          </ion-button> -->
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar ref="searchBarInput" v-model="searchTerm"
          placeholder="Suchen" :animated="true" :debounce="200">
        </ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" ref="mycontent">
      <template v-if="filteredMedications.length">
        <NsContentListContainer :items="filteredMedications" />
      </template>
      <div v-else class="empty-state">
        <ion-icon :icon="searchOutline" />
        <ion-text>Keine Medikamente gefunden.</ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { IonPage, IonHeader, IonToolbar, IonIcon, IonTitle, IonContent, IonButtons, IonButton, IonSearchbar, IonText, onIonViewWillEnter } from '@ionic/vue';

import { useContentStore } from '@/stores/content'
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'

import NsContentListContainer from '@/components/NsContentListContainer.vue';

import { closeOutline, searchOutline } from 'ionicons/icons'
import { gainFocus } from '@/service/input';

const content = useContentStore()

const medications = computed(() => content.getMedications.map(i => ({ ...i, path: `/tabs/meds/${i.id}` })) )

// #region Search

  const searchTerm = ref('')
  const filteredMedications = computed(() => {
    const term = searchTerm.value.trim().toLowerCase()
    if (!term) {
      return medications.value
    }
    return medications.value.filter(item => {
      const title = item.title.toLowerCase()
      const subtitle = item.subtitle?.toLowerCase() ?? ''
      return title.includes(term) || subtitle.includes(term)
    })
  })

// #endregion
// #region ScrollPosition

  const mycontent = ref<{ $el: HTMLIonContentElement } | null>(null);
  const scrollPos = ref<number>(0);

  const router = useRouter()
  router.afterEach(async (to, from) => {
    if (!mycontent || !mycontent.value) { return }

    if (to.fullPath.includes('meds') && from.fullPath.includes('meds'))
    {
      if (to.fullPath.length > from.fullPath.length)
      {
        mycontent.value.$el.getScrollElement().then(el => {
          scrollPos.value = el.scrollTop
        })
      }
    }
  })

  onIonViewWillEnter(() => {
    if (!mycontent || !mycontent.value) { return }
    mycontent.value.$el.scrollToPoint(0, scrollPos.value, 400);
  })

// #endregion

</script>

<style scoped>
.empty-state {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--ion-color-medium);
}

.empty-state ion-icon {
  font-size: 2.5rem;
}
</style>

