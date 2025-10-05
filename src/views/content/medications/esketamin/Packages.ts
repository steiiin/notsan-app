import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'
import { computedOnlyOne } from '@/service/reactive'

const packageIds = [
  'iv_5mgml_5ml',
  'iv_25mgml_2ml',
  'iv_25mgml_10ml'
] as const

const packages = resolvePackages('esketamin', packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Esketamin, packageIds)

export const iv_5mgml_5ml = packages.iv_5mgml_5ml
export const iv_25mgml_2ml = packages.iv_25mgml_2ml
export const iv_25mgml_10ml = packages.iv_25mgml_10ml

export const isIv_5mgml_5mlEnabled = packageFlags.iv_5mgml_5ml
export const isIv_25mgml_2mlEnabled = packageFlags.iv_25mgml_2ml
export const isIv_25mgml_10mlEnabled = packageFlags.iv_25mgml_10ml

export const isOnlyOneEnabled = computedOnlyOne([ isIv_5mgml_5mlEnabled, isIv_25mgml_2mlEnabled, isIv_25mgml_10mlEnabled ])