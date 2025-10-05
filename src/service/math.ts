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

  const result = (() => {
    switch (direction) {
      case 'up':
        return Math.ceil(quotient) * multiple;
      case 'down':
        return Math.floor(quotient) * multiple;
      default:
        return Math.round(quotient) * multiple;
    }
  })();

  const precision = Math.max(decimalPlaces(value), decimalPlaces(multiple));
  return sanitizeFloatingPoint(result, precision);
}

function decimalPlaces(num: number): number {
  if (!Number.isFinite(num)) return 0;
  const [coefficient, exponent = '0'] = num.toString().split(/[eE]/);
  const fraction = coefficient.split('.')[1] ?? '';
  const adjustment = Number.parseInt(exponent, 10);
  return Math.max(0, fraction.length - adjustment);
}

function sanitizeFloatingPoint(num: number, precision: number): number {
  if (!Number.isFinite(num)) {
    return num;
  }

  const safePrecision = Math.min(Math.max(precision, 0), 15);
  return Number.parseFloat(num.toFixed(safePrecision));
}

/**
 * Forces a value to stay within the low and high limits.
 *
 * @param value    The number to keep inside low/high.
 * @param low The lower limit.
 * @param hight The upper limit.
 */
export function clamp(value: number, low: number, high: number): number {
  return Math.max(low, Math.min(high, value))
}

/**
 * Checks if the two numbers are approx. (0,001) equal.
 *
 * @param a 1st number
 * @param b 2nd number
 */
export function approxEq(a: number, b: number): boolean { return Math.abs(a - b) < (1e-4) }
