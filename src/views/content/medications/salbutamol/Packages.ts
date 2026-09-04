import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packageIds = [
  'inh_5mgml',
  'inh_2_5mgml',
  'inh_1_25mgml',
] as const

const packages = resolvePackages(MedId.Salbutamol, packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Salbutamol, packageIds)

export const inh_5mgml = packages.inh_5mgml
export const inh_2_5mgml = packages.inh_2_5mgml
export const inh_1_25mgml = packages.inh_1_25mgml

export const isInh_5mgmlEnabled = packageFlags.inh_5mgml
export const isInh_2_5mgmlEnabled = packageFlags.inh_2_5mgml
export const isInh_1_25mgmlEnabled = packageFlags.inh_1_25mgml
