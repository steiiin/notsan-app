import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages(MedId.Salbutamol, [
  'inh_5mgml'
] as const)

export const inh_5mgml = packages.inh_5mgml
