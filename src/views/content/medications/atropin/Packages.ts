import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('atropin', [
  'iv_0_5mg'
] as const)

export const iv_0_5mg = packages.iv_0_5mg
