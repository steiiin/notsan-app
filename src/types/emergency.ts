import { BmiCalculation, CurveCalculation } from "./weight-calculation"

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
export type WeightError = 'invalid_weight' | 'invalid_age' | 'invalid_height' | 'undefined'

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
      sporty: 1.10,
      'lightly-overweight': 1.10,
      overweight: 1.20,
      'very-overweight': 1.30,
    },
    adult: {
      'very-thin': 0.84,
      thin: 0.91,
      normal: 1.05,
      sporty: 1.23,
      'lightly-overweight': 1.27,
      overweight: 1.45,
      'very-overweight': 1.68,
    },
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

  get currentWeight(): number|WeightError
  {

    // direct input
    if (this.WeightAccuracy == 'direct')
    {

      // check if Weight in valid range
      if (this.Weight > 0 && this.Weight < 500)
      {
        return this.Weight
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

        // check if Age in valid range
        if (this.Age >= 0 && this.Age <= 12)
        {

          return CurveCalculation.calculateChildWeightByAge(
            this.Sex, this.Age, this.currentHabitusMulti
          )

        }
        else
        {
          return 'invalid_age' // too old, to use curve method based on age
        }

      }

      // ... height
      if (this.WeightEstimateBy == 'by-height')
      {

        // check if height in valid range
        if (this.Height >= 30 && this.Height < 300)
        {

          // use curve method for children
          if (this.Height <= 150)
          {

            return CurveCalculation.calculateChildWeightByHeight(
              this.Sex, this.Height, this.currentHabitusMulti
            )

          }

          // otherwise use BMI method
          else
          {

            return BmiCalculation.calculateAdultWeightByHeight(
              this.Sex, this.Height, this.currentHabitusMulti
            )

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

  // ######################################################

  get isValid(): boolean { return this.Weight>0 && this.Weight<500 }

}
