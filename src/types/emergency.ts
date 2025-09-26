import { BmiCalculation, CurveCalculation } from "./weight-calculation"

export type WeightAccuracyValue = 'direct' | 'estimate'
export type WeightEstimateByValue = 'by-age' | 'by-height'
export type SexValue = 'male' | 'female'
export type HabitusModeValue = 'child' | 'adult'
export type WeightError = 'invalid_weight' | 'invalid_age' | 'invalid_height' | 'undefined'

export class Patient {

  public WeightAccuracy: WeightAccuracyValue
  public WeightEstimateBy: WeightEstimateByValue

  public Sex: SexValue
  public Age: number
  public Height: number
  public HabitusMultiplier: number

  public Weight: number

  // ######################################################

  constructor()
  {
    this.WeightAccuracy = 'direct'
    this.WeightEstimateBy = 'by-height'

    this.Sex = 'male'
    this.Age = 50
    this.Height = 180
    this.HabitusMultiplier = 1

    this.Weight = 80
  }

  // ######################################################

  get currentHabitusMode(): HabitusModeValue {
    if (
      this.WeightAccuracy == 'estimate' &&
      (
        (this.WeightEstimateBy == 'by-age' && this.Age <= 12)
        || (this.WeightEstimateBy == 'by-height' && this.Height <= 150)
      )
    ) { return 'child' }
    else { return 'adult' }
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
            this.Sex, this.Age, this.HabitusMultiplier
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
              this.Sex, this.Height, this.HabitusMultiplier
            )

          }

          // otherwise use BMI method
          else
          {

            return BmiCalculation.calculateAdultWeightByHeight(
              this.Sex, this.Height, this.HabitusMultiplier
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
