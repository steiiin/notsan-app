import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages(MedId.Epinephrin, [
  'iv_1mg'
] as const)

export const iv_1mg = packages.iv_1mg
