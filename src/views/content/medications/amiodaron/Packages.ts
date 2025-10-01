import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('amiodaron', ['iv_150mg'] as const)

export const iv_150mg = packages.iv_150mg
