import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages(MedId.Metamizol, [
  'iv_500mgml_2ml'
] as const)

export const iv_500mgml_2ml = packages.iv_500mgml_2ml
