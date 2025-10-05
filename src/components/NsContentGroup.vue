<template>
  <ion-card class="ns-content-group" :class="{ 'no-header': !title, 'dense-header': dense }">
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
  dense?: boolean,
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
.ns-content-group.no-header {
  padding-top: var(--ns-card-padding);
}
.ns-content-group.no-header ion-card-content {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.ns-content-group ion-card-title.ios
{
  font-size: 1.2rem;
}

.ns-content-group.dense-header ion-card-content {
  padding-inline: var(--ns-card-padding);
  padding-bottom: var(--ns-card-padding);
}

.ns-content-group.dense-header ion-card-title {
  font-size: .6rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

</style>
