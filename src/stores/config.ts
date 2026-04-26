import { defineStore } from 'pinia'
import { applyMedSettingsOverride, createDefaultMedSettings, normalizeMedSettings, regionProfiles } from '@/data/regions'
import { applyThemeMode } from '@/service/theme'
import type { MedSettings, ThemeMode } from '@/types/config'

const CONFIGSTORE_KEY = 'configstore';

export const useConfigStore = defineStore('config', {
  state: () => ({
    medSettings: createDefaultMedSettings() as MedSettings,
  }),
  getters: {
    checkMedicationEnabled: (state) => {
      return (medId: string): boolean => state.medSettings.medications[medId]?.enabled ?? true;
    },
    checkPackageEnabled: (state) => {
      return (medId: string, packageId: string): boolean => {
        if (!state.medSettings.medications[medId]?.enabled) {
          return false;
        }
        return state.medSettings.medications[medId]?.packages[packageId] ?? true;
      };
    },
  },
  actions: {
    clearSelectedRegionPreset() {
      this.medSettings.selectedRegionId = null;
    },

    toggleMedicationEnabled(medId: string, enabled?: boolean) {

      if (!this.medSettings.medications[medId]) {
        return;
      }

      const medication = this.medSettings.medications[medId];
      const nextValue = enabled ?? !medication.enabled;
      medication.enabled = nextValue;

      if (nextValue) {
        for (const packageId of Object.keys(medication.packages)) {
          medication.packages[packageId] = true;
        }
      }

      this.clearSelectedRegionPreset();
      this.persistConfig()
    },

    toggleMedicationPackage(medId: string, packageId: string, enabled?: boolean) {
      if (!this.medSettings.medications[medId]) {
        return;
      }

      const medication = this.medSettings.medications[medId];
      if (medication.packages[packageId] === undefined) {
        return;
      }

      const nextValue = enabled ?? !medication.packages[packageId];
      medication.packages[packageId] = nextValue;
      const hasAnyPackageEnabled = Object.values(medication.packages).some(Boolean);
      medication.enabled = hasAnyPackageEnabled;
      this.clearSelectedRegionPreset();
      this.persistConfig();
    },

    applyRegionPreset(regionId: string) {
      const regionProfile = regionProfiles[regionId];
      if (!regionProfile) {
        return;
      }

      const defaultSettings = createDefaultMedSettings();
      defaultSettings.themeMode = this.medSettings.themeMode;
      this.medSettings = applyMedSettingsOverride(defaultSettings, regionProfile.settings);
      this.persistConfig();
    },

    setThemeMode(themeMode: ThemeMode) {
      this.medSettings.themeMode = themeMode;
      this.persistConfig();
      applyThemeMode(themeMode);
    },

    resetToDefaultSettings() {
      this.medSettings = createDefaultMedSettings();
      this.persistConfig();
      applyThemeMode(this.medSettings.themeMode ?? 'auto');
    },

    persistConfig() {
      localStorage.setItem(CONFIGSTORE_KEY, JSON.stringify(this.medSettings));
    },

    loadConfig() {
      const persistedValue = localStorage.getItem(CONFIGSTORE_KEY);
      const defaults = createDefaultMedSettings();

      if (!persistedValue) {
        this.medSettings = defaults;
        return;
      }

      try {
        const parsed = JSON.parse(persistedValue) as unknown

        if (parsed && typeof parsed === 'object' && 'medicationConfig' in parsed) {
          const legacyConfig = parsed as { medicationConfig?: Record<string, unknown>; selectedRegionId?: string | null }
          this.medSettings = normalizeMedSettings({
            medications: legacyConfig.medicationConfig,
            selectedRegionId: legacyConfig.selectedRegionId ?? null,
          })
        } else {
          this.medSettings = normalizeMedSettings(parsed)
        }
      } catch {
        this.medSettings = defaults;
      }

      applyThemeMode(this.medSettings.themeMode ?? 'auto');
    },
  },
});
