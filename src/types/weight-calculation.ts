import { SexValue } from "./emergency";

export interface CurvePoint {
  height: number; // cm
  weight: number; // kg
  age: number;    // years (e.g., 0.5 = 6 months)
}

export class CurveCalculation {

  private static readonly TABLES: Record<SexValue, ReadonlyArray<CurvePoint>> = {
    male: [
      { height: 49.8, weight: 3.3,   age: 0.000 }, // birth
      { height: 54.8, weight: 4.4,   age: 0.083 }, // 1 month
      { height: 58.4, weight: 5.6,   age: 0.167 }, // 2 months
      { height: 61.4, weight: 6.4,   age: 0.250 }, // 3 months
      { height: 64.0, weight: 7.0,   age: 0.333 }, // 4 months
      { height: 66.0, weight: 7.5,   age: 0.417 }, // 5 months
      { height: 67.5, weight: 7.9,   age: 0.500 }, // 6 months
      { height: 69.0, weight: 8.3,   age: 0.583 }, // 7 months
      { height: 70.6, weight: 8.6,   age: 0.667 }, // 8 months
      { height: 71.8, weight: 8.9,   age: 0.750 }, // 9 months
      { height: 73.1, weight: 9.1,   age: 0.833 }, // 10 months
      { height: 74.4, weight: 9.4,   age: 0.917 }, // 11 months
      { height: 75.7, weight: 9.7,   age: 1.000 }, // 12 months
      { height: 86.8, weight:12.5,   age: 2.000 },
      { height: 95.2, weight:14.1,   age: 3.000 },
      { height:102.3, weight:16.3,   age: 4.000 },
      { height:109.2, weight:18.4,   age: 5.000 },
      { height:115.5, weight:20.6,   age: 6.000 },
      { height:121.9, weight:22.9,   age: 7.000 },
      { height:128.0, weight:25.6,   age: 8.000 },
      { height:133.3, weight:28.6,   age: 9.000 },
      { height:138.4, weight:32.0,   age:10.000 },
      { height:143.5, weight:35.6,   age:11.000 },
      { height:149.1, weight:39.9,   age:12.000 },
      { height:156.2, weight:45.4,   age:13.000 },
      { height:163.8, weight:50.8,   age:14.000 },
      { height:170.1, weight:56.0,   age:15.000 },
      { height:173.4, weight:60.8,   age:16.000 },
    ],
    female: [
      { height: 49.2, weight: 3.3,   age: 0.000 }, // birth
      { height: 53.8, weight: 4.4,   age: 0.083 }, // 1 month
      { height: 56.1, weight: 5.3,   age: 0.167 }, // 2 months
      { height: 59.9, weight: 6.0,   age: 0.250 }, // 3 months
      { height: 62.2, weight: 6.6,   age: 0.333 }, // 4 months
      { height: 64.2, weight: 7.2,   age: 0.417 }, // 5 months
      { height: 67.3, weight: 7.9,   age: 0.500 }, // 6 months
      { height: 68.8, weight: 8.2,   age: 0.583 }, // 7 months
      { height: 70.1, weight: 8.5,   age: 0.667 }, // 8 months
      { height: 71.6, weight: 8.8,   age: 0.750 }, // 9 months
      { height: 72.8, weight: 9.0,   age: 0.833 }, // 10 months
      { height: 74.1, weight: 9.3,   age: 0.917 }, // 11 months
      { height: 75.7, weight: 9.7,   age: 1.000 }, // 12 months
      { height: 85.5, weight:12.0,   age: 2.000 },
      { height: 94.0, weight:14.3,   age: 3.000 },
      { height:100.3, weight:15.4,   age: 4.000 },
      { height:107.9, weight:17.9,   age: 5.000 },
      { height:115.5, weight:20.0,   age: 6.000 },
      { height:121.1, weight:22.5,   age: 7.000 },
      { height:128.2, weight:25.9,   age: 8.000 },
      { height:133.3, weight:28.1,   age: 9.000 },
      { height:138.4, weight:32.0,   age:10.000 },
      { height:144.0, weight:37.0,   age:11.000 },
      { height:149.8, weight:41.5,   age:12.000 },
      { height:156.7, weight:45.8,   age:13.000 },
      { height:158.7, weight:47.6,   age:14.000 },
      { height:159.7, weight:52.2,   age:15.000 },
      { height:162.5, weight:53.5,   age:16.000 },
    ]
  }

  /** Estimate weight (kg) for given age (years). */
  static calculateChildWeightByAge(
    sex: SexValue,
    ageYears: number,
    multiplier = 1.0
  ): number {
    const table = this.requireTable(sex);
    const byAge = [...table].sort((a, b) => a.age - b.age);
    const base = this.interpolate(byAge, 'age', ageYears);
    return base * multiplier;
  }

  /** Estimate weight (kg) for given height (cm). */
  static calculateChildWeightByHeight(
    sex: SexValue,
    heightCm: number,
    multiplier = 1.0
  ): number {
    const table = this.requireTable(sex);
    const byHeight = [...table].sort((a, b) => a.height - b.height);
    const base = this.interpolate(byHeight, 'height', heightCm);
    return base * multiplier;
  }

  // --- helpers ---
  private static requireTable(sex: SexValue): ReadonlyArray<CurvePoint> {
    const t = this.TABLES[sex];
    if (!t || !t.length) throw new Error(`No growth data available for sex="${sex}"`);
    return t;
  }

  private static interpolate(
    arr: ReadonlyArray<CurvePoint>,
    key: 'age' | 'height',
    value: number
  ): number {
    if (!Number.isFinite(value)) throw new Error(`${key} must be a number`);

    // Clamp to range
    if (value <= arr[0][key]) return arr[0].weight;
    if (value >= arr[arr.length - 1][key]) return arr[arr.length - 1].weight;

    // Binary search for bounding segment
    let lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      const midVal = arr[mid][key];
      if (midVal === value) return arr[mid].weight;
      if (midVal < value) lo = mid + 1;
      else hi = mid - 1;
    }
    const i0 = hi;
    const i1 = lo;

    const p0 = arr[i0];
    const p1 = arr[i1];
    const t = (value - p0[key]) / (p1[key] - p0[key]);
    return p0.weight + t * (p1.weight - p0.weight);
  }

}

export class BmiCalculation {

  /**
   * Calculate adult weight based on height and sex,
   * using a base BMI and an optional habitus multiplier.
   *
   * @param sex - 'male' or 'female'
   * @param height - height in centimeters
   * @param multiplier - factor 0.8–1.3 to reflect slim/stocky habitus (default = 1.0)
   * @returns estimated weight in kilograms
   */
  static calculateAdultWeightByHeight(
    sex: SexValue,
    height: number,
    multiplier: number = 1.0
  ): number {
    if (height <= 0) {
      throw new Error('Height must be positive');
    }
    if (multiplier < 0.8 || multiplier > 1.7) {
      throw new Error('Multiplier must be between 0.8 and 1.7');
    }

    // Base BMI: slightly different for male/female to reflect typical lean mass
    const baseBmi = (sex === 'male' ? 22 : 21) * multiplier;

    // Convert cm to m
    const heightMeters = height / 100;

    // Weight = BMI × height²
    const weight = baseBmi * heightMeters * heightMeters;

    return Math.round(weight * 10) / 10; // round to 0.1 kg

  }

}