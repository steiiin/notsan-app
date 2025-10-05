import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packageIds = [
  'supp_100mg',
  'iv_100mg',
  'iv_250mg'
] as const

const packages = resolvePackages('prednisolon', packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Prednisolon, packageIds)

export const supp_100mg = packages.supp_100mg
export const iv_100mg = packages.iv_100mg
export const iv_250mg = packages.iv_250mg

export const isSupp_100mgEnabled = packageFlags.supp_100mg
export const isIv_100mgEnabled = packageFlags.iv_100mg
export const isIv_250mgEnabled = packageFlags.iv_250mg
