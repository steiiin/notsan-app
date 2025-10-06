export interface BroselowCode {
  code: string
  colorCode: string
  range: string
}

interface BroselowZoneDefinition {
  code: string
  colorCode: string
  min: number
  max: number
}

interface BroselowZone extends BroselowZoneDefinition {
  coverageMax: number
}

const BROSELOW_ZONE_DEFINITIONS: BroselowZoneDefinition[] = [
  { code: 'Grau',   colorCode: 'grey',   min: 0,  max: 5 },
  { code: 'Rosa',   colorCode: 'pink',   min: 6,  max: 7 },
  { code: 'Rot',    colorCode: 'red',    min: 8,  max: 9 },
  { code: 'Lila',   colorCode: 'purple', min: 10, max: 11 },
  { code: 'Gelb',   colorCode: 'yellow', min: 12, max: 14 },
  { code: 'Weiß',   colorCode: 'white',  min: 15, max: 18 },
  { code: 'Blau',   colorCode: 'blue',   min: 19, max: 23 },
  { code: 'Orange', colorCode: 'orange', min: 24, max: 29 },
  { code: 'Grün',   colorCode: 'green',  min: 30, max: 36 },
]

const BROSELOW_ZONES: BroselowZone[] = BROSELOW_ZONE_DEFINITIONS.map((zone, index, array) => {
  const nextMin = array[index + 1]?.min ?? Number.POSITIVE_INFINITY
  return {
    ...zone,
    coverageMax: nextMin === Number.POSITIVE_INFINITY ? Number.POSITIVE_INFINITY : nextMin - Number.EPSILON,
  }
})

export const getBroselowCode = (weightKg: number): BroselowCode | null => {
  if (!Number.isFinite(weightKg) || weightKg < 0) {
    return null
  }

  const zone = BROSELOW_ZONES.find(z => weightKg >= z.min && weightKg <= z.coverageMax)
  if (!zone) return null

  return {
    code: zone.code,
    colorCode: zone.colorCode,
    range: `${Math.max(zone.min, 3)}–${zone.max} kg`,
  }
}
