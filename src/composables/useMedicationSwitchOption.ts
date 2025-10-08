import { MedicationSwitchOption } from '@/types/medication'
import { useContentStore } from '@/stores/content'

export function useMedicationSwitchOption(medicationId: string): MedicationSwitchOption {
  const content = useContentStore()
  const medication = content.findMedicationById(medicationId)
  if (!medication) { throw new Error('Medication id not found.'); }
  return {
    id: medicationId,
    label: medication.title,
    path: `/tabs/meds/${medicationId}`,
  }
}
