<template>
  <div class="empty-state">
    <ion-icon :icon="searchOutline" />
    <ion-text>Keine {{ label }} gefunden.</ion-text>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonText } from '@ionic/vue'
import { searchOutline } from 'ionicons/icons'

defineProps<{
  label: string
}>()
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
