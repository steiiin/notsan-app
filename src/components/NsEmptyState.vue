<template>
  <div class="empty-state">
    <ion-icon :icon="searchOutline" />
    <ion-text>{{ text }}</ion-text>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonText } from '@ionic/vue'
import { searchOutline } from 'ionicons/icons'
import { computed } from 'vue';

const props = defineProps<{
  label?: string,
  id?: string,
}>()

const text = computed(() => {
  const key = !props.id ? '': `(${props.id}) `
  if (!props.label) { return `Keinen Inhalt ${key}gefunden` }
  return `${props.label} ${key}noch nicht vorhanden`
})

</script>

<style scoped>
.empty-state {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--ion-color-medium);
}

.empty-state ion-icon {
  font-size: 2.5rem;
}
</style>
