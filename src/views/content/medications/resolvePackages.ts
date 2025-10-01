import { medications } from '@/data/medications'
import type { Package } from '@/types/package'

export function resolvePackages<const Keys extends readonly string[]>(
  medicationId: string,
  packageKeys: Keys,
): { [K in Keys[number]]: Package } {
  const medication = medications.find(med => med.id === medicationId)

  if (!medication) {
    throw new Error(`Medication not found: ${medicationId}`)
  }

  const resolved = {} as { [K in Keys[number]]: Package }

  for (const key of packageKeys) {
    const pkg = medication.packages[key]

    if (!pkg) {
      throw new Error(`Package not found: ${medicationId}.${String(key)}`)
    }

    resolved[key as Keys[number]] = pkg
  }

  return resolved
}
