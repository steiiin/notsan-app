export interface PerMedicationConfig {
  enabled: boolean;
  packages: Record<string, boolean>;
}

export type ThemeMode = 'auto' | 'light' | 'dark';

export interface MedSettings {
  medications: Record<string, PerMedicationConfig>;
  selectedRegionId?: string | null;
  themeMode?: ThemeMode;
}

export interface MedSettingsOverride {
  medications?: Record<string, Partial<PerMedicationConfig> & { packages?: Record<string, boolean> }>;
  selectedRegionId?: string | null;
  themeMode?: ThemeMode;
}

export interface RegionProfile {
  id: string;
  label: string;
  settings: MedSettingsOverride;
}
