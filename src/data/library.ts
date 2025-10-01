import { LibraryListItem } from '@/types/library-list';

export const library: LibraryListItem[] = [

  {
    id: 'bpr-list',
    title: 'Behandlungspfade',
    entries:
    [

      {
        id: 'bpr-atemwegsmanagement',
        title: 'Atemwegsmanagement',
        component: () => import('@/views/content/library/bpr/atemwegsmanagement/ContentAtemwegsmanagement.vue')
      },

    ]
  },

];
