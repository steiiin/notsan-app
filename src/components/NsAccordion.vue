<template>
  <ion-accordion :value="id ? id : title.toLowerCase()" :class="{ 'with-gap': gap }">
    <ion-item slot="header" :color="color ? color : 'light'">
      <ion-label>{{ title }}</ion-label>
    </ion-item>
    <div id="ns-content-bg" slot="content">
      <slot></slot>
    </div>
  </ion-accordion>
</template>

<script setup lang="ts">
import { IonAccordion, IonItem, IonLabel } from '@ionic/vue'
defineProps<{
  title: string,
  id?: string,
  color?: string,
  gap?: boolean
}>()
</script>

<style lang="css" scoped>

.with-gap {
  margin-top: 4px;
}

</style>
