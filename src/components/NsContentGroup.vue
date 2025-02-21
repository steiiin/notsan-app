<template>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>{{ title }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content class="ns-content-group">
      <slot></slot>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent } from '@ionic/vue'
defineProps<{
  title: string,
}>()
</script>

<style lang="css" scoped>
.ns-content-group
{
  font-size: 0.9rem;
  color: var(--ion-color-dark);
}
</style>
