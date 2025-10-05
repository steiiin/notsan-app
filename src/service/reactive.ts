import { computed, ComputedRef } from "vue"

export function computedOnlyOne(bools: Array<ComputedRef<boolean>>): ComputedRef<boolean> {
  return computed(() => bools.filter(Boolean).length === 1)
}

export function computedAny(bools: Array<ComputedRef<boolean>>): ComputedRef<boolean> {
  return computed(() => bools.some(b => b.value))
}