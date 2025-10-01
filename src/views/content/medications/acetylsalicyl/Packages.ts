import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('acetylsalicyl', ['iv_500mg'] as const)

export const iv_500mg = packages.iv_500mg
