import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('dimenhydrinat', [
  'iv_62mg',
  'supp_40mg',
  'supp_70mg'
] as const)

export const iv_62mg = packages.iv_62mg
export const supp_40mg = packages.supp_40mg
export const supp_70mg = packages.supp_70mg
