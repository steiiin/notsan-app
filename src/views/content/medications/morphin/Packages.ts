import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('morphin', [
  'iv_10mg',
  'iv_20mg'
] as const)

export const iv_10mg = packages.iv_10mg
export const iv_20mg = packages.iv_20mg
