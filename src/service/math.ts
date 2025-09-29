/**
 * Rounds a number to the nearest multiple of `multiple`.
 *
 * @param value    The number to round.
 * @param multiple The multiple to round to.
 * @param direction Optional direction:
 *                  - "up"   → always round up
 *                  - "down" → always round down
 *                  - undefined → round to nearest
 */
export function round(value: number, multiple: number, direction?: 'up' | 'down'): number {
  if (multiple === 0) return value; // avoid division by zero
  const quotient = value / multiple;

  switch (direction) {
    case 'up':
      return Math.ceil(quotient) * multiple;
    case 'down':
      return Math.floor(quotient) * multiple;
    default:
      return Math.round(quotient) * multiple;
  }
}