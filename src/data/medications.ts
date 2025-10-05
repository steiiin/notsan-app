import { Medication, MedId } from '@/types/medication'
import { Package, PackageIncredient } from '@/types/package'
export const medications: Medication[] =[
  {
    id: MedId.Acetylsalicyl,
    title: 'Acetylsalicylsäure',
    subtitle: 'ASS, Aspirin, Aspisol',
    packages: {
      'iv_500mg': <Package>{
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
    id: MedId.Amiodaron,
    title: 'Amiodaron',
    subtitle: 'Cordarex, Cordarone',
    packages: {
      'iv_150mg': <Package>{
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
    id: MedId.Atropin,
    title: 'Atropin',
    packages: {
      'iv_0_5mg': <Package>{
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
    id: MedId.Butylscopolamin,
    title: 'Butylscopolamin',
    subtitle: 'Buscopan',
    packages: {
      'iv_20mg': <Package>{
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
    id: MedId.Dimenhydrinat,
    title: 'Dimenhydrinat',
    subtitle: 'Vomex A',
    packages: {
      'iv_62mg': <Package>{
        type: 'amp',
        name: 'Ampulle „Dimenhydrinat”',
        incredients: [
          <PackageIncredient>{ amount: '62mg / 10ml' },
        ]
      },
      'supp_40mg': <Package>{
        type: 'supp',
        name: 'Zäpfchen „Vomex A”',
        incredients: [
          <PackageIncredient>{ amount: '40mg' },
        ]
      },
      'supp_70mg': <Package>{
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
    id: MedId.Dimetinden,
    title: 'Dimetinden',
    subtitle: 'Fenistil, Histakut',
    packages: {
      'iv_4mg': <Package>{
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
    id: MedId.Epinephrin,
    title: 'Adrenalin',
    subtitle: 'Epinephrin, Suprarenin',
    packages: {
      'iv_1mg': <Package>{
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
    id: MedId.Esketamin,
    title: 'Esketamin',
    subtitle: 'Ketanest S',
    packages: {
      'iv_5mgml_5ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Esketamin”',
        incredients: [
          <PackageIncredient>{ amount: '5mg/ml (5ml)' },
        ]
      },
      'iv_25mgml_2ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Esketamin”',
        incredients: [
          <PackageIncredient>{ amount: '25mg/ml (2ml)' },
        ]
      },
      'iv_25mgml_10ml': <Package>{
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
    id: MedId.Fentanyl,
    title: 'Fentanyl',
    packages: {
      'iv_0_05mgml_2ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Fentanyl”',
        incredients: [
          <PackageIncredient>{ amount: '0,1mg/2ml' },
        ]
      },
      'iv_0_05mgml_10ml': <Package>{
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
    id: MedId.Furosemid,
    title: 'Furosemid',
    subtitle: 'Furesis, Lasix',
    packages: {
      'iv_20mg': <Package>{
        type: 'amp',
        name: 'Ampulle „Furosemid”',
        incredients: [
          <PackageIncredient>{ amount: '20mg / 2ml',  },
        ]
      },
      'iv_40mg': <Package>{
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
    id: MedId.Glucagon,
    title: 'Glucagon',
    packages: {
      'im_1mg': <Package>{
        type: 'spritz',
        name: 'Fertig-Set „Glucagon”',
        incredients: [
          <PackageIncredient>{ amount: '  1mg', label: 'Pulver (Durchstechflasche)' },
          <PackageIncredient>{ amount: '+ 1ml', label: 'Wasser (Spritze)' },
        ]
      },
      'nasal_3mg': <Package>{
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
    id: MedId.Glucose,
    title: 'Glucose',
    packages: {
      'iv_1g_10ml': <Package>{
        type: 'flexamp',
        name: 'Ampulle „G10”',
        incredients: [
          <PackageIncredient>{ amount: '1g/10ml',  },
        ]
      },
      'iv_2g_10ml': <Package>{
        type: 'flexamp',
        name: 'Ampulle „G20”',
        incredients: [
          <PackageIncredient>{ amount: '2g/10ml' },
        ]
      },
      'iv_4g_10ml': <Package>{
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
    id: MedId.Glyceroltrinitrat,
    title: 'Glyceroltrinitrat',
    subtitle: 'Nitro',
    packages: {
      'spray_0_4mg': <Package>{
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
    id: MedId.Heparin,
    title: 'Heparin',
    packages: {
      'iv_25000ieml_0_2ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Heparin”',
        incredients: [
          <PackageIncredient>{ amount: ' 5.000IE (0.2ml)' },
        ]
      },
      'iv_5000ieml_5ml': <Package>{
        type: 'amp',
        name: 'Ampulle „Heparin”',
        incredients: [
          <PackageIncredient>{ amount: '25.000IE (5ml)' },
        ]
      },
      'iv_5000ieml_1ml': <Package>{
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
    id: MedId.Ibuprofen,
    title: 'Ibuprofen',
    subtitle: 'Nurofen',
    packages: {
      'po_200mg_400mg_600mg_800mg': <Package>{
        type: 'pill',
        name: 'Ibuprofen-Tabletten',
        incredients: [
          <PackageIncredient>{ amount: '200mg, 400mg', label: '(rezeptfrei)' },
          <PackageIncredient>{ amount: '600mg. 800mg', label: '(rezeptpflichtig)' },
        ]
      },
      'po_20mgml_40mgml': <Package>{
        type: 'flsk',
        name: 'Ibuprofen-Saft',
        incredients: [
          <PackageIncredient>{ amount: ' 20mg / ml' },
          <PackageIncredient>{ amount: ' 40mg / ml' },
        ]
      },
      'supp_75mg_125mg_150mg_250mg': <Package>{
        type: 'supp',
        name: 'Ibuprofen-Zäpfchen',
        incredients: [
          <PackageIncredient>{ amount: ' 75mg, 125mg' },
          <PackageIncredient>{ amount: '150mg, 250mg' },
        ]
      },
      'iv_4mgml_6mgml_100ml': <Package>{
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
    id: MedId.Ipratropiumbromid,
    title: 'Ipratropiumbromid',
    subtitle: 'Atrovent',
    packages: {
      'inh_250ug': <Package>{
        type: 'flexamp',
        name: 'Ampulle „Atrovent”',
        incredients: [
          <PackageIncredient>{ amount: '250µg / 2ml' },
        ]
      },
      'inh_500ug': <Package>{
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
    id: MedId.Metoprolol,
    title: 'Metoprolol',
    subtitle: 'Beloc',
    packages: {
      'iv_5mg': <Package>{
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
    id: MedId.Midazolam,
    title: 'Midazolam',
    subtitle: 'Dormicum',
    packages: {
      'iv_5mgml_1ml': <Package>{
        type: 'amp',
        name: 'Ampulle Midazolam',
        incredients: [
          <PackageIncredient>{ amount: '5mg / ml (1ml)' }
        ]
      },
      'iv_1mgml_5ml': <Package>{
        type: 'amp',
        name: 'Ampulle Midazolam',
        incredients: [
          <PackageIncredient>{ amount: '1mg / ml (5ml)' }
        ]
      },
      'iv_5mgml_3ml': <Package>{
        type: 'amp',
        name: 'Ampulle Midazolam',
        incredients: [
          <PackageIncredient>{ amount: '5mg / ml (3ml)' }
        ]
      },
      'buccal_2_5mg_5mg_7_5mg_10mg': <Package>{
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
    id: MedId.Morphin,
    title: 'Morphin',
    packages: {
      'iv_10mg': <Package>{
        type: 'amp',
        name: 'Ampulle Morphin',
        incredients: [
          <PackageIncredient>{ amount: '10mg / 1ml' },
        ]
      },
      'iv_20mg': <Package>{
        type: 'amp',
        name: 'Ampulle Morphin',
        incredients: [
          <PackageIncredient>{ amount: '20mg / 1ml' },
        ]
      },
    },
    component: () => import('@/views/content/medications/morphin/ContentMorphin.vue')
  },
  {
    id: MedId.Nalbuphin,
    title: 'Nalbuphin',
    packages: {
      'iv_20mg': <Package>{
        type: 'amp',
        name: 'Ampulle Nalbuphin',
        incredients: [
          <PackageIncredient>{ amount: '20mg / 2ml' },
        ]
      },
    },
    component: () => import('@/views/content/medications/nalbuphin/ContentNalbuphin.vue')
  },
  {
    id: MedId.Naloxon,
    title: 'Naloxon',
    packages: {
      'iv_0_4mg': <Package>{
        type: 'amp',
        name: 'Ampulle Naloxon',
        incredients: [
          <PackageIncredient>{ amount: '0,4mg / 1ml' },
        ]
      },
    },
    component: () => import('@/views/content/medications/naloxon/ContentNaloxon.vue')
  },
  {
    id: MedId.Paracetamol,
    title: 'Paracetamol',
    subtitle: 'Perfalgan',
    packages: {
      'po_500mg': <Package>{
        type: 'pill',
        name: 'Paracetamol-Tablette',
        incredients: [
          <PackageIncredient>{ amount: '500mg' }
        ]
      },
      'po_40mgml': <Package>{
        type: 'flsk',
        name: 'Paracetamol-Saft',
        incredients: [
          <PackageIncredient>{ amount: '40mg / ml' }
        ]
      },
      'supp_125mg_250mg': <Package>{
        type: 'supp',
        name: 'Paracetamol-Zäpfchen',
        incredients: [
          <PackageIncredient>{ amount: '125mg, 250mg' }
        ]
      },
      'iv_10mgml_100ml': <Package>{
        type: 'infusion',
        name: 'Kurzinfusionen',
        incredients: [
          <PackageIncredient>{ amount: '10mg/ml (100ml)' }
        ]
      }
    },
    component: () => import('@/views/content/medications/paracetamol/ContentParacetamol.vue')
  },
  {
    id: MedId.Prednisolon,
    title: 'Prednisolon',
    subtitle: 'Prednisolut',
    packages: {
      'supp_100mg': <Package>{
        type: 'supp',
        name: 'Zäpfchen „Rectodelt”',
        incredients: [
          <PackageIncredient>{ amount: '100mg' }
        ]
      },
      'iv_100mg': <Package>{
        type: 'amp-2x',
        name: 'Set „Prednisolut”',
        incredients: [
          <PackageIncredient>{ amount: ' 100mg', label: 'Pulver' },
          <PackageIncredient>{ amount: '+  2ml', label: 'Wasser' },
        ]
      },
      'iv_250mg': <Package>{
        type: 'amp-flsk',
        name: 'Set „Prednisolut”',
        incredients: [
          <PackageIncredient>{ amount: ' 250mg', label: 'Pulver' },
          <PackageIncredient>{ amount: '+  5ml', label: 'Wasser' },
        ]
      },
    },
    component: () => import('@/views/content/medications/prednisolon/ContentPrednisolon.vue')
  },
  {
    id: MedId.Salbutamol,
    title: 'Salbutamol',
    packages: {
      'inh_5mgml': <Package>{
        type: 'flexamp',
        name: 'Inhalationslösung Salbutamol',
        incredients: [
          <PackageIncredient>{ amount: '5mg / ml' }
        ]
      },
    },
    component: () => import('@/views/content/medications/salbutamol/ContentSalbutamol.vue')
  },
  {
    id: MedId.Tranexam,
    title: 'Tranexamsäure',
    packages: {
      'iv_100mgml_5ml': <Package>{
        type: 'amp',
        name: 'Ampulle Tranexamsäure',
        incredients: [
          <PackageIncredient>{ amount: '100mg / ml (5ml)' }
        ]
      },
      'iv_100mgml_10ml': <Package>{
        type: 'amp',
        name: 'Ampulle Tranexamsäure',
        incredients: [
          <PackageIncredient>{ amount: '100mg / ml (10ml)' }
        ]
      },
    },
    component: () => import('@/views/content/medications/tranexam/ContentTranexam.vue')
  },
  {
    id: MedId.Urapidil,
    title: 'Urapidil',
    subtitle: 'Ebrantil',
    packages: {
      'iv_5mgml_5ml': <Package>{
        type: 'amp',
        name: 'Ampulle Urapidil',
        incredients: [
          <PackageIncredient>{ amount: '5mg / ml (5ml)' }
        ]
      },
      'iv_5mgml_10ml': <Package>{
        type: 'amp',
        name: 'Ampulle Urapidil',
        incredients: [
          <PackageIncredient>{ amount: '5mg / ml (10ml)' }
        ]
      },
    },
    component: () => import('@/views/content/medications/urapidil/ContentUrapidil.vue')
  },
]