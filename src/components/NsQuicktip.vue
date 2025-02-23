<template>
  <a class="link" :id="linkId" href="#" @click.prevent>{{ text }}</a>
  <ion-popover :trigger="linkId" trigger-action="click">
    <div class="ion-padding" v-if="!!tip">{{ tip }}</div>
    <div class="ion-padding tip-text" v-else><slot></slot></div>
  </ion-popover>
</template>

<script setup lang="ts">

import { IonPopover, IonContent } from '@ionic/vue'
import { ref } from 'vue'

defineProps<{
  text?: string,
  tip?: string,
}>()

const generateId = () => { return 'ns-quicktip-' + Math.random().toString(36).substring(2, 9) }
const linkId = ref(generateId())

</script>

<style lang="css" scoped>
.link
{
  text-decoration: underline;
  color: inherit;
}
.tip-text
{
  font-size: 0.9rem;
}
.tip-text :deep(h2)
{
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
}
.tip-text :deep(ul)
{
  margin: 0;
  padding: 0 0 0 1rem;
  font-size: 0.9em;
  list-style-type: circle;
}
.tip-text :deep(p)
{
  margin: 0 0 .5rem 0;
  padding: 0;
  line-height: var(--ns-narrow-line);
}
.tip-text :deep(p:last-of-type)
{
  margin: 0;
}
.tip-text :deep(hr)
{
  margin: 0 var(--ns-card-neg-padding) var(--ns-text-padding) var(--ns-card-neg-padding);
  padding: var(--ns-text-padding) 0 0 0;
  border-bottom: 1px solid var(--ion-color-light);
}
</style>
