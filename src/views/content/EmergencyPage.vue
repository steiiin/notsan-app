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

      <ion-accordion-group :animated="false">
        <ion-accordion value="reanimation">
          <ion-item slot="header" color="danger">
            <ion-label>Reanimation</ion-label>
          </ion-item>
          <div id="ns-content-bg" slot="content">

            <ns-content-group title="hallo">
              Hallo
            </ns-content-group>
            <ns-content-group title="hallo">
              Hallo
            </ns-content-group>

          </div>
        </ion-accordion>
        <ion-accordion value="second">
          <ion-item slot="header" color="light" style="margin-top: 1rem;">
            <ion-label>Second Accordion</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">Second Content</div>
        </ion-accordion>
        <ion-accordion value="third">
          <ion-item slot="header" color="light">
            <ion-label>Third Accordion</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">Third Content</div>
        </ion-accordion>
      </ion-accordion-group>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter } from '@ionic/vue';

import { watchOutline, female } from 'ionicons/icons'

import NsPatientInput from './emergency/NsPatientInput.vue';
import NsPatientInfo from './emergency/NsPatientInfo.vue';

import { useContentStore } from '@/stores/content'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import NsContentGroup from '@/components/NsContentGroup.vue';
import NsContentListContainer from '@/components/NsContentListContainer.vue';
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