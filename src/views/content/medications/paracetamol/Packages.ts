import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('paracetamol', [
  'po_500mg',
  'po_40mgml',
  'supp_125mg_250mg',
  'iv_10mgml_100ml'
] as const)

export const po_500mg = packages.po_500mg
export const po_40mgml = packages.po_40mgml
export const supp_125mg_250mg = packages.supp_125mg_250mg
export const iv_10mgml_100ml = packages.iv_10mgml_100ml
