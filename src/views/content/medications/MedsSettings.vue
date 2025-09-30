<template>
  <ion-modal :is-open="modelValue" @didDismiss="closeSettings">
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>Einstellungen</ion-title>
          <ion-buttons slot="end">
            <ion-button fill="clear" @click="closeSettings">
              <ion-icon :icon="closeOutline" slot="icon-only" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-text color="medium">
          Weitere Einstellungen werden hier in Zukunft verfügbar sein.
        </ion-text>
      </ion-content>
    </ion-page>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonModal,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonText
} from '@ionic/vue';
import { closeOutline } from 'ionicons/icons'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void,
  (e: 'closed'): void
}>()

const closeSettings = () => {
  emit('update:modelValue', false)
  emit('closed')
}

</script>
