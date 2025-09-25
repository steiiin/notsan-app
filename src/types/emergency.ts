export type WeightAccuracyValue = 'direct' | 'estimate'
export type WeightEstimateByValue = 'by-age' | 'by-height'

export class Patient {

  public WeightAccuracy: WeightAccuracyValue
  public WeightEstimateBy: WeightEstimateByValue

  public Age: number
  public Height: number

  public Weight: number

  constructor()
  {
    this.WeightAccuracy = 'direct'
    this.WeightEstimateBy = 'by-age'

    this.Age = 50
    this.Height = 180

    this.Weight = 80
  }

  get isValid(): boolean { return this.Weight>0 && this.Weight<500 }

}