<template>
  <kof-paint v-model:open="settingsVisible"></kof-paint>
  <button @click="openSettings">Bonjour</button>
</template>

<script setup lang="ts">

import KofPaint from '@/components/forms/kof/KofPaint.vue';
import KofPaintToolSelector from '@/components/forms/kof/KofPaintToolSelector.vue';
import NsButtonGroup from '@/components/NsButtonGroup.vue';
import NsContentGroup from '@/components/NsContentGroup.vue';

import { computed, ref } from 'vue';

  const settingsVisible = ref(false)
  const openSettings = () => settingsVisible.value = true

</script>

<style scoped>

</style>
