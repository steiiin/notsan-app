import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'
import { computedOnlyOne } from '@/service/reactive'

const packageIds = [
  'iv_10mg',
  'iv_20mg'
] as const

const packages = resolvePackages(MedId.Morphin, packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Morphin, packageIds)

export const iv_10mg = packages.iv_10mg
export const iv_20mg = packages.iv_20mg

export const isIv_10mgEnabled = packageFlags.iv_10mg
export const isIv_20mgEnabled = packageFlags.iv_20mg

export const isOnlyOneEnabled = computedOnlyOne([ isIv_10mgEnabled, isIv_20mgEnabled ])