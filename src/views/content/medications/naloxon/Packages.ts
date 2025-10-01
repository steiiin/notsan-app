import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('naloxon', [
  'iv_0_4mg'
] as const)

export const iv_0_4mg = packages.iv_0_4mg
