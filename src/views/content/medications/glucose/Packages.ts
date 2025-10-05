import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'
import { computedOnlyOne } from '@/service/reactive'

const packageIds = [
  'iv_1g_10ml',
  'iv_2g_10ml',
  'iv_4g_10ml'
] as const

const packages = resolvePackages(MedId.Glucose, packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Glucose, packageIds)

export const iv_1g_10ml = packages.iv_1g_10ml
export const iv_2g_10ml = packages.iv_2g_10ml
export const iv_4g_10ml = packages.iv_4g_10ml

export const isIv_1g_10mlEnabled = packageFlags.iv_1g_10ml
export const isIv_2g_10mlEnabled = packageFlags.iv_2g_10ml
export const isIv_4g_10mlEnabled = packageFlags.iv_4g_10ml

export const isOnlyOneEnabled = computedOnlyOne([ isIv_1g_10mlEnabled, isIv_2g_10mlEnabled, isIv_4g_10mlEnabled ])