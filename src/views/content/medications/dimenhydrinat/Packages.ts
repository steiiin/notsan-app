import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packageIds = [
  'iv_62mg',
  'supp_40mg',
  'supp_70mg'
] as const

const packages = resolvePackages('dimenhydrinat', packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Dimenhydrinat, packageIds)

export const iv_62mg = packages.iv_62mg
export const supp_40mg = packages.supp_40mg
export const supp_70mg = packages.supp_70mg

export const isIv_62Enabled = packageFlags.iv_62mg
export const isSupp40Enabled = packageFlags.supp_40mg
export const isSupp70Enabled = packageFlags.supp_70mg
