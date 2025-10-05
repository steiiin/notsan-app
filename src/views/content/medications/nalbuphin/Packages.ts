import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages(MedId.Nalbuphin, [
  'iv_20mg'
] as const)

export const iv_20mg = packages.iv_20mg
