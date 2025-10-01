import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('heparin', [
  'iv_25000ieml_0_2ml',
  'iv_5000ieml_5ml',
  'iv_5000ieml_1ml'
] as const)

export const iv_25000ieml_0_2ml = packages.iv_25000ieml_0_2ml
export const iv_5000ieml_5ml = packages.iv_5000ieml_5ml
export const iv_5000ieml_1ml = packages.iv_5000ieml_1ml
