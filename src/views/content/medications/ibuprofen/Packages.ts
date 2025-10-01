import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('ibuprofen', [
  'po_200mg_400mg_600mg_800mg',
  'po_20mgml_40mgml',
  'supp_75mg_125mg_150mg_250mg',
  'iv_4mgml_6mgml_100ml'
] as const)

export const po_200mg_400mg_600mg_800mg = packages.po_200mg_400mg_600mg_800mg
export const po_20mgml_40mgml = packages.po_20mgml_40mgml
export const supp_75mg_125mg_150mg_250mg = packages.supp_75mg_125mg_150mg_250mg
export const iv_4mgml_6mgml_100ml = packages.iv_4mgml_6mgml_100ml
