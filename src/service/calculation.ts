import { HabitusValue, SexValue } from "../types/patient";

export interface CurvePoint {
  height: number; // cm
  weight: number; // kg
  age: number;    // years (e.g., 0.5 = 6 months)
}

export class PatientCalculation
{

  /** Estimate weight (kg) for given age (years). */
  static calculateWeightByAge(age: number, sex: SexValue, multi: number) {
    if (age <= 15)
    {

      // for young ages, return percentile calculation
      return CurveCalculation.calculateChildWeightByAge(sex, age, multi)

    }
    else
    {

      // for older ages, return rough estimate (based on age / habitus only)
      const base = sex === 'male' ? 78 : 65

      let ageFactor = 1
      if (age < 30) ageFactor = 0.95 + (age - 18) * 0.004       // 18–30: increasing
      else if (age < 50) ageFactor = 1.02 + (age - 30) * 0.005  // 30–50: increasing
      else if (age < 70) ageFactor = 1.12 - (age - 50) * 0.004  // 50–70: decreasing
      else ageFactor = 1.04 - (age - 70) * 0.006                // >70: decreasing a lot

      const weight = base * ageFactor * multi
      return Math.round(weight)

    }
  }

  /** Estimate age (years) for a given height (cm). */
  static calculateAgeByHeight(height: number, sex: SexValue): number {

    const childAge = CurveCalculation.calculateChildAgeByHeight(sex, height)
    if (childAge !== undefined) { return childAge }

    if (sex == 'male')
    {
      if (height < 110) { return 5 }
      if (height < 125) { return 7 }
      if (height < 140) { return 11 }
      if (height < 155) { return 14 }
      if (height < 165) { return 16 }
      if (height < 175) { return 18 }
      if (height < 185) { return 21 }
      return 25
    }
    else
    {
      if (height < 105) { return 5 }
      if (height < 120) { return 7 }
      if (height < 135) { return 11 }
      if (height < 150) { return 14 }
      if (height < 160) { return 16 }
      if (height < 170) { return 18 }
      return 22
    }

  }

  /** Estimate age (years) for a given weight (kg) */
  static calculateAgeByWeight(weight: number, sex: SexValue): number {

    const childAge = CurveCalculation.calculateChildAgeByWeight(sex, weight)
    if (childAge !== undefined) { return childAge }

    if (weight < 20) { return 5 }
    if (weight < 35) { return 9 }
    if (weight < 50) { return 13 }
    if (weight < 60) { return 15 }
    if (weight < 70) { return 16 }
    if (weight < 80) { return 18 }
    if (weight < 95) { return 20 }
    return 24

  }

  /** Calculate maturity score based on height, weight and sporty habitus */
  static calculateMaturityScore(height: number|undefined, weight: number|undefined, habitus: HabitusValue): number {
    let score = 0

    if (height !== undefined)
    {
      if (height >= 175) { score += 3 }
      else if (height >= 165) { score += 2 }
      else if (height >= 155) { score += 1 }
    }

    if (weight !== undefined)
    {
      if (weight >= 95) { score += 3 }
      else if (weight >= 80) { score += 2 }
      else if (weight >= 65) { score += 1 }
    }

    if (habitus == 'sporty') { score += 1 }

    return score
  }


}

export class CurveCalculation
{

  private static readonly TABLES: Record<SexValue, ReadonlyArray<CurvePoint>> = {
    male: [
      { height: 51.0, weight: 3.5,   age: 0.000 }, // birth
      { height: 54.5, weight: 4.4,   age: 0.083 }, // 1 mo
      { height: 57.8, weight: 5.2,   age: 0.167 }, // 2 mo
      { height: 61.4, weight: 6.1,   age: 0.250 }, // 3 mo
      { height: 63.9, weight: 6.7,   age: 0.333 }, // 4 mo
      { height: 66.4, weight: 7.3,   age: 0.417 }, // 5 mo
      { height: 68.9, weight: 7.9,   age: 0.500 }, // 6 mo
      { height: 70.4, weight: 8.3,   age: 0.583 }, // 7 mo
      { height: 71.8, weight: 8.7,   age: 0.667 }, // 8 mo
      { height: 73.2, weight: 9.1,   age: 0.750 }, // 9 mo
      { height: 74.6, weight: 9.3,   age: 0.833 }, //10 mo
      { height: 75.8, weight: 9.6,   age: 0.917 }, //11 mo
      { height: 77.1, weight: 9.9,   age: 1.000 }, // 1 yr
      { height: 89.4, weight:12.7,   age: 2.000 },
      { height: 97.8, weight:15.3,   age: 3.000 },
      { height:105.6, weight:17.4,   age: 4.000 },
      { height:112.5, weight:20.0,   age: 5.000 },
      { height:117.8, weight:21.5,   age: 6.000 },
      { height:124.5, weight:24.6,   age: 7.000 },
      { height:130.8, weight:27.7,   age: 8.000 },
      { height:136.4, weight:31.0,   age: 9.000 },
      { height:141.6, weight:33.8,   age:10.000 },
      { height:146.7, weight:38.9,   age:11.000 },
      { height:152.3, weight:43.3,   age:12.000 },
      { height:159.2, weight:48.9,   age:13.000 },
      { height:167.0, weight:55.6,   age:14.000 },
      { height:173.2, weight:61.7,   age:15.000 },
    ],
    female: [
      { height: 50.5, weight: 3.4,   age: 0.000 }, // birth
      { height: 53.7, weight: 4.1,   age: 0.083 }, // 1 mo
      { height: 56.8, weight: 4.9,   age: 0.167 }, // 2 mo
      { height: 60.0, weight: 5.6,   age: 0.250 }, // 3 mo
      { height: 62.4, weight: 6.2,   age: 0.333 }, // 4 mo
      { height: 65.0, weight: 6.9,   age: 0.417 }, // 5 mo
      { height: 67.4, weight: 7.5,   age: 0.500 }, // 6 mo
      { height: 68.9, weight: 7.9,   age: 0.583 }, // 7 mo
      { height: 70.4, weight: 8.3,   age: 0.667 }, // 8 mo
      { height: 71.8, weight: 8.6,   age: 0.750 }, // 9 mo
      { height: 73.0, weight: 8.9,   age: 0.833 }, //10 mo
      { height: 74.2, weight: 9.2,   age: 0.917 }, //11 mo
      { height: 75.3, weight: 9.4,   age: 1.000 }, // 1 yr
      { height: 87.7, weight:12.3,   age: 2.000 },
      { height: 97.0, weight:14.7,   age: 3.000 },
      { height:104.7, weight:16.8,   age: 4.000 },
      { height:112.2, weight:19.2,   age: 5.000 },
      { height:117.6, weight:21.4,   age: 6.000 },
      { height:123.7, weight:24.1,   age: 7.000 },
      { height:129.5, weight:27.0,   age: 8.000 },
      { height:135.3, weight:30.6,   age: 9.000 },
      { height:141.2, weight:34.7,   age:10.000 },
      { height:147.7, weight:39.4,   age:11.000 },
      { height:154.4, weight:44.9,   age:12.000 },
      { height:159.6, weight:50.1,   age:13.000 },
      { height:162.8, weight:54.0,   age:14.000 },
      { height:164.6, weight:56.8,   age:15.000 },
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
    const base = this.interpolate(byAge, 'age', ageYears, 'weight');
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
    const base = this.interpolate(byHeight, 'height', heightCm, 'weight');
    return base * multiplier;
  }

  /** Estimate child age (years) for given weight (kg). */
  static calculateChildAgeByWeight(
    sex: SexValue,
    weightKg: number
  ): number | undefined {
    const table = this.requireTable(sex);
    const byWeight = [...table].sort((a, b) => a.weight - b.weight);
    const maxWeight = byWeight[byWeight.length - 1].weight;
    if (weightKg > maxWeight) { return undefined; }
    return this.interpolate(byWeight, 'weight', weightKg, 'age');
  }

  /** Estimate child age (years) for given height (cm). */
  static calculateChildAgeByHeight(
    sex: SexValue,
    heightCm: number
  ): number | undefined {
    const table = this.requireTable(sex);
    const byHeight = [...table].sort((a, b) => a.height - b.height);
    const maxHeight = byHeight[byHeight.length - 1].height;
    if (heightCm > maxHeight) { return undefined; }
    return this.interpolate(byHeight, 'height', heightCm, 'age');
  }

  // --- helpers ---
  private static requireTable(sex: SexValue): ReadonlyArray<CurvePoint> {
    const t = this.TABLES[sex];
    if (!t || !t.length) throw new Error(`No growth data available for sex="${sex}"`);
    return t;
  }

  private static interpolate(
    arr: ReadonlyArray<CurvePoint>,
    key: 'age' | 'height' | 'weight',
    value: number,
    target: 'age' | 'height' | 'weight'
  ): number {
    if (!Number.isFinite(value)) throw new Error(`${key} must be a number`);

    // Clamp to range
    if (value <= arr[0][key]) return arr[0][target];
    if (value >= arr[arr.length - 1][key]) return arr[arr.length - 1][target];

    // Binary search for bounding segment
    let lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      const midVal = arr[mid][key];
      if (midVal === value) return arr[mid][target];
      if (midVal < value) lo = mid + 1;
      else hi = mid - 1;
    }
    const i0 = hi;
    const i1 = lo;

    const p0 = arr[i0];
    const p1 = arr[i1];
    const t = (value - p0[key]) / (p1[key] - p0[key]);
    return p0[target] + t * (p1[target] - p0[target]);
  }

}

export class BmiCalculation
{

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