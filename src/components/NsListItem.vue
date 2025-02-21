<template>
  <li class="ns-list-item">
    <ion-icon aria-hidden="true" :icon="!icon ? chevronForward : icon"></ion-icon>
    <span><slot></slot></span>
  </li>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { chevronForward } from 'ionicons/icons';
defineProps<{
  icon?: string
}>()
</script>

<style lang="css" scoped>
.ns-list-item
{
  display: flex;
  align-items: center;
  white-space: pre-line;
}
.ns-list-item ion-icon
{
  flex-shrink: 0;
}
</style>
