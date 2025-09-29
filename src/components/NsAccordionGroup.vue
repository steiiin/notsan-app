<template>
  <ion-accordion-group :animated="false">
    <slot></slot>
  </ion-accordion-group>
</template>

<script setup lang="ts">
import { IonAccordionGroup } from '@ionic/vue'
</script>

<style lang="css" scoped>

</style>
