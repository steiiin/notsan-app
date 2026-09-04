import { describe, expect, it } from 'vitest'

import {
  applyMedSettingsOverride,
  createDefaultMedSettings,
  findMatchingRegionId,
  normalizeMedSettings,
  regionProfiles,
} from '@/data/regions'
import { MedId } from '@/types/medication'

describe('medication region settings', () => {
  it('keeps medications explicitly disabled by the Landkreis Meißen preset disabled', () => {
    const settings = applyMedSettingsOverride(
      createDefaultMedSettings(),
      regionProfiles.lk_mei.settings,
    )

    expect(settings.medications[MedId.Fentanyl].enabled).toBe(false)
    expect(settings.medications[MedId.Metamizol].enabled).toBe(false)
    expect(settings.medications[MedId.Nalbuphin].enabled).toBe(false)
  })

  it('preserves an explicitly disabled medication during normalization', () => {
    const settings = createDefaultMedSettings()
    settings.medications[MedId.Fentanyl].enabled = false

    const normalized = normalizeMedSettings(settings)

    expect(Object.values(normalized.medications[MedId.Fentanyl].packages).every(Boolean)).toBe(true)
    expect(normalized.medications[MedId.Fentanyl].enabled).toBe(false)
  })

  it('derives medication availability for package-only overrides', () => {
    const partiallyAvailable = applyMedSettingsOverride(createDefaultMedSettings(), {
      medications: {
        [MedId.Fentanyl]: {
          packages: {
            iv_0_05mgml_10ml: false,
          },
        },
      },
    })
    const fullyUnavailable = applyMedSettingsOverride(createDefaultMedSettings(), {
      medications: {
        [MedId.Metamizol]: {
          packages: {
            iv_500mgml_2ml: false,
          },
        },
      },
    })

    expect(partiallyAvailable.medications[MedId.Fentanyl].enabled).toBe(true)
    expect(fullyUnavailable.medications[MedId.Metamizol].enabled).toBe(false)
  })

  it('recognizes normalized Landkreis Meißen settings as the matching region', () => {
    const settings = applyMedSettingsOverride(
      createDefaultMedSettings(),
      regionProfiles.lk_mei.settings,
    )

    expect(findMatchingRegionId(normalizeMedSettings(settings))).toBe('lk_mei')
  })
})
