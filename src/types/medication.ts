import { Package } from "./package";

export const MedId = Object.freeze({
  Acetylsalicyl: 'acetylsalicyl',
  Amiodaron: 'amiodaron',
  Atropin: 'atropin',
  Butylscopolamin: 'butylscopolamin',
  Dimenhydrinat: 'dimenhydrinat',
  Dimetinden: 'dimetinden',
  Epinephrin: 'epinephrin',
  Esketamin: 'esketamin',
  Fentanyl: 'fentanyl',
  Furosemid: 'furosemid',
  Glucagon: 'glucagon',
  Glucose: 'glucose',
  Glyceroltrinitrat: 'glyceroltrinitrat',
  Heparin: 'heparin',
  Ibuprofen: 'ibuprofen',
  Ipratropiumbromid: 'ipratropiumbromid',
  Metamizol: 'metamizol',
  Metoprolol: 'metoprolol',
  Midazolam: 'midazolam',
  Morphin: 'morphin',
  Nalbuphin: 'nalbuphin',
  Naloxon: 'naloxon',
  Paracetamol: 'paracetamol',
  Prednisolon: 'prednisolon',
  Salbutamol: 'salbutamol',
  Tranexam: 'tranexam',
  Urapidil: 'urapidil',
});

export interface Medication {
  id: string;
  title: string;
  subtitle?: string;
  path?: string,
  packages: Array<Package>,
  component: () => Promise<any>,
}

export interface PerMedicationConfig {
  enabled: boolean;
  packages: Record<string, boolean>;
}

export interface MedicationSwitchOption {
  id: string;
  label: string;
  path: string;
}