import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packageIds = [
  'iv_100mgml_5ml',
  'iv_100mgml_10ml'
] as const

const packages = resolvePackages('tranexam', packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Tranexam, packageIds)

export const iv_100mgml_5ml = packages.iv_100mgml_5ml
export const iv_100mgml_10ml = packages.iv_100mgml_10ml

export const isIv_100mgml_5mlEnabled = packageFlags.iv_100mgml_5ml
export const isIv_100mgml_10mlEnabled = packageFlags.iv_100mgml_10ml
