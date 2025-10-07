import { FormEntry } from './form-entry';

export interface FormList {
  id: string;
  title: string;
  subtitle?: string;
  path?: string;
  entries: FormEntry[];
}

export type FormListItem = FormEntry | FormList;
