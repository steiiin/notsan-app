import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('epinephrin', [
  'iv_1mg'
] as const)

export const iv_1mg = packages.iv_1mg
