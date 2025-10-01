import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('glucose', [
  'iv_1g_10ml',
  'iv_2g_10ml',
  'iv_4g_10ml'
] as const)

export const iv_1g_10ml = packages.iv_1g_10ml
export const iv_2g_10ml = packages.iv_2g_10ml
export const iv_4g_10ml = packages.iv_4g_10ml
