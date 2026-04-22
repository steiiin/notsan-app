<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Medikamente</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" @click="openSettings">
            <ion-icon :icon="settingsOutline" slot="icon-only" />
          </ion-button>
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
      <ns-empty-state v-else label="Medikamente"></ns-empty-state>
    </ion-content>
    <meds-settings v-model="settingsVisible"></meds-settings>
  </ion-page>
</template>

<script setup lang="ts">

import { IonPage, IonHeader, IonToolbar, IonIcon, IonTitle, IonContent, IonButtons, IonButton, IonSearchbar, onIonViewWillEnter } from '@ionic/vue'

// ############################################################################

import { useContentStore } from '@/stores/content'
import { useConfigStore } from '@/stores/config'
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'

// ############################################################################

import NsContentListContainer from '@/components/NsContentListContainer.vue'
import NsEmptyState from '@/components/NsEmptyState.vue'
import MedsSettings from './medications/MedsSettings.vue'
import { settingsOutline } from 'ionicons/icons'
import { scrollTo } from '@/service/input'

// ############################################################################

const content = useContentStore()
const config = useConfigStore()

const medications = computed(() =>
  content.medications
    .filter((medication) => config.checkMedicationEnabled(medication.id))
    .map(i => ({ ...i, path: `/tabs/meds/${i.id}` })),
)

// ############################################################################

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

// ############################################################################

const settingsVisible = ref(false)
const openSettings = () => settingsVisible.value = true

// ############################################################################

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
  else
  {
    // reset search&scroll after switching tab
    searchTerm.value = ''
    scrollPos.value = 0
  }

})

onIonViewWillEnter(async () => {
  if (!mycontent || !mycontent.value) { return }
  scrollTo(mycontent, scrollPos.value)
})

</script>
