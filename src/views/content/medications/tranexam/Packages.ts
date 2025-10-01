import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('tranexam', [
  'iv_100mgml_5ml',
  'iv_100mgml_10ml'
] as const)

export const iv_100mgml_5ml = packages.iv_100mgml_5ml
export const iv_100mgml_10ml = packages.iv_100mgml_10ml
