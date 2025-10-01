import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('furosemid', ['iv_20mg', 'iv_40mg'] as const)

export const iv_20mg = packages.iv_20mg
export const iv_40mg = packages.iv_40mg
