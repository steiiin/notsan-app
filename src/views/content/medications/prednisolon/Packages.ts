import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('prednisolon', [
  'supp_100mg',
  'iv_100mg',
  'iv_250mg'
] as const)

export const supp_100mg = packages.supp_100mg
export const iv_100mg = packages.iv_100mg
export const iv_250mg = packages.iv_250mg
