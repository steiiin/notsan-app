import { Medication } from '@/types/medication'
import { Package, PackageIncredient } from '@/types/package'
export const medications: Medication[] =[
  {
    id: 'acetylsalicyl',
    title: 'Acetylsalicylsäure',
    subtitle: 'ASS, Aspirin, Aspisol',
    packages: {
      'iv-set': <Package>{
        type: 'amp-flsk',
        name: 'Set „Aspirin”',
        incredients: [
          <PackageIncredient>{
            amount: '500mg',
            label: 'Pulver (Durchstechflasche)'
          },
          <PackageIncredient>{
            amount: '+ 5ml',
            label: 'Wasser (Ampulle)'
          },
        ]
      }
    },
    component: () => import('@/views/content/medications/acetylsalicyl/ContentAcetylsalicyl.vue')
  },
  {
    id: 'epinephrin',
    title: 'Adrenalin',
    subtitle: 'Epinephrin, Suprarenin',
    packages: {
      'iv-1mg-1ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Adrenalin”',
        incredients: [
          <PackageIncredient>{
            amount: '1mg / 1ml',
          },
        ]
      }
    },
    component: () => import('@/views/content/medications/epinephrin/ContentEpinephrin.vue')
  },
]