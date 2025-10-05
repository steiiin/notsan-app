import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages(MedId.Butylscopolamin, [
  'iv_20mg'
] as const)

export const iv_20mg = packages.iv_20mg
