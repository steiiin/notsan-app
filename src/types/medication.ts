export interface Medication {
  id: string;
  title: string;
  subtitle?: string;
  path?: string,
  component: () => Promise<any>;
}