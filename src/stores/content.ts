import { medications } from '@/data/medications'
import { library } from '@/data/library'
import { forms } from '@/data/forms'
import { Medication } from '@/types/medication'
import { LibraryEntry } from '@/types/library-entry'
import { LibraryList } from '@/types/library-list'
import { defineStore } from 'pinia'
import { useConfigStore } from './config'
import { FormList } from '@/types/form-list'
import { FormEntry } from '@/types/form-entry'

const configStore = useConfigStore()

export const useContentStore = defineStore('content', {
  state: () => ({
    medications,
    library,
    forms,
  }),
  getters: {

    getMedications(state) {
      return state.medications.filter(e => configStore.checkMedicationEnabled(e.id))
    },
    getLibrary(state) {
      return state.library
    },
    getForms(state) {
      return state.forms
    }

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

    findFormListById(id: string): FormList | null {
      const item = this.forms.find(entry => 'entries' in entry && entry.id === id)
      return (item && 'entries' in item) ? item : null
    },
    findFormEntryById(id: string): FormEntry | null {
      for (const item of this.forms) {
        if ('entries' in item) {
          const found = item.entries.find(entry => entry.id === id)
          if (found) { return found }
        } else if (item.id === id) {
          return item
        }
      }
      return null
    },
    findFormEntryInList(listId: string, entryId: string): FormEntry | null {
      const list = this.findFormListById(listId)
      if (!list) { return null }
      return list.entries.find(entry => entry.id === entryId) ?? null
    },

  }
})
