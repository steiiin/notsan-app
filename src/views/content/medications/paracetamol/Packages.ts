import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'
import { computedAny, computedOnlyOne } from '@/service/reactive'

const packageIds = [
  'po_500mg',
  'po_40mgml',
  'supp_125mg_250mg',
  'iv_10mgml_100ml'
] as const

const packages = resolvePackages(MedId.Paracetamol, packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Paracetamol, packageIds)

export const po_500mg = packages.po_500mg
export const po_40mgml = packages.po_40mgml
export const supp_125mg_250mg = packages.supp_125mg_250mg
export const iv_10mgml_100ml = packages.iv_10mgml_100ml

export const isPo_500mgEnabled = packageFlags.po_500mg
export const isPo_40mgmlEnabled = packageFlags.po_40mgml
export const isSupp_125mg_250mgEnabled = packageFlags.supp_125mg_250mg
export const isIv_10mgml_100mlEnabled = packageFlags.iv_10mgml_100ml

export const isOnlyOneEnabled = computedOnlyOne([ isPo_500mgEnabled, isPo_40mgmlEnabled, isSupp_125mg_250mgEnabled, isIv_10mgml_100mlEnabled ])
export const isAnyPoEnabled = computedAny([ isPo_500mgEnabled, isPo_40mgmlEnabled ])
export const isAnySuppEnabled = computedAny([ isSupp_125mg_250mgEnabled ])
export const isAnyIvEnabled = computedAny([ isIv_10mgml_100mlEnabled ])
