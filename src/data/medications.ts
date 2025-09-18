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
    id: 'dimenhydrinat',
    title: 'Dimenhydrinat',
    subtitle: 'Vomex A',
    packages: {
      'iv-62mg-10ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Dimenhydrinat”',
        incredients: [
          <PackageIncredient>{ amount: '62mg / 10ml' },
        ]
      },
      'supp-40mg': <Package>{
        type: 'supp',
        name: 'Zäpfchen „Vomex A”',
        incredients: [
          <PackageIncredient>{ amount: '40mg' },
        ]
      },
      'supp-70mg': <Package>{
        type: 'supp',
        name: 'Zäpfchen „Vomex A”',
        incredients: [
          <PackageIncredient>{ amount: '70mg' },
        ]
      }
    },
    component: () => import('@/views/content/medications/dimenhydrinat/ContentDimenhydrinat.vue')
  },
  {
    id: 'dimetinden',
    title: 'Dimetinden',
    subtitle: 'Fenistil, Histakut',
    packages: {
      'iv-4mg-4ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Histakut”',
        incredients: [
          <PackageIncredient>{ amount: '4mg / 4ml' },
        ]
      }
    },
    component: () => import('@/views/content/medications/dimetinden/ContentDimetinden.vue')
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
  {
    id: 'esketamin',
    title: 'Esketamin',
    subtitle: 'Ketanest S',
    packages: {
      'iv-5mg-ml--5ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Esketamin”',
        incredients: [
          <PackageIncredient>{ amount: '5mg/ml (5ml)' },
        ]
      },
      'iv-25mg-ml--2ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Esketamin”',
        incredients: [
          <PackageIncredient>{ amount: '25mg/ml (2ml)' },
        ]
      },
      'iv-25mg-ml--10ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Esketamin”',
        incredients: [
          <PackageIncredient>{ amount: '25mg/ml (10ml)' },
        ]
      },
    },
    component: () => import('@/views/content/medications/esketamin/ContentEsketamin.vue')
  },
  {
    id: 'fentanyl',
    title: 'Fentanyl',
    packages: {
      'iv-01mg-2ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Fentanyl”',
        incredients: [
          <PackageIncredient>{ amount: '0,1mg/2ml' },
        ]
      },
      'iv-05mg-10ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Fentanyl”',
        incredients: [
          <PackageIncredient>{ amount: '0,5mg/10ml' },
        ]
      },
    },
    component: () => import('@/views/content/medications/fentanyl/ContentFentanyl.vue')
  },
]