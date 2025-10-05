import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packageIds = [
  'iv_5mgml_5ml',
  'iv_5mgml_10ml'
] as const

const packages = resolvePackages('urapidil', packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Urapidil, packageIds)

export const iv_5mgml_5ml = packages.iv_5mgml_5ml
export const iv_5mgml_10ml = packages.iv_5mgml_10ml

export const isIv_5mgml_5mlEnabled = packageFlags.iv_5mgml_5ml
export const isIv_5mgml_10mlEnabled = packageFlags.iv_5mgml_10ml
