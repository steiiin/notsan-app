import { medications } from '@/data/medications'
import { Medication } from '@/types/medication';
import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', {
  state: () => ({
    medications,
  }),
  getters: {
    getMedications(state) {
      return state.medications
    },
  },
  actions: {
    findMedicationById(id: string): Medication|null {
      return this.medications.find(i => i.id === id) ?? null
    }
  }
})