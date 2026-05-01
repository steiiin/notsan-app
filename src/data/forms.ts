import { FormListItem } from '@/types/form-list';

export const forms: FormListItem[] = [

  {
    id: 'diagnose',
    title: 'Diagnose',
    entries:
    [

      {
        id: 'diagnose-ekg',
        title: 'EKG-Diagnose',
        component: () => import('@/views/content/forms/diagnose/ekg/ContentEkg.vue')
      },
      {
        id: 'diagnose-kof',
        title: 'KOF-Einschätzung',
        subtitle: 'Verbrennungen',
        component: () => import('@/views/content/forms/diagnose/kof/ContentKof.vue')
      },

    ]
  },

  {
    id: 'score',
    title: 'Scores',
    entries:
    [
      {
        id: 'score-sepsis',
        title: 'Sepsis',
        subtitle: 'NEWS2-Score',
        component: () => import('@/views/content/forms/score/sepsis/ContentSepsis.vue')
      },
    ]
  },

  {
    id: 'decision',
    title: 'Entscheidungshilfe',
    entries:
    [
      {
        id: 'decision-geburt',
        title: 'Transportentscheidung Geburt',
        component: () => import('@/views/content/forms/decision/geburt/ContentGeburt.vue')
      },
      {
        id: 'decision-na',
        title: 'Notarzt-Nachforderung',
        component: () => import('@/views/content/forms/decision/na/ContentNa.vue')
      },
    ]
  },



];
