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
  {
    id: 'furosemid',
    title: 'Furosemid',
    subtitle: 'Furesis, Lasix',
    packages: {
      'iv-20mg-2ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Furosemid”',
        incredients: [
          <PackageIncredient>{ amount: '20mg / 2ml',  },
        ]
      },
      'iv-40mg-4ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Furosemid”',
        incredients: [
          <PackageIncredient>{ amount: '40mg / 4ml',  },
        ]
      },
    },
    component: () => import('@/views/content/medications/furosemid/ContentFurosemid.vue')
  },
  {
    id: 'glucagon',
    title: 'Glucagon',
    packages: {
      'im-1mg-1ml': <Package>{
        type: 'spritz',
        name: 'Fertig-Set „Glucagon”',
        incredients: [
          <PackageIncredient>{ amount: '  1mg', label: 'Pulver (Durchstechflasche)' },
          <PackageIncredient>{ amount: '+ 1ml', label: 'Wasser (Spritze)' },
        ]
      },
      'nasal-3mg': <Package>{
        type: 'spray',
        name: 'Nasenspray „baqsimi”',
        incredients: [
          <PackageIncredient>{ amount: '3mg' },
        ]
      },
    },
    component: () => import('@/views/content/medications/glucagon/ContentGlucagon.vue')
  },
  {
    id: 'glucose',
    title: 'Glucose',
    packages: {
      'iv-g10': <Package>{
        type: 'flexamp',
        name: 'Ampulle „G10”',
        incredients: [
          <PackageIncredient>{ amount: '1g/10ml',  },
        ]
      },
      'iv-g20': <Package>{
        type: 'flexamp',
        name: 'Ampulle „G20”',
        incredients: [
          <PackageIncredient>{ amount: '2g/10ml' },
        ]
      },
      'iv-g40': <Package>{
        type: 'flexamp',
        name: 'Ampulle „G40”',
        incredients: [
          <PackageIncredient>{ amount: '4g/10ml' },
        ]
      },
    },
    component: () => import('@/views/content/medications/glucose/ContentGlucose.vue')
  },
  {
    id: 'glyceroltrinitrat',
    title: 'Glyceroltrinitrat',
    subtitle: 'Nitro',
    packages: {
      'spray-nitro': <Package>{
        type: 'spray',
        name: 'Spray „Nitro”',
        incredients: [
          <PackageIncredient>{ amount: '0,4mg / Hub',  },
        ]
      },
    },
    component: () => import('@/views/content/medications/glyceroltrinitrat/ContentGlyceroltrinitrat.vue')
  },
  {
    id: 'heparin',
    title: 'Heparin',
    packages: {
      'iv-25000-ml--0.2ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Heparin”',
        incredients: [
          <PackageIncredient>{ amount: ' 5.000IE (0.2ml)' },
        ]
      },
      'iv-5000-ml--5ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Heparin”',
        incredients: [
          <PackageIncredient>{ amount: '25.000IE (5ml)' },
        ]
      },
      'iv-5000-ml--1ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Heparin”',
        incredients: [
          <PackageIncredient>{ amount: ' 5.000IE (1ml)' },
        ]
      },
    },
    component: () => import('@/views/content/medications/heparin/ContentHeparin.vue')
  },
  {
    id: 'ibuprofen',
    title: 'Ibuprofen',
    subtitle: 'Nurofen',
    packages: {
      'po-tabl': <Package>{
        type: 'pill',
        name: 'Ibuprofen-Tabletten',
        incredients: [
          <PackageIncredient>{ amount: '200mg, 400mg', label: '(rezeptfrei)' },
          <PackageIncredient>{ amount: '600mg. 800mg', label: '(rezeptpflichtig)' },
        ]
      },
      'po-saft': <Package>{
        type: 'flsk',
        name: 'Ibuprofen-Saft',
        incredients: [
          <PackageIncredient>{ amount: ' 20mg / ml' },
          <PackageIncredient>{ amount: ' 40mg / ml' },
        ]
      },
      'supp': <Package>{
        type: 'supp',
        name: 'Ibuprofen-Zäpfchen',
        incredients: [
          <PackageIncredient>{ amount: ' 75mg, 125mg' },
          <PackageIncredient>{ amount: '150mg, 250mg' },
        ]
      },
      'iv-flask': <Package>{
        type: 'infusion',
        name: 'Kurzinfusionen',
        incredients: [
          <PackageIncredient>{ amount: '400mg / 100ml' },
          <PackageIncredient>{ amount: '600mg / 100ml' },
        ]
      }
    },
    component: () => import('@/views/content/medications/ibuprofen/ContentIbuprofen.vue')
  },
  {
    id: 'ipratropium',
    title: 'Ipratropiumbromid',
    subtitle: 'Atrovent',
    packages: {
      'pi-250': <Package>{
        type: 'flexamp',
        name: 'Ampulle „Atrovent”',
        incredients: [
          <PackageIncredient>{ amount: '250µg / 2ml' },
        ]
      },
      'pi-500': <Package>{
        type: 'flexamp',
        name: 'Ampulle „Atrovent”',
        incredients: [
          <PackageIncredient>{ amount: '500µg / 2ml' },
        ]
      },
    },
    component: () => import('@/views/content/medications/ipratropiumbromid/ContentIpratropiumbromid.vue')
  },
  {
    id: 'metoprolol',
    title: 'Metoprolol',
    subtitle: 'Beloc',
    packages: {
      'iv-5mg-5ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Metoprolol”',
        incredients: [
          <PackageIncredient>{ amount: '5mg / 5ml',  },
        ]
      },
    },
    component: () => import('@/views/content/medications/metoprolol/ContentMetoprolol.vue')
  },

  {
    id: 'midazolam',
    title: 'Midazolam',
    subtitle: 'Dormicum',
    packages: {
      'iv-5mg-ml--1ml': <Package>{
        type: 'amp',
        name: 'Ampulle Midazolam',
        incredients: [
          <PackageIncredient>{ amount: '5mg / ml (1ml)' }
        ]
      },
      'iv-1mg-ml--5ml': <Package>{
        type: 'amp',
        name: 'Ampulle Midazolam',
        incredients: [
          <PackageIncredient>{ amount: '1mg / ml (5ml)' }
        ]
      },
      'iv-5mg-ml--3ml': <Package>{
        type: 'amp',
        name: 'Ampulle Midazolam',
        incredients: [
          <PackageIncredient>{ amount: '5mg / ml (3ml)' }
        ]
      },
      'buccolam': <Package>{
        type: 'spritz',
        name: 'Buccolam Fertigspritzen',
        incredients: [
          <PackageIncredient>{ amount: ' 2,5mg', label: '(gelb)' },
          <PackageIncredient>{ amount: ' 5,0mg', label: '(blau)' },
          <PackageIncredient>{ amount: ' 7,5mg', label: '(lila)' },
          <PackageIncredient>{ amount: '10,0mg', label: '(rot)' },
        ]
      },
    },
    component: () => import('@/views/content/medications/midazolam/ContentMidazolam.vue')
  },
  {
    id: 'morphin',
    title: 'Morphin',
    packages: {
      'iv-10mg-1ml': <Package>{
        type: 'amp',
        name: 'Ampulle Morphin',
        incredients: [
          <PackageIncredient>{ amount: '10mg / 1ml' },
        ]
      },
      'iv-20mg-1ml': <Package>{
        type: 'amp',
        name: 'Ampulle Morphin',
        incredients: [
          <PackageIncredient>{ amount: '20mg / 1ml' },
        ]
      },
    },
    component: () => import('@/views/content/medications/morphin/ContentMorphin.vue')
  },
]