<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Notfall</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" ref="mycontent">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Notfall</ion-title>
        </ion-toolbar>
      </ion-header>

      <ns-patient-input></ns-patient-input>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { IonPage, IonHeader, IonToolbar, IonIcon, IonTitle, IonContent, onIonViewWillEnter } from '@ionic/vue';

import NsContentGroup from '@/components/NsContentGroup.vue';
import NsPatientInput from './emergency/NsPatientInput.vue';

import { useContentStore } from '@/stores/content'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import NsContentListContainer from '@/components/NsContentListContainer.vue';

const content = useContentStore()

const medications = computed(() => content.getMedications.map(i => ({ ...i, path: `/tabs/meds/${i.id}` })) )

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