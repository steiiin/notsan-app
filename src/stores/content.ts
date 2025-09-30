import { medications } from '@/data/medications'
import { library } from '@/data/library'
import { Medication } from '@/types/medication';
import { LibraryEntry } from '@/types/library-entry';
import { LibraryList } from '@/types/library-list';
import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', {
  state: () => ({
    medications,
    library,
  }),
  getters: {

    getMedications(state) {
      return state.medications
    },
    getLibrary(state) {
      return state.library
    },

  },
  actions: {

    findMedicationById(id: string): Medication | null {
      return this.medications.find(i => i.id === id) ?? null
    },

    findLibraryListById(id: string): LibraryList | null {
      const item = this.library.find(entry => 'entries' in entry && entry.id === id)
      return (item && 'entries' in item) ? item : null
    },
    findLibraryEntryById(id: string): LibraryEntry | null {
      for (const item of this.library) {
        if ('entries' in item) {
          const found = item.entries.find(entry => entry.id === id)
          if (found) { return found }
        } else if (item.id === id) {
          return item
        }
      }
      return null
    },
    findLibraryEntryInList(listId: string, entryId: string): LibraryEntry | null {
      const list = this.findLibraryListById(listId)
      if (!list) { return null }
      return list.entries.find(entry => entry.id === entryId) ?? null
    },

  }
})
