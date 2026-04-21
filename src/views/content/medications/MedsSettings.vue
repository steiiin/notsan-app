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
      <ion-content class="ion-padding">
        <ion-list inset>
          <ion-item>
            <ion-select
              aria-label="Rettungsdienstbereich"
              label="Rettungsdienstbereich"
              label-placement="stacked"
              interface="popover"
              :value="selectedRegionId"
              @ionChange="onRegionChange"
            >
              <ion-select-option
                v-for="region in regionOptions"
                :key="region.id"
                :value="region.id"
              >
                {{ region.label }}
              </ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>

        <ion-list inset>
          <ion-list-header>
            <ion-label>Medikamente</ion-label>
          </ion-list-header>

          <template v-for="medication in contentStore.medications" :key="medication.id">
            <ion-item>
              <ion-label>
                <h3>{{ medication.title }}</h3>
                <p v-if="medication.subtitle">{{ medication.subtitle }}</p>
              </ion-label>
              <ion-toggle
                slot="end"
                :checked="configStore.checkMedicationEnabled(medication.id)"
                @ionChange="onMedicationToggle(medication.id, $event)"
              />
            </ion-item>

            <template v-if="medication.packages.length > 1">
              <ion-item
                v-for="medPackage in medication.packages"
                :key="medPackage.id"
                lines="none"
                class="package-item"
              >
                <ion-label class="ion-text-wrap">
                  <p>{{ medPackage.name }}</p>
                </ion-label>
                <ion-toggle
                  slot="end"
                  :checked="configStore.checkPackageEnabled(medication.id, medPackage.id)"
                  :disabled="!configStore.checkMedicationEnabled(medication.id)"
                  @ionChange="onPackageToggle(medication.id, medPackage.id, $event)"
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
} from '@ionic/vue';
import { closeOutline } from 'ionicons/icons'
import { computed } from 'vue'
import { regionOptions } from '@/data/regions'
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

const selectedRegionId = computed(() => configStore.medSettings.selectedRegionId ?? 'default')

const closeSettings = () => {
  emit('update:modelValue', false)
  emit('closed')
}

const onRegionChange = (event: CustomEvent) => {
  const regionId = event.detail?.value as string
  if (!regionId) {
    return
  }
  configStore.applyRegionPreset(regionId)
}

const onMedicationToggle = (medicationId: string, event: CustomEvent) => {
  const enabled = Boolean(event.detail?.checked)
  configStore.toggleMedicationEnabled(medicationId, enabled)
}

const onPackageToggle = (medicationId: string, packageId: string, event: CustomEvent) => {
  const enabled = Boolean(event.detail?.checked)
  configStore.toggleMedicationPackage(medicationId, packageId, enabled)
}
</script>

<style scoped>
.package-item {
  --inner-padding-start: 1.5rem;
}
</style>
