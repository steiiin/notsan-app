<template>
  <div class="ns-dosage-indication">
    <header>
      <ns-content-split>
        <template #left>
          <ion-icon :icon="medical"></ion-icon>
        </template>
        <template #right>
          <span>{{ name }}</span>
        </template>
      </ns-content-split>
    </header>
    <div class="usages">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import NsContentSplit from './NsContentSplit.vue'
import { IonIcon } from '@ionic/vue';
import { medical } from 'ionicons/icons'
defineProps<{
  name: string,
}>()
</script>

<style lang="css" scoped>

.ns-dosage-indication
{
  margin: 0 var(--ns-card-neg-padding) 0 var(--ns-card-neg-padding);
}

header
{
  font-size: 1em;
  padding-block: calc(0.5 * var(--ns-card-padding));
  padding-inline: var(--ns-card-padding);
  background-color: var(--ion-color-light);
  text-transform: uppercase;
}
header ion-icon
{
  font-size: 1.5rem;
  opacity: .5;
}

.usages
{
  padding-inline: var(--ns-card-padding);
  padding-top: var(--ns-text-padding);
}

</style>
