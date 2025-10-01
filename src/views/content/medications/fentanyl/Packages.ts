import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('fentanyl', [
  'iv_0_05mgml_2ml',
  'iv_0_05mgml_10ml'
] as const)

export const iv_0_05mgml_2ml = packages.iv_0_05mgml_2ml
export const iv_0_05mgml_10ml = packages.iv_0_05mgml_10ml
