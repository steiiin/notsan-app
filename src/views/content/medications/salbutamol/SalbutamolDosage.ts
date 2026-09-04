export type SalbutamolStrength = 5 | 2.5 | 1.25

interface Preparation {
  ampouleCount: number
  priority: number
}

const preparationPriority = (ampouleCount: number): number => {
  if (ampouleCount === 1) { return 0 }
  if (Number.isInteger(ampouleCount)) { return 1 }
  return 2
}

const formatAmpouleHint = (ampouleCount: number): string => {
  const amount = ampouleCount === 0.5
    ? '½'
    : String(ampouleCount).replace('.', ',')
  const ampoule = ampouleCount === 0.5 || ampouleCount === 1
    ? 'Ampulle'
    : 'Ampullen'

  return `(${amount} ${ampoule})`
}

export const selectSalbutamolAmpouleHint = (
  doseMg: number,
  enabledStrengths: readonly SalbutamolStrength[],
): string => {
  const preparations: Preparation[] = enabledStrengths.map(strength => {
    const ampouleCount = doseMg / strength
    return {
      ampouleCount,
      priority: preparationPriority(ampouleCount),
    }
  })

  preparations.sort((left, right) =>
    left.priority - right.priority || left.ampouleCount - right.ampouleCount
  )

  const selected = preparations.at(0)
  return selected ? formatAmpouleHint(selected.ampouleCount) : ''
}
