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

      <ns-patient-input v-model="currentPatient"></ns-patient-input>
      <ns-patient-info :patient="currentPatient"></ns-patient-info>

      <ns-accordion-group v-if="currentPatient.isValid">
        <ns-accordion title="Reanimation">

          <content-defibrillation :patient="currentPatient"></content-defibrillation>

        </ns-accordion>
      </ns-accordion-group>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter } from '@ionic/vue';

import { watchOutline, female } from 'ionicons/icons'

import NsPatientInput from '../../components/emergency/NsPatientInput.vue';
import NsPatientInfo from '../../components/emergency/NsPatientInfo.vue';

import { useContentStore } from '@/stores/content'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import NsContentGroup from '@/components/NsContentGroup.vue';
import NsAccordionGroup from '@/components/NsAccordionGroup.vue';
import NsAccordion from '@/components/NsAccordion.vue';

import ContentDefibrillation from './emergency/reanimation/ContentDefibrillation.vue';

import { Patient } from '@/types/emergency';

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

// #region Patient

  const currentPatient = ref<Patient>(new Patient())

// #endregion

</script>