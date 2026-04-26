import { MedId, PerMedicationConfig } from '@/types/medication'
import type { RegionProfile } from '@/types/config'
import { MedSettings } from '@/types/config'
import { MedSettingsOverride } from '@/types/config'

import { medications } from '@/data/medications'


const buildMedicationDefaults = (): Record<string, PerMedicationConfig> => {
  const defaults: Record<string, PerMedicationConfig> = {};

  for (const medication of medications) {
    const packageSettings: Record<string, boolean> = {};

    for (const medicationPackage of medication.packages) {
      packageSettings[medicationPackage.id] = true;
    }

    defaults[medication.id] = {
      enabled: true,
      packages: packageSettings,
    };
  }

  return defaults;
}

export const createDefaultMedSettings = (): MedSettings => ({
  medications: buildMedicationDefaults(),
  selectedRegionId: null,
  themeMode: 'auto',
});

const syncMedicationEnabledWithPackages = (medicationSettings: PerMedicationConfig): PerMedicationConfig => {
  const hasEnabledPackage = Object.values(medicationSettings.packages).some(Boolean);
  medicationSettings.enabled = hasEnabledPackage;
  return medicationSettings;
};

export const normalizeMedSettings = (value: unknown): MedSettings => {
  const defaults = createDefaultMedSettings();

  if (!value || typeof value !== 'object') {
    return defaults;
  }

  const input = value as Partial<MedSettings>;

  for (const medication of medications) {
    const medId = medication.id;
    const incomingMed = input.medications?.[medId];

    defaults.medications[medId].enabled = incomingMed?.enabled ?? defaults.medications[medId].enabled;

    for (const medicationPackage of medication.packages) {
      const packageId = medicationPackage.id;
      defaults.medications[medId].packages[packageId] =
        incomingMed?.packages?.[packageId] ?? defaults.medications[medId].packages[packageId];
    }

    syncMedicationEnabledWithPackages(defaults.medications[medId]);
  }

  defaults.selectedRegionId = typeof input.selectedRegionId === 'string' || input.selectedRegionId === null
    ? input.selectedRegionId
    : defaults.selectedRegionId;

  defaults.themeMode = input.themeMode === 'auto' || input.themeMode === 'light' || input.themeMode === 'dark'
    ? input.themeMode
    : defaults.themeMode;

  return defaults
}

export const applyMedSettingsOverride = (
  baseSettings: MedSettings,
  override: MedSettingsOverride,
): MedSettings => {

  const normalized = normalizeMedSettings(baseSettings)
  if (override.selectedRegionId !== undefined) { normalized.selectedRegionId = override.selectedRegionId }
  if (!override.medications) { return normalized }

  for (const [medId, medOverride] of Object.entries(override.medications)) {

    if (!normalized.medications[medId]) { continue }

    if (typeof medOverride.enabled === 'boolean') {
      normalized.medications[medId].enabled = medOverride.enabled
    }
    if (medOverride.packages) {
      for (const [packageId, enabled] of Object.entries(medOverride.packages)) {
        if (normalized.medications[medId].packages[packageId] !== undefined) {
          normalized.medications[medId].packages[packageId] = enabled
        }
      }
    }

    syncMedicationEnabledWithPackages(normalized.medications[medId])
  }

  return normalized
}

const haveMatchingMedicationSettings = (left: MedSettings, right: MedSettings): boolean => {
  for (const medication of medications) {
    const leftMedication = left.medications[medication.id]
    const rightMedication = right.medications[medication.id]

    if (!leftMedication || !rightMedication) {
      return false
    }

    if (leftMedication.enabled !== rightMedication.enabled) {
      return false
    }

    for (const medicationPackage of medication.packages) {
      if (leftMedication.packages[medicationPackage.id] !== rightMedication.packages[medicationPackage.id]) {
        return false
      }
    }
  }

  return true
}

export const findMatchingRegionId = (settings: MedSettings): string | null => {
  const normalizedSettings = normalizeMedSettings(settings)

  for (const regionProfile of Object.values(regionProfiles)) {
    const regionSettings = applyMedSettingsOverride(createDefaultMedSettings(), regionProfile.settings)

    if (haveMatchingMedicationSettings(normalizedSettings, regionSettings)) {
      return regionProfile.id
    }
  }

  return null
}

// ############################################################################

export const regionProfiles: Record<string, RegionProfile> = {

  default: {
    id: 'default',
    label: 'Alles Anzeigen',
    settings: {
      selectedRegionId: null,
    },
  },

  lk_mei: {
    id: 'lk_mei',
    label: 'Landkreis Meißen',
    settings: {
      selectedRegionId: 'lk_mei',
      medications: {

        [MedId.Dimenhydrinat]: {
          packages: {
            supp_40mg: false,
            supp_70mg: false,
          }
        },

        [MedId.Esketamin]: {
          packages: {
            iv_5mgml_5ml: false,
            iv_25mgml_10ml: false,
          }
        },

        [MedId.Fentanyl]: {
          packages: {
            iv_0_05mgml_10ml: false,
          }
        },

        [MedId.Furosemid]: {
          packages: {
            iv_20mg: false,
          }
        },

        [MedId.Glucagon]: {
          packages: {
            nasal_3mg: false,
          }
        },

        [MedId.Glucose]: {
          packages: {
            iv_1g_10ml: false,
            iv_4g_10ml: false,
          }
        },

        [MedId.Heparin]: {
          packages: {
            iv_5000ieml_5ml: false,
            iv_5000ieml_1ml: false,
          }
        },

        [MedId.Ibuprofen]: {
          packages: {
            iv_4mgml_6mgml_100ml: false,
          }
        },

        [MedId.Ipratropiumbromid]: {
          packages: {
            inh_500ug: false,
          }
        },

        [MedId.Metamizol]: {
          enabled: false,
        },

        [MedId.Midazolam]: {
          packages: {
            iv_1mgml_5ml: false,
            iv_5mgml_3ml: false,
          }
        },

        [MedId.Morphin]: {
          packages: {
            iv_20mg: false,
          }
        },

        [MedId.Nalbuphin]: {
          enabled: false,
        },

        [MedId.Prednisolon]: {
          packages: {
            iv_100mg: false,
          },
        },

        [MedId.Tranexam]: {
          packages: {
            iv_100mgml_10ml: false,
          },
        },

        [MedId.Urapidil]: {
          packages: {
            iv_5mgml_10ml: false,
          },
        },

      },
    },
  },

}

export const regionOptions = Object.values(regionProfiles).map(({ id, label }) => ({
  id,
  label,
}))
