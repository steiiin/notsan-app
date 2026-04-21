export interface PerMedicationConfig {
  enabled: boolean;
  packages: Record<string, boolean>;
}

export interface MedSettings {
  medications: Record<string, PerMedicationConfig>;
  selectedRegionId?: string | null;
}

export interface MedSettingsOverride {
  medications?: Record<string, Partial<PerMedicationConfig> & { packages?: Record<string, boolean> }>;
  selectedRegionId?: string | null;
}

export interface RegionProfile {
  id: string;
  label: string;
  settings: MedSettingsOverride;
}
