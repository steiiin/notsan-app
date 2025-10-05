import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'
import { computedAny, computedOnlyOne } from '@/service/reactive'

const packageIds = [
  'iv_5mgml_1ml',
  'iv_5mgml_3ml',
  'iv_1mgml_5ml',
  'buccal_2_5mg_5mg_7_5mg_10mg',
] as const

const packages = resolvePackages('midazolam', packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Midazolam, packageIds)

export const iv_5mgml_1ml = packages.iv_5mgml_1ml
export const iv_5mgml_3ml = packages.iv_5mgml_3ml
export const iv_1mgml_5ml = packages.iv_1mgml_5ml
export const buccal_2_5mg_5mg_7_5mg_10mg = packages.buccal_2_5mg_5mg_7_5mg_10mg

export const isIv_5mgml_1mlEnabled = packageFlags.iv_5mgml_1ml
export const isIv_5mgml_3mlEnabled = packageFlags.iv_5mgml_3ml
export const isIv_1mgml_5mlEnabled = packageFlags.iv_1mgml_5ml
export const isBuccal_2_5mg_5mg_7_5mg_10mgEnabled = packageFlags.buccal_2_5mg_5mg_7_5mg_10mg

export const isAnyIvEnabled = computedAny([ isIv_5mgml_1mlEnabled, isIv_5mgml_3mlEnabled, isIv_1mgml_5mlEnabled ])
export const isAnyBucEnabled = computedAny([ isBuccal_2_5mg_5mg_7_5mg_10mgEnabled ])

export const isOnlyOneIvEnabled = computedOnlyOne([ isIv_5mgml_1mlEnabled, isIv_5mgml_3mlEnabled, isIv_1mgml_5mlEnabled ])
export const isOnlyOneEnabled = computedOnlyOne([ isIv_5mgml_1mlEnabled, isIv_5mgml_3mlEnabled, isIv_1mgml_5mlEnabled, isBuccal_2_5mg_5mg_7_5mg_10mgEnabled ])
