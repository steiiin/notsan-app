import { round } from "@/service/math"
import { BmiCalculation, CurveCalculation } from "../service/weight-calculation"

export type WeightAccuracyValue = 'direct' | 'estimate'
export type WeightEstimateByValue = 'by-age' | 'by-height'
export type SexValue = 'male' | 'female'
export type HabitusModeValue = 'child' | 'adult'
export type HabitusValue =
  | 'very-thin'
  | 'thin'
  | 'normal'
  | 'sporty'
  | 'lightly-overweight'
  | 'overweight'
  | 'very-overweight'
export type CalcMethod = 'direct' | 'by-age' | 'by-height-curve' | 'by-height-bmi' | 'invalid_weight' | 'invalid_age' | 'invalid_height' | 'undefined'

export class Patient {

  public WeightAccuracy: WeightAccuracyValue
  public WeightEstimateBy: WeightEstimateByValue

  public Sex: SexValue
  public Age: number
  public Height: number
  public Habitus: HabitusValue

  public Weight: number

  private static readonly DEFAULT_HABITUS: HabitusValue = 'normal'

  private static readonly HABITUS_MULTIPLIERS: Record<HabitusModeValue, Record<HabitusValue, number>> = {
    child: {
      'very-thin': 0.85,
      thin: 0.92,
      normal: 1.00,
      sporty: 1.08,               // +8%
      'lightly-overweight': 1.10, // +10%
      overweight: 1.20,           // +20%
      'very-overweight': 1.35,    // +35%
    },
    adult: {
      'very-thin': 0.86,
      thin: 0.93,
      normal: 1.00,
      sporty: 1.10,               // +10%
      'lightly-overweight': 1.12, // +12%
      overweight: 1.25,           // +25%
      'very-overweight': 1.40,    // +40%
    },
  }

  private static readonly HABITUS_AGE_OFFSETS: Record<HabitusValue, number> = {
    'very-thin': -2,
    thin: -1,
    normal: 0,
    sporty: 1,
    'lightly-overweight': 2,
    overweight: 3,
    'very-overweight': 4,
  }

  // ######################################################

  constructor()
  {
    this.WeightAccuracy = 'direct'
    this.WeightEstimateBy = 'by-height'

    this.Sex = 'male'
    this.Age = 50
    this.Height = 180
    this.Habitus = Patient.DEFAULT_HABITUS

    this.Weight = 80
  }

  // ######################################################

  get currentHabitusMode(): HabitusModeValue {
    if (
      this.WeightAccuracy == 'estimate' &&
      (
        (this.WeightEstimateBy == 'by-age' && this.Age <= 12) ||
        (this.WeightEstimateBy == 'by-height' && this.Height <= 150)
      )
    ) { return 'child' }
    else { return 'adult' }
  }

  // ######################################################

  get currentHabitusMulti(): number {
    const mode = this.currentHabitusMode
    const modeMultipliers = Patient.HABITUS_MULTIPLIERS[mode]
    return modeMultipliers[this.Habitus] ?? modeMultipliers[Patient.DEFAULT_HABITUS]
  }

  // ######################################################

  private estimateAgeFromHeight(): number | undefined
  {
    if (!this.Height || this.Height <= 0) { return undefined }

    const childAge = CurveCalculation.calculateChildAgeByHeight(this.Sex, this.Height)
    if (childAge !== undefined) { return childAge }

    const height = this.Height
    if (this.Sex == 'male')
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

    if (height < 105) { return 5 }
    if (height < 120) { return 7 }
    if (height < 135) { return 11 }
    if (height < 150) { return 14 }
    if (height < 160) { return 16 }
    if (height < 170) { return 18 }
    return 22
  }

  private estimateAgeFromWeight(): number | undefined
  {
    if (!this.Weight || this.Weight <= 0) { return undefined }

    const childAge = CurveCalculation.calculateChildAgeByWeight(this.Sex, this.Weight)
    if (childAge !== undefined) { return childAge }

    const weight = this.Weight
    if (weight < 20) { return 5 }
    if (weight < 35) { return 9 }
    if (weight < 50) { return 13 }
    if (weight < 60) { return 15 }
    if (weight < 70) { return 16 }
    if (weight < 80) { return 18 }
    if (weight < 95) { return 20 }
    return 24
  }

  private get maturityScore(): number
  {
    let score = 0

    if (this.Height >= 175) { score += 3 }
    else if (this.Height >= 165) { score += 2 }
    else if (this.Height >= 155) { score += 1 }

    if (this.Weight >= 95) { score += 3 }
    else if (this.Weight >= 80) { score += 2 }
    else if (this.Weight >= 65) { score += 1 }

    if (this.Habitus == 'sporty') { score += 1 }
    else if (this.Habitus == 'lightly-overweight') { score += 2 }
    else if (this.Habitus == 'overweight') { score += 3 }
    else if (this.Habitus == 'very-overweight') { score += 4 }

    if (this.currentHabitusMode == 'adult') { score += 1 }

    return score
  }

  // ######################################################

  get estimatedWeightCalcMethod(): CalcMethod
  {


    // direct input
    if (this.WeightAccuracy == 'direct')
      {

        // filter empty value
        if (!this.Weight) { return 'undefined' }

        // check if Weight in valid range
        if (this.Weight > 0 && this.Weight < 500)
        {
          return 'direct'
        }
        else
        {
          return 'invalid_weight'
        }

      }

      // estimate by ...
      if (this.WeightAccuracy == 'estimate')
      {

        // ... age
        if (this.WeightEstimateBy == 'by-age')
        {

          // filter empty value
          if (!this.Age) { return 'undefined' }

          // check if Age in valid range
          if (this.Age >= 0 && this.Age <= 15)
          {
            return 'by-age'
          }
          else
          {
            return 'invalid_age' // too old, to use curve method based on age
          }

        }

        // ... height
        if (this.WeightEstimateBy == 'by-height')
        {

          // filter empty value
          if (!this.Height) { return 'undefined' }

          // check if height in valid range
          if (this.Height >= 30 && this.Height < 300)
          {

            // use curve method for children
            if (this.Height <= 150)
            {
              return 'by-height-curve'
            }

            // otherwise use BMI method
            else
            {
              return 'by-height-bmi'
            }

          }
          else
          {
            return 'invalid_height'
          }

        }

      }

      // in all other cases return nothing
      return 'undefined'

  }

  get estimatedWeight(): number
  {

    if (this.estimatedWeightCalcMethod == 'direct') { return this.Weight }
    if (this.estimatedWeightCalcMethod == 'by-age') {
      return CurveCalculation.calculateChildWeightByAge(
        this.Sex, this.Age, this.currentHabitusMulti
      )
    }
    if (this.estimatedWeightCalcMethod == 'invalid_age') {

      // for too old ages, return rough estimate (based on age / habitus only)
      const base = this.Sex === 'male' ? 78 : 65

      let ageFactor = 1
      if (this.Age < 30) ageFactor = 0.95 + (this.Age - 18) * 0.004     // 18–30: langsamer Anstieg
      else if (this.Age < 50) ageFactor = 1.02 + (this.Age - 30) * 0.005 // 30–50: leichter Anstieg
      else if (this.Age < 70) ageFactor = 1.12 - (this.Age - 50) * 0.004 // 50–70: langsamer Rückgang
      else ageFactor = 1.04 - (this.Age - 70) * 0.006               // >70: stärkerer Rückgang

      const weight = base * ageFactor * this.currentHabitusMulti
      return Math.round(weight)

    }

    if (this.estimatedWeightCalcMethod == 'by-height-curve') {
      return CurveCalculation.calculateChildWeightByHeight(
        this.Sex, this.Height, this.currentHabitusMulti
      )
    }
    if (this.estimatedWeightCalcMethod == 'by-height-bmi') {
      return BmiCalculation.calculateAdultWeightByHeight(
        this.Sex, this.Height, this.currentHabitusMulti
      )
    }
    return -1

  }

  // ######################################################

  get isAgeDirectlyUsed(): boolean {
    return this.WeightAccuracy === 'estimate' && this.WeightEstimateBy === 'by-age';
  }
  get isHeightDirectlyUsed(): boolean {
    return this.WeightAccuracy === 'estimate' && this.WeightEstimateBy === 'by-height';
  }
  get isWeightDirectlyUsed(): boolean {
    return this.WeightAccuracy === 'direct';
  }

  // ######################################################

  get estimatedAge(): number
  {

    if (this.isAgeDirectlyUsed && this.Age && this.Age > 0) { return this.Age }

    const estimates: number[] = []

    if (this.isHeightDirectlyUsed) {
      const heightAge = this.estimateAgeFromHeight()
      if (heightAge !== undefined) { estimates.push(heightAge) }
    }
    if (this.isWeightDirectlyUsed) {
      const weightAge = this.estimateAgeFromWeight()
      if (weightAge !== undefined) { estimates.push(weightAge) }
    }
    if (estimates.length == 0) { return 0 }

    const habitusOffset = Patient.HABITUS_AGE_OFFSETS[this.Habitus] ?? 0
    const base = estimates.reduce((sum, value) => sum + value, 0) / estimates.length

    let estimate = base + habitusOffset

    if (estimate < 1) { return round(estimate, 0.01) }
    return round(estimate, 1)

  }

  // ######################################################

  get isLikelyAnAdult(): boolean
  {
    const knownAge = this.isAgeDirectlyUsed && this.Age && this.Age > 0 ? this.Age : undefined
    const maturity = this.maturityScore
    const estimate = this.estimatedAge

    if (knownAge !== undefined)
    {
      if (knownAge >= 18) { return true }
      if (knownAge <= 12) { return false }
      if (knownAge >= 16 && maturity >= 2) { return true }
      if (knownAge >= 15 && maturity >= 3) { return true }
      if (knownAge >= 14 && maturity >= 4) { return true }
      return false
    }

    if (estimate >= 18) { return true }
    if (estimate <= 12) { return false }
    if (estimate >= 16 && maturity >= 2) { return true }
    if (estimate >= 15 && maturity >= 4) { return true }
    if (maturity >= 5) { return true }

    return false
  }

  // ######################################################

  get isValid(): boolean {
    return this.estimatedWeightCalcMethod == 'direct'
      || this.estimatedWeightCalcMethod == 'by-age'
      || this.estimatedWeightCalcMethod == 'invalid_age'
      || this.estimatedWeightCalcMethod == 'by-height-bmi'
      || this.estimatedWeightCalcMethod == 'by-height-curve'
  }

}
