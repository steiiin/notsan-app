
import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages(MedId.Acetylsalicyl, ['iv_500mg'] as const)

export const iv_500mg = packages.iv_500mg