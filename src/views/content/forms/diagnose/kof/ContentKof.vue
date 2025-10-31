<template>

  <kof-paint v-model="kof" v-model:open="paintVisible"></kof-paint>

  <ns-content-group :style="infoData.color">
    <div class="title">{{ infoData.title }}</div>
    <div class="subtitle">{{ infoData.subtitle }}</div>
  </ns-content-group>
   <ns-content-group>
    <div class="buttons">
      <ion-button @click="openPaint" class="block">Bereiche bearbeiten</ion-button>
      <ion-button @click="resetPaint" color="danger">Neu</ion-button>
    </div>
  </ns-content-group>

</template>

<script setup lang="ts">

import { IonButton } from '@ionic/vue';
import KofPaint from '@/components/forms/kof/KofPaint.vue';
import NsContentGroup from '@/components/NsContentGroup.vue';
import { KofInfo } from '@/types/forms/kof';

import { computed, ref } from 'vue';

const kof = ref<KofInfo>({ patientAge: 'adult' })
const paintVisible = ref(true)

const openPaint = () => {
  paintVisible.value = true
}
const resetPaint = () => {
  kof.value = { patientAge: 'adult' }
  openPaint()
}

const infoData = computed(() => {
  return { title: 'Keine Verbrennungen', subtitle: '0% KOF', color: '' }
})

</script>

<style scoped>
.title {
  font-size: 1.2em;
  font-weight: 700;
  line-height: 1.1;
}
.subtitle {
  opacity: .66;
  line-height: 1.1;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.buttons > .block {
  flex: 1;
}
</style>

