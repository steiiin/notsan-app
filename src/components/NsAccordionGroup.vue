<template>
  <ion-accordion-group class="ns-accordion" :class="{ 'with-indent': indent }" :animated="false">
    <slot></slot>
  </ion-accordion-group>
</template>

<script setup lang="ts">
import { IonAccordionGroup } from '@ionic/vue'
defineProps<{
  indent?: boolean,
}>()
</script>

<style lang="css" scoped>
.ns-accordion {
  margin-bottom: 2px;
}
.ns-accordion.with-indent {
  margin-bottom: .5rem;
}
</style>
