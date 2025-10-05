import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages(MedId.Metoprolol, [
  'iv_5mg'
] as const)

export const iv_5mg = packages.iv_5mg
