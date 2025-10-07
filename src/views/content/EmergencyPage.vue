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

      <template v-if="patient.hasResult">

        <ns-patient-info></ns-patient-info>

        <content-standards></content-standards>

        <content-reanimation></content-reanimation>
        <content-anaphylaxie></content-anaphylaxie>
        <content-krampfanfall></content-krampfanfall>
        <content-schmerzen></content-schmerzen>
        <content-luftnot></content-luftnot>
        <content-sonstige></content-sonstige>

      </template>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter } from '@ionic/vue';

import NsPatientInput from '../../components/emergency/NsPatientInput.vue';
import NsPatientInfo from '../../components/emergency/NsPatientInfo.vue';

import { usePatientStore } from '@/stores/patient';
const patient = usePatientStore()

import { useRouter } from 'vue-router'

import ContentStandards from './emergency/standards/ContentStandards.vue';
import ContentReanimation from './emergency/reanimation/ContentReanimation.vue';
import ContentAnaphylaxie from './emergency/anaphylaxie/ContentAnaphylaxie.vue';
import ContentKrampfanfall from './emergency/krampfanfall/ContentKrampfanfall.vue';
import ContentSchmerzen from './emergency/schmerzen/ContentSchmerzen.vue';
import ContentLuftnot from './emergency/luftnot/ContentLuftnot.vue';
import ContentSonstige from './emergency/sonstige/ContentSonstige.vue';

// #region ScrollPosition

  const router = useRouter()
  router.afterEach(async (to, from) => {

    if (to.fullPath.includes('emergency'))
    {
      patient.resetPatient()
    }
  })

// #endregion

</script>