<template>
  <ion-card class="ns-content-group">
    <ion-card-header v-if="title">
      <ion-card-title>{{ title }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <slot></slot>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue'
defineProps<{
  title?: string,
}>()
</script>

<style lang="css" scoped>

.ns-content-group ion-card-header
{
  padding-inline: var(--ns-card-padding);
  padding-top: var(--ns-card-padding);
}
.ns-content-group ion-card-content
{
  padding: 0 var(--ns-card-padding) var(--ns-card-padding) var(--ns-card-padding);

  font-size: 0.9rem;
  color: var(--ion-color-dark);
}

.ns-content-group ion-card-title.ios
{
  font-size: 1.2rem;
}

</style>
