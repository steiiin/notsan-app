import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'
import { computedOnlyOne } from '@/service/reactive'

const packageIds = [
  'iv_25000ieml_0_2ml',
  'iv_5000ieml_5ml',
  'iv_5000ieml_1ml'
] as const

const packages = resolvePackages(MedId.Heparin, packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Heparin, packageIds)

export const iv_25000ieml_0_2ml = packages.iv_25000ieml_0_2ml
export const iv_5000ieml_5ml = packages.iv_5000ieml_5ml
export const iv_5000ieml_1ml = packages.iv_5000ieml_1ml

export const isIv_25000ieml_0_2mlEnabled = packageFlags.iv_25000ieml_0_2ml
export const isIv_5000ieml_5mlEnabled = packageFlags.iv_5000ieml_5ml
export const isIv_5000ieml_1mlEnabled = packageFlags.iv_5000ieml_1ml

export const isOnlyOneEnabled = computedOnlyOne([ isIv_25000ieml_0_2mlEnabled, isIv_5000ieml_1mlEnabled, isIv_5000ieml_5mlEnabled])
