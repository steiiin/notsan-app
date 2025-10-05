import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packageIds = [
  'inh_250ug',
  'inh_500ug'
] as const

const packages = resolvePackages('ipratropiumbromid', packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Ipratropiumbromid, packageIds)

export const inh_250ug = packages.inh_250ug
export const inh_500ug = packages.inh_500ug

export const isInh_250ugEnabled = packageFlags.inh_250ug
export const isInh_500ugEnabled = packageFlags.inh_500ug
