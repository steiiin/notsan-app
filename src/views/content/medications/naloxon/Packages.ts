import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages(MedId.Naloxon, [
  'iv_0_4mg'
] as const)

export const iv_0_4mg = packages.iv_0_4mg
