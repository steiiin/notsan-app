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
    id: 'amiodaron',
    title: 'Amiodaron',
    subtitle: 'Cordarex, Cordarone',
    packages: {
      'iv-150mg-3ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Amiodaron”',
        incredients: [
          <PackageIncredient>{ amount: ' 150mg / 3ml' },
          <PackageIncredient>{ amount: '= 50mg / ml' },
        ]
      }
    },
    component: () => import('@/views/content/medications/amiodaron/ContentAmiodaron.vue')
  },
  {
    id: 'atropin',
    title: 'Atropin',
    packages: {
      'iv-0.5mg-1ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Atropin”',
        incredients: [
          <PackageIncredient>{ amount: '0,5mg / ml' }
        ]
      }
    },
    component: () => import('@/views/content/medications/atropin/ContentAtropin.vue')
  },
  {
    id: 'butylscopolamin',
    title: 'Butylscopolamin',
    subtitle: 'Buscopan',
    packages: {
      'iv-20mg-1ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Butylscopolamin”',
        incredients: [
          <PackageIncredient>{ amount: '20mg / ml' }
        ]
      }
    },
    component: () => import('@/views/content/medications/butylscopolamin/ContentButylscopolamin.vue')
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