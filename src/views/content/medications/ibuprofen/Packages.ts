import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'
import { computedAny, computedOnlyOne } from '@/service/reactive'

const packageIds = [
  'po_200mg_400mg_600mg_800mg',
  'po_20mgml_40mgml',
  'supp_75mg_125mg_150mg_250mg',
  'iv_4mgml_6mgml_100ml'
] as const

const packages = resolvePackages(MedId.Ibuprofen, packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Ibuprofen, packageIds)

export const po_200mg_400mg_600mg_800mg = packages.po_200mg_400mg_600mg_800mg
export const po_20mgml_40mgml = packages.po_20mgml_40mgml
export const supp_75mg_125mg_150mg_250mg = packages.supp_75mg_125mg_150mg_250mg
export const iv_4mgml_6mgml_100ml = packages.iv_4mgml_6mgml_100ml

export const isPo_200mg_400mg_600mg_800mgEnabled = packageFlags.po_200mg_400mg_600mg_800mg
export const isPo_20mgml_40mgmlEnabled = packageFlags.po_20mgml_40mgml
export const isSupp_75mg_125mg_150mg_250mgEnabled = packageFlags.supp_75mg_125mg_150mg_250mg
export const isIv_4mgml_6mgml_100mlEnabled = packageFlags.iv_4mgml_6mgml_100ml

export const isOnlyOneEnabled = computedOnlyOne([ isPo_200mg_400mg_600mg_800mgEnabled, isPo_20mgml_40mgmlEnabled, isSupp_75mg_125mg_150mg_250mgEnabled, isIv_4mgml_6mgml_100mlEnabled ])
export const isAnyPoEnabled = computedAny([ isPo_200mg_400mg_600mg_800mgEnabled, isPo_20mgml_40mgmlEnabled ])
export const isAnySuppEnabled = computedAny([ isSupp_75mg_125mg_150mg_250mgEnabled ])
export const isAnyIvEnabled = computedAny([ isIv_4mgml_6mgml_100mlEnabled ])
