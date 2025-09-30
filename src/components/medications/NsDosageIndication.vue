<template>
  <div class="ns-dosage-indication">
    <header v-if="name">
      <ns-content-split>
        <template #left>
          <ion-icon :icon="medical"></ion-icon>
        </template>
        <template #right>
          <span style="margin: auto 0;">{{ name }}</span>
        </template>
      </ns-content-split>
    </header>
    <header v-else></header>
    <div class="usages">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

import { IonIcon } from '@ionic/vue'
import { medical } from 'ionicons/icons'

import NsContentSplit from '@/components/NsContentSplit.vue'

defineProps<{
  name?: string,
}>()
</script>

<style lang="css" scoped>

.ns-dosage-indication {
  margin: 0 var(--ns-card-neg-padding) 0 var(--ns-card-neg-padding);
}
.ns-dosage-indication:last-of-type {
  margin-bottom: var(--ns-card-neg-padding);
}

header {
  font-size: 1em;
  padding-block: calc(0.5 * var(--ns-card-padding));
  padding-inline: var(--ns-card-padding);
  background-color: var(--ion-color-light);
  text-transform: uppercase;
  line-height: 1;
}
header ion-icon {
  font-size: 1.5rem;
  opacity: .5;
}

.usages {
  padding-inline: var(--ns-card-padding);
  padding-top: var(--ns-text-padding);
}

</style>
