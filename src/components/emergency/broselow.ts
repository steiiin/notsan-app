export interface BroselowCode {
  code: string
  colorCode: string
  range: string
}

interface BroselowZoneDefinition {
  code: string
  colorCode: string
  min: number
}

interface BroselowZone extends BroselowZoneDefinition {
  max: number
}

const BROSELOW_MAX_WEIGHT_KG = 36
const BROSELOW_ZONE_DEFINITIONS: BroselowZoneDefinition[] = [
  { code: 'Grau',   colorCode: 'grey',   min: 0 },
  { code: 'Rosa',   colorCode: 'pink',   min: 6 },
  { code: 'Rot',    colorCode: 'red',    min: 8 },
  { code: 'Lila',   colorCode: 'purple', min: 10 },
  { code: 'Gelb',   colorCode: 'yellow', min: 12 },
  { code: 'Weiß',   colorCode: 'white',  min: 15 },
  { code: 'Blau',   colorCode: 'blue',   min: 19 },
  { code: 'Orange', colorCode: 'orange', min: 24 },
  { code: 'Grün',   colorCode: 'green',  min: 30 },
]

const BROSELOW_ZONES: BroselowZone[] = BROSELOW_ZONE_DEFINITIONS.map((zone, index, array) => {
  const nextMin = array[index + 1]?.min ?? BROSELOW_MAX_WEIGHT_KG
  return {
    ...zone,
    max: nextMin,
  }
})

export const getBroselowCode = (weightKg: number): BroselowCode | null => {
  if (!Number.isFinite(weightKg) || weightKg < 0) {
    return null
  }
  const zone = BROSELOW_ZONES.find(z => weightKg > z.min && weightKg <= z.max)
  if (!zone) return null

  return {
    code: zone.code,
    colorCode: zone.colorCode,
    range: `${Math.max(zone.min, 3)}–${zone.max} kg`,
  }
}
