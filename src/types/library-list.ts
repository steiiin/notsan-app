import { LibraryEntry } from './library-entry';

export interface LibraryList {
  id: string;
  title: string;
  subtitle?: string;
  path?: string;
  entries: LibraryEntry[];
}

export type LibraryListItem = LibraryEntry | LibraryList;
