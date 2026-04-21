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
});

const ensureAtLeastOnePackageEnabled = (medicationSettings: PerMedicationConfig): PerMedicationConfig => {
  const packageIds = Object.keys(medicationSettings.packages);

  if (packageIds.length === 0) {
    return medicationSettings;
  }

  const hasEnabledPackage = packageIds.some((packageId) => medicationSettings.packages[packageId]);

  if (hasEnabledPackage) {
    return medicationSettings;
  }

  medicationSettings.packages[packageIds[0]] = true;
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

    ensureAtLeastOnePackageEnabled(defaults.medications[medId]);
  }

  defaults.selectedRegionId = typeof input.selectedRegionId === 'string' || input.selectedRegionId === null
    ? input.selectedRegionId
    : defaults.selectedRegionId;

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

    ensureAtLeastOnePackageEnabled(normalized.medications[medId])
  }

  return normalized
}

export const ensureMedicationHasEnabledPackage = (settings: MedSettings, medId: string): MedSettings => {
  if (!settings.medications[medId]) { return settings }
  ensureAtLeastOnePackageEnabled(settings.medications[medId])
  return settings
}

// ############################################################################

export const regionProfiles: Record<string, RegionProfile> = {

  default: {
    id: 'default',
    label: 'Standard',
    settings: {
      selectedRegionId: null,
    },
  },

  rdb_nord: {
    id: 'lk_mei',
    label: 'Landkreis Meißen (Stub)',
    settings: {
      selectedRegionId: 'lk_mei',
      medications: {
        [MedId.Prednisolon]: {
          packages: {
            supp_100mg: false,
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
