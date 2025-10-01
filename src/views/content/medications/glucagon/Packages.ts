import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('glucagon', [
  'im_1mg',
  'nasal_3mg'
] as const)

export const im_1mg = packages.im_1mg
export const nasal_3mg = packages.nasal_3mg
