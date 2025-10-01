import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('ipratropiumbromid', [
  'inh_250ug',
  'inh_500ug'
] as const)

export const inh_250ug = packages.inh_250ug
export const inh_500ug = packages.inh_500ug
