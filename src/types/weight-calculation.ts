import { SexValue } from "./emergency";

export interface CurvePoint {
  height: number; // cm
  weight: number; // kg
  age: number;    // years (e.g., 0.5 = 6 months)
}

export class CurveCalculation {

  private static readonly TABLES: Record<SexValue, ReadonlyArray<CurvePoint>> = {
    male: [
      { height: 52.1, weight: 3.5,   age: 0.000 }, // birth
      { height: 56.0, weight: 4.5,   age: 0.083 }, // 1 mo
      { height: 59.0, weight: 5.6,   age: 0.167 }, // 2 mo
      { height: 62.0, weight: 6.4,   age: 0.250 }, // 3 mo
      { height: 64.5, weight: 7.1,   age: 0.333 }, // 4 mo
      { height: 67.0, weight: 7.7,   age: 0.417 }, // 5 mo
      { height: 69.0, weight: 8.2,   age: 0.500 }, // 6 mo
      { height: 70.5, weight: 8.6,   age: 0.583 }, // 7 mo
      { height: 72.0, weight: 9.0,   age: 0.667 }, // 8 mo
      { height: 73.0, weight: 9.3,   age: 0.750 }, // 9 mo
      { height: 74.0, weight: 9.6,   age: 0.833 }, //10 mo
      { height: 75.0, weight: 9.9,   age: 0.917 }, //11 mo
      { height: 82.9, weight:11.4,   age: 1.000 }, // 1 yr
      { height: 92.9, weight:14.1,   age: 2.000 },
      { height:101.2, weight:16.4,   age: 3.000 },
      { height:108.0, weight:18.4,   age: 4.000 },
      { height:114.8, weight:20.7,   age: 5.000 },
      { height:121.2, weight:23.7,   age: 6.000 },
      { height:128.0, weight:27.0,   age: 7.000 },
      { height:133.5, weight:30.5,   age: 8.000 },
      { height:139.0, weight:34.0,   age: 9.000 },
      { height:144.5, weight:38.0,   age:10.000 },
      { height:150.0, weight:42.5,   age:11.000 },
      { height:156.0, weight:47.5,   age:12.000 },
    ],
    female: [
      { height: 51.3, weight: 3.4,   age: 0.000 }, // birth
      { height: 54.0, weight: 4.3,   age: 0.083 }, // 1 mo
      { height: 57.0, weight: 5.2,   age: 0.167 }, // 2 mo
      { height: 60.0, weight: 6.0,   age: 0.250 }, // 3 mo
      { height: 62.5, weight: 6.6,   age: 0.333 }, // 4 mo
      { height: 65.0, weight: 7.2,   age: 0.417 }, // 5 mo
      { height: 67.0, weight: 7.7,   age: 0.500 }, // 6 mo
      { height: 68.5, weight: 8.1,   age: 0.583 }, // 7 mo
      { height: 70.0, weight: 8.4,   age: 0.667 }, // 8 mo
      { height: 71.0, weight: 8.7,   age: 0.750 }, // 9 mo
      { height: 72.0, weight: 9.0,   age: 0.833 }, //10 mo
      { height: 73.0, weight: 9.3,   age: 0.917 }, //11 mo
      { height: 78.5, weight:10.8,   age: 1.000 }, // 1 yr
      { height: 91.1, weight:13.3,   age: 2.000 },
      { height:100.0, weight:15.8,   age: 3.000 },
      { height:107.2, weight:18.1,   age: 4.000 },
      { height:114.3, weight:20.5,   age: 5.000 },
      { height:120.7, weight:23.2,   age: 6.000 },
      { height:127.0, weight:26.0,   age: 7.000 },
      { height:133.0, weight:30.0,   age: 8.000 },
      { height:139.0, weight:34.0,   age: 9.000 },
      { height:145.0, weight:39.0,   age:10.000 },
      { height:151.0, weight:44.0,   age:11.000 },
      { height:157.0, weight:49.0,   age:12.000 },
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