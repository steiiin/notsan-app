import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('midazolam', [
  'iv_5mgml_1ml',
  'iv_5mgml_3ml',
  'iv_1mgml_5ml',
  'buccal_2_5mg_5mg_7_5mg_10mg',
] as const)

export const iv_5mgml_1ml = packages.iv_5mgml_1ml
export const iv_5mgml_3ml = packages.iv_5mgml_3ml
export const iv_1mgml_5ml = packages.iv_1mgml_5ml
export const buccal_2_5mg_5mg_7_5mg_10mg = packages.buccal_2_5mg_5mg_7_5mg_10mg
