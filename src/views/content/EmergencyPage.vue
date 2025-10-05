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

      <content-standards
        :patient="currentPatient">
      </content-standards>

      <template v-if="currentPatient.isValid">

        <content-reanimation
          :patient="currentPatient">
        </content-reanimation>

        <content-anaphylaxie
          :patient="currentPatient">
        </content-anaphylaxie>

      </template>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter } from '@ionic/vue';

import NsPatientInput from '../../components/emergency/NsPatientInput.vue';
import NsPatientInfo from '../../components/emergency/NsPatientInfo.vue';

import { computed, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

import ContentStandards from './emergency/standards/ContentStandards.vue';
import ContentReanimation from './emergency/reanimation/ContentReanimation.vue';
import ContentAnaphylaxie from './emergency/anaphylaxie/ContentAnaphylaxie.vue';

import { Patient } from '@/types/emergency';

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

  const currentPatientRef = shallowRef(new Patient())
  const currentPatient = computed({
    get: () => currentPatientRef.value,
    set: (value: Patient) => { currentPatientRef.value = value },
  })

// #endregion

</script>