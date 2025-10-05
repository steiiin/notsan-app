import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packageIds = [
  'im_1mg',
  'nasal_3mg'
] as const

const packages = resolvePackages('glucagon', packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Glucagon, packageIds)

export const im_1mg = packages.im_1mg
export const nasal_3mg = packages.nasal_3mg

export const isIm_1mgEnabled = packageFlags.im_1mg
export const isNasal_3mgEnabled = packageFlags.nasal_3mg
