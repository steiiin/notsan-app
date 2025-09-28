import { LibraryListItem } from '@/types/library-list';

export const libraryItems: LibraryListItem[] = [

  {
    id: 'bpr-list',
    title: 'Behandlungspfade',
    entries:
    [

      {
        id: 'bpr-airway',
        title: 'Atemwegsmanagement',
        component: () => import('@/views/content/library/bpr/airway/ContentAirway.vue')
      },

    ]
  },

];
