import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('salbutamol', [
  'inh_5mgml'
] as const)

export const inh_5mgml = packages.inh_5mgml
