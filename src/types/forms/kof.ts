
export type KofAgeValue = 'adult'|'child'|'baby'

export type KofPaintState = {
  width: number,
  height: number,
  classMapRLE: number[],
  regionMapRLE: number[],
}

export interface KofInfo {
  patientAge: KofAgeValue,
  paintState?: KofPaintState,
}