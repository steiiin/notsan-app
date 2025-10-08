import { computed, type ComputedRef } from 'vue'
import { useConfigStore } from '@/stores/config'

export function useMedicationPackageFlags<const Keys extends readonly string[]>(
  medicationId: string,
  packageIds: Keys,
): { [K in Keys[number]]: ComputedRef<boolean> } {
  const configStore = useConfigStore()

  const flags = {} as { [K in Keys[number]]: ComputedRef<boolean> }

  for (const packageId of packageIds) {
    const key = packageId as Keys[number]
    flags[key] = computed(() => configStore.checkPackageEnabled(medicationId, key))
  }

  return flags
}
