import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('dimetinden', [
  'iv_4mg'
] as const)

export const iv_4mg = packages.iv_4mg
