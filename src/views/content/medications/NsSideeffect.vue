<template>
  <template v-if="showButton">
    <ion-button expand="full" color="light" :routerLink="link">
      <ion-icon slot="start" :icon="arrowForwardOutline"></ion-icon>
      <slot></slot>
    </ion-button>
  </template>
  <ns-list-item v-else :class="{ severe, indented }" :icon="icon">
    <slot></slot>
  </ns-list-item>
</template>

<script setup lang="ts">

import { IonButton, IonIcon } from '@ionic/vue'
import { caretForward, arrowForwardOutline } from 'ionicons/icons'
import { computed } from 'vue'
import NsListItem from './NsListItem.vue'

const props = defineProps<{
  severe?: boolean,
  todo?: boolean,
  link?: string,
  indented?: boolean,
}>()

const icon = computed(() => !props.severe ? (!props.todo ? undefined : arrowForwardOutline) : caretForward)
const showButton = computed(() => !!props.link)

</script>

<style lang="css" scoped>
.severe { color: var(--ns-color-red); }
.indented { margin-left: 16px; opacity: .8; font-size: 0.9em; }
</style>
