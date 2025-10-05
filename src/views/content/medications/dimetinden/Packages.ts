import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages(MedId.Dimetinden, [
  'iv_4mg'
] as const)

export const iv_4mg = packages.iv_4mg
