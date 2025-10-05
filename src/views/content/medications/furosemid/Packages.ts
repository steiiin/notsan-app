import { useMedicationPackageFlags } from '@/composables/useMedicationPackageFlags'
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'
import { computedOnlyOne } from '@/service/reactive'

const packageIds = ['iv_20mg', 'iv_40mg'] as const

const packages = resolvePackages(MedId.Furosemid, packageIds)
const packageFlags = useMedicationPackageFlags(MedId.Furosemid, packageIds)

export const iv_20mg = packages.iv_20mg
export const iv_40mg = packages.iv_40mg

export const isIv_20mgEnabled = packageFlags.iv_20mg
export const isIv_40mgEnabled = packageFlags.iv_40mg

export const isOnlyOneEnabled = computedOnlyOne([isIv_20mgEnabled, isIv_40mgEnabled])
