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

        <ion-accordion-group ref="accordionGroup">
          <content-reanimation></content-reanimation>
          <content-anaphylaxie></content-anaphylaxie>
          <content-krampfanfall></content-krampfanfall>
          <content-schmerzen></content-schmerzen>
          <content-luftnot></content-luftnot>
          <content-sonstige></content-sonstige>
        </ion-accordion-group>

      </template>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAccordionGroup, onIonViewDidEnter } from '@ionic/vue'
import NsPatientInput from '../../components/emergency/NsPatientInput.vue'
import NsPatientInfo from '../../components/emergency/NsPatientInfo.vue'
import { useRoute, useRouter } from 'vue-router'
import { nextTick, ref, watch } from 'vue'

// ############################################################################

import { usePatientStore } from '@/stores/patient'
const patient = usePatientStore()

// ############################################################################

import ContentStandards from './emergency/standards/ContentStandards.vue'
import ContentReanimation from './emergency/reanimation/ContentReanimation.vue'
import ContentAnaphylaxie from './emergency/anaphylaxie/ContentAnaphylaxie.vue'
import ContentKrampfanfall from './emergency/krampfanfall/ContentKrampfanfall.vue'
import ContentSchmerzen from './emergency/schmerzen/ContentSchmerzen.vue'
import ContentLuftnot from './emergency/luftnot/ContentLuftnot.vue'
import ContentSonstige from './emergency/sonstige/ContentSonstige.vue'

// ############################################################################

const router = useRouter()
const route = useRoute()
router.afterEach(async (to, from) => {

  if (to.fullPath.includes('emergency') && !to.hash)
  {
    patient.resetPatient()
  }
})

onIonViewDidEnter(() => {
  handleEmergencyAnchor()
})

watch(() => route.hash, () => {
  handleEmergencyAnchor()
})

// ############################################################################

const mycontent = ref<any|null>(null)
const accordionGroup = ref<any|null>(null)

async function handleEmergencyAnchor() {

  const anchor = route.hash.replace(/^#/, '')
  if (!anchor) return

  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 100))

  // get elements
  const anchorElements = document.querySelectorAll('ion-card.ns-content-group[id=sepsis]')
  if (anchorElements.length !== 1) { console.warn(`anchor: no card with id ${anchor} found.`); return }

  const anchorElement = anchorElements[0]
  const accordionElement = anchorElement.closest('ion-accordion')
  if (!accordionElement) { console.warn(`anchor: no accordion element as parent for card with id ${anchor} found.`); return }

  // open accordion
  accordionGroup.value.$el.value = accordionElement.value

  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 100))

  // scroll & highlight
  await scrollToAccordion(accordionElement)
  highlightElement(anchorElement)

}

async function scrollToAccordion(accordion: HTMLElement) {
  if (!mycontent.value) { return }

  const scrollEl = await mycontent.value.$el.getScrollElement()
  const accordionRect = accordion.getBoundingClientRect()
  const scrollRect = scrollEl.getBoundingClientRect()
  const targetTop = scrollEl.scrollTop + accordionRect.top - scrollRect.top - 12

  await mycontent.value.$el.scrollToPoint(0, Math.max(targetTop, 0), 450)
}

function highlightElement(el: Element) {
  el.classList.add('emergency-anchor-highlight')
  setTimeout(() => el.classList.remove('emergency-anchor-highlight'), 2000)
}

</script>

<style lang="css" scoped>

:deep(.emergency-anchor-highlight) {
  animation: emergency-anchor-flicker 2s infinite;
}

@keyframes emergency-anchor-flicker {

  /* idle */
  0%   { background-color: transparent; }

  /* first bop */
  10%  { background-color: rgba(var(--ion-color-warning-rgb), 0.6); }
  20%  { background-color: transparent; }

  /* second bop (slightly stronger or same) */
  30%  { background-color: rgba(var(--ion-color-warning-rgb), 0.6); }
  40%  { background-color: transparent; }

  /* long rest */
  100% { background-color: transparent; }

}

</style>
