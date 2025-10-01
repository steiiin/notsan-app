import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('nalbuphin', [
  'iv_20mg'
] as const)

export const iv_20mg = packages.iv_20mg
