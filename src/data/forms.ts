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

    ]
  },

];
