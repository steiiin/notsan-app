import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packageIds = [
  'iv_0_05mgml_2ml',
  'iv_0_05mgml_10ml'
] as const

const packages = resolvePackages('fentanyl', packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Fentanyl, packageIds)

export const iv_0_05mgml_2ml = packages.iv_0_05mgml_2ml
export const iv_0_05mgml_10ml = packages.iv_0_05mgml_10ml

export const isIv_0_05mgml_2mlEnabled = packageFlags.iv_0_05mgml_2ml
export const isIv_0_05mgml_10mlEnabled = packageFlags.iv_0_05mgml_10ml
