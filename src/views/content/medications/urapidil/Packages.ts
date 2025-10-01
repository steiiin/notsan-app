import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('urapidil', [
  'iv_5mgml_5ml',
  'iv_5mgml_10ml'
] as const)

export const iv_5mgml_5ml = packages.iv_5mgml_5ml
export const iv_5mgml_10ml = packages.iv_5mgml_10ml
