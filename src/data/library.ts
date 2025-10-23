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
      {
        id: 'bpr-dyspnoe',
        title: 'Dyspnoe',
        component: () => import('@/views/content/library/bpr/dyspnoe/ContentDyspnoe.vue')
      },
      {
        id: 'bpr-dyspnoekind',
        title: 'Dyspnoe (Kinder)',
        component: () => import('@/views/content/library/bpr/dyspnoekind/ContentDyspnoekind.vue')
      },
      {
        id: 'bpr-kindkritisch',
        title: 'Kritisches Kind',
        component: () => import('@/views/content/library/bpr/kindkritisch/ContentKindkritisch.vue')
      },
      {
        id: 'bpr-nausea',
        title: 'Übelkeit/Erbrechen',
        component: () => import('@/views/content/library/bpr/nausea/ContentNausea.vue')
      },
      {
        id: 'bpr-pseudokrupp',
        title: 'Pseudokrupp',
        component: () => import('@/views/content/library/bpr/pseudokrupp/ContentPseudokrupp.vue')
      },
      {
        id: 'bpr-schmerzen',
        title: 'Schmerzen',
        component: () => import('@/views/content/library/bpr/schmerzen/ContentSchmerzen.vue')
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
        id: 'saa-entlastung',
        title: 'Thoraxentlastungspunktion',
        component: () => import('@/views/content/library/saa/entlastung/ContentEntlastung.vue')
      },

      {
        id: 'saa-iozugang',
        title: 'Intraossärer Zugang',
        component: () => import('@/views/content/library/saa/iozugang/ContentIozugang.vue')
      },

    ]
  }

];
