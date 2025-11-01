
export type KofAgeValue = 'adult'|'child'|'baby'

export type KofPaintState = {
  width: number,
  height: number,
  classMapRLE: number[],
  regionMapRLE: number[],
}

export type KofCalculation = {

  perc1st: number,
  perc2nd: number,
  perc3rd: number,
  percTotal: number,

  has1st: boolean,
  has2nd: boolean,
  has3rd: boolean,

  criticalRegions: {
    face: number,
    hasFace: boolean,
    hands: number,
    hasHands: boolean,
    genital: number,
    hasGenital: boolean,
  },

}

export interface KofInfo {
  patientAge: KofAgeValue,
  paintState?: KofPaintState,
  calculation?: KofCalculation,
}