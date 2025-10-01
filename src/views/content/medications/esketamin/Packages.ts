import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('esketamin', [
  'iv_5mgml_5ml',
  'iv_25mgml_2ml',
  'iv_25mgml_10ml'
] as const)

export const iv_5mgml_5ml = packages.iv_5mgml_5ml
export const iv_25mgml_2ml = packages.iv_25mgml_2ml
export const iv_25mgml_10ml = packages.iv_25mgml_10ml
