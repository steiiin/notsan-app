import { MedId, PerMedicationConfig } from '@/types/medication';
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    medicationConfig: {} as Record<string, PerMedicationConfig>
  }),
  actions: {

    checkMedicationEnabled(medId: string): boolean {
      if (this.medicationConfig.hasOwnProperty(medId)) {
        return this.medicationConfig[medId].enabled
      }
      return true
    },
    checkPackageEnable(medId: string, packageId: string): boolean {
      if (this.medicationConfig.hasOwnProperty(medId)) {
        if (this.medicationConfig[medId].packages.hasOwnProperty(packageId)) {
          return this.medicationConfig[medId].packages[packageId]
        }
      }
      return true
    },

    loadConfig() {

      /* TODO: implement config save/load */
      this.medicationConfig = {
        'prednisolxon': { enabled: true, packages: { 'supp_100mg': false } }
      }

    },

  }
})
