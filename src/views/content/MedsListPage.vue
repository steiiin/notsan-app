<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Medikamenten</ion-title>
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
import { ref, computed } from 'vue'
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

const fuzzyMatchScore = (query: string, text: string): number => {
  const normalizedQuery = query.trim().toLowerCase()
  const normalizedText = text.trim().toLowerCase()

  if (!normalizedQuery || !normalizedText) {
    return -Infinity
  }

  // exact substring gets highest ranking
  const directMatchIndex = normalizedText.indexOf(normalizedQuery)
  if (directMatchIndex >= 0) {
    return 1000 - directMatchIndex
  }

  // subsequence fallback (characters in order, not necessarily contiguous)
  let queryIndex = 0
  let textIndex = 0
  let matchedChars = 0
  let firstMatchIndex = -1
  let previousMatchIndex = -1
  let gaps = 0

  while (queryIndex < normalizedQuery.length && textIndex < normalizedText.length) {
    if (normalizedQuery[queryIndex] === normalizedText[textIndex]) {
      matchedChars++
      if (firstMatchIndex === -1) {
        firstMatchIndex = textIndex
      }
      if (previousMatchIndex >= 0) {
        gaps += textIndex - previousMatchIndex - 1
      }
      previousMatchIndex = textIndex
      queryIndex++
    }
    textIndex++
  }

  if (queryIndex < normalizedQuery.length) {
    return -Infinity
  }

  // higher score for more compact and early matches
  return 500 - firstMatchIndex - gaps - (normalizedText.length - matchedChars) * 0.1
}

const filteredMedications = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  if (!term) {
    return medications.value
  }

  return medications.value
    .map(item => {
      const titleScore = fuzzyMatchScore(term, item.title)
      const subtitleScore = fuzzyMatchScore(term, item.subtitle ?? '')
      return {
        item,
        score: Math.max(titleScore, subtitleScore),
      }
    })
    .filter(({ score }) => score > -Infinity)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .map(({ item }) => item)
})

// ############################################################################

const settingsVisible = ref(false)
const openSettings = () => settingsVisible.value = true

// ############################################################################

const mycontent = ref<{ $el: HTMLIonContentElement } | null>(null);
const scrollPos = ref<number>(0);

const router = useRouter()
router.afterEach(async (to, from) => {
  if (!mycontent.value) { return }

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
  if (!mycontent.value) { return }
  scrollTo(mycontent, scrollPos.value)
})

</script>
