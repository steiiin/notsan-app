import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages(MedId.Atropin, [
  'iv_0_5mg'
] as const)

export const iv_0_5mg = packages.iv_0_5mg
