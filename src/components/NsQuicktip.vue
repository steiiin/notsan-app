<template>
  <a class="link" :id="linkId" href="#" @click.prevent>{{ text }}</a>
  <ion-popover :trigger="linkId" trigger-action="click">
    <div class="ion-padding" v-if="!!tip">{{ tip }}</div>
    <div class="ion-padding" v-else>
      <ns-text-content class="dense">
        <slot></slot>
      </ns-text-content>
    </div>
  </ion-popover>
</template>

<script setup lang="ts">

import { IonPopover } from '@ionic/vue'
import NsTextContent from './NsTextContent.vue';
import { ref } from 'vue'

defineProps<{
  text?: string,
  tip?: string,
}>()

const generateId = () => { return 'ns-quicktip-' + Math.random().toString(36).substring(2, 9) }
const linkId = ref(generateId())

</script>

<style lang="css" scoped>

.dense {
  font-size: 0.8rem !important;
}

.link
{
  text-decoration: underline;
  color: inherit;
}

</style>
