import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('metoprolol', [
  'iv_5mg'
] as const)

export const iv_5mg = packages.iv_5mg
