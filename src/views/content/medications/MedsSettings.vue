<template>
  <ion-modal :is-open="modelValue" @didDismiss="closeSettings">
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>Einstellungen</ion-title>
          <ion-buttons slot="end">
            <ion-button fill="clear" @click="closeSettings">
              <ion-icon :icon="closeOutline" slot="icon-only" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list inset>
          <ion-item>

            <ion-select
              label="Rettungsdienstbereich"
              interface="popover"
              placeholder="Keine Bereich gewählt"
              :model-value="selectedRegionId"
              @update:modelValue="onRegionChange">
              <ion-select-option v-for="region in regionOptions"
                :key="region.id" :value="region.id">
                {{ region.label }}
              </ion-select-option>
            </ion-select>

          </ion-item>
        </ion-list>

        <ion-list inset>

          <template v-for="medication in contentStore.medications" :key="medication.id">

            <ion-item :lines="medication.packages.length>1 ? 'inset' : 'full'">
              <ion-toggle label-placement="start"
                :checked="configStore.checkMedicationEnabled(medication.id)"
                @update:modelValue="onMedicationToggle(medication.id, $event)">
                <ion-label>{{ medication.title }}</ion-label>
              </ion-toggle>
            </ion-item>

            <template v-if="medication.packages.length > 1">

              <ion-item v-for="medPackage in medication.packages" :key="medPackage.id"
                lines="none" class="package-item">

                <ion-label class="ion-text-wrap">
                  <h3>{{ medPackage.name }}</h3>
                  <p>{{ medPackage.incredients[0].amount }}</p>
                </ion-label>
                <ion-toggle
                  slot="end"
                  :checked="configStore.checkPackageEnabled(medication.id, medPackage.id)"
                  :disabled="!configStore.checkMedicationEnabled(medication.id)"
                  @update:modelValue="onPackageToggle(medication.id, medPackage.id, $event)"
                />

              </ion-item>
            </template>

          </template>
        </ion-list>
      </ion-content>
    </ion-page>
  </ion-modal>
</template>

<script setup lang="ts">

import {
  IonModal,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonListHeader,
  IonToggle,
} from '@ionic/vue'

import { closeOutline } from 'ionicons/icons'
import { computed } from 'vue'
import { findMatchingRegionId, regionOptions } from '@/data/regions'
import { useContentStore } from '@/stores/content'
import { useConfigStore } from '@/stores/config'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void,
  (event: 'closed'): void
}>()

const contentStore = useContentStore()
const configStore = useConfigStore()

const selectedRegionId = computed(() => {
  return configStore.medSettings.selectedRegionId
    ?? findMatchingRegionId(configStore.medSettings)
    ?? undefined
})

const closeSettings = () => {
  emit('update:modelValue', false)
  emit('closed')
}

const onRegionChange = (regionId: string | null | undefined) => {
  if (!regionId) {
    return
  }
  configStore.applyRegionPreset(regionId)
}

const onMedicationToggle = (medicationId: string, enabled: boolean | null | undefined) => {
  configStore.toggleMedicationEnabled(medicationId, Boolean(enabled))
}

const onPackageToggle = (medicationId: string, packageId: string, enabled: boolean | null | undefined) => {
  configStore.toggleMedicationPackage(medicationId, packageId, Boolean(enabled))
}
</script>

<style scoped>
.package-item {
  --inner-padding-start: 1.5rem;
}
</style>
