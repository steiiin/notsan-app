import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages('glyceroltrinitrat', ['spray_0_4mg'] as const)

export const spray_0_4mg = packages.spray_0_4mg
