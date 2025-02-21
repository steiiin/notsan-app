import { Package } from "./package";
export interface Medication {
  id: string;
  title: string;
  subtitle?: string;
  path?: string,
  packages: Record<string, Package>,
  component: () => Promise<any>,
}