import { MedId } from '@/types/medication'
import { resolvePackages } from '../resolvePackages'

const packages = resolvePackages(MedId.Amiodaron, ['iv_150mg'] as const)

export const iv_150mg = packages.iv_150mg
