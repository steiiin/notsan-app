import { HabitusModeValue, HabitusValue } from '@/types/patient'
import { computed, unref, type Ref, type ComputedRef } from 'vue'

export const HABITUS_MULTIPLIERS: Record<HabitusModeValue, Record<HabitusValue, number>> = {
  child: {
    'very-thin': 0.85,
    'thin': 0.92,
    'normal': 1.0,
    'sporty': 1.08,               // +8%
    'lightly-overweight': 1.1,  // +10%
    'overweight': 1.2,            // +20%
    'very-overweight': 1.35,    // +35%
  },
  adult: {
    'very-thin': 0.86,
    'thin': 0.93,
    'normal': 1.0,
    'sporty': 1.1,                // +10%
    'lightly-overweight': 1.12, // +12%
    'overweight': 1.25,           // +25%
    'very-overweight': 1.4,     // +40%
  },
}

export function useHabitusMultiplicator(
  modeRef: HabitusModeValue,
  habitusRef: HabitusValue
): number {

  const mode = unref(modeRef)
  const habitus = unref(habitusRef)
  const modeMultipliers = HABITUS_MULTIPLIERS[mode]
  return modeMultipliers[habitus] ?? 1

}
