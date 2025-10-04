import { LibraryListItem } from '@/types/library-list';

export const library: LibraryListItem[] = [

  {
    id: 'bpr-list',
    title: 'Behandlungspfade',
    subtitle: 'BPR',
    entries:
    [

      {
        id: 'bpr-atemwegsmanagement',
        title: 'Atemwegsmanagement',
        component: () => import('@/views/content/library/bpr/atemwegsmanagement/ContentAtemwegsmanagement.vue')
      },

    ]
  },

  {
    id: 'saa-list',
    title: 'Standard-Arbeitsanweisungen',
    subtitle: 'SAA',
    entries:
    [

      {
        id: 'bpr-entlastung',
        title: 'Thoraxentlastungspunktion',
        component: () => import('@/views/content/library/saa/entlastung/ContentEntlastung.vue')
      },

      {
        id: 'bpr-iozugang',
        title: 'Intraossärer Zugang',
        component: () => import('@/views/content/library/saa/iozugang/ContentIozugang.vue')
      },

    ]
  }

];
