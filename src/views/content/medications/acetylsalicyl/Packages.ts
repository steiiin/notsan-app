import { useContentStore } from "@/stores/content"
import { Medication } from "@/types/medication"

const content = useContentStore()
const acetylsalicyl = content.findMedicationById('acetylsalicyl')!

export const acetylsalicyl_iv_500mg = acetylsalicyl.packages['iv_500mg']
