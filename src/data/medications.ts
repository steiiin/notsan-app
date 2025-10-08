import { Medication, MedId } from '@/types/medication'
export const medications: Medication[] =[
  {
    id: MedId.Acetylsalicyl,
    title: 'Acetylsalicylsäure',
    subtitle: 'ASS, Aspirin, Aspisol',
    packages: [
      {
        id: 'iv_500mg',
        type: 'amp-flsk',
        name: 'Set „Aspirin”',
        incredients: [
          { amount: '500mg', label: 'Pulver (Durchstechflasche)' },
          { amount: '+ 5ml', label: 'Wasser (Ampulle)' },
        ]
      }
    ],
    component: () => import('@/views/content/medications/acetylsalicyl/ContentAcetylsalicyl.vue')
  },
  {
    id: MedId.Amiodaron,
    title: 'Amiodaron',
    subtitle: 'Cordarex, Cordarone',
    packages: [
      {
        id: 'iv_150mg',
        type: 'amp',
        name: 'Ampulle „Amiodaron”',
        incredients: [
          { amount: ' 150mg / 3ml' },
          { amount: '= 50mg / ml' },
        ]
      }
    ],
    component: () => import('@/views/content/medications/amiodaron/ContentAmiodaron.vue')
  },
  {
    id: MedId.Atropin,
    title: 'Atropin',
    packages: [
      {
        id: 'iv_0_5mg',
        type: 'amp',
        name: 'Ampulle „Atropin”',
        incredients: [
          { amount: '0,5mg / ml' }
        ]
      }
    ],
    component: () => import('@/views/content/medications/atropin/ContentAtropin.vue')
  },
  {
    id: MedId.Butylscopolamin,
    title: 'Butylscopolamin',
    subtitle: 'Buscopan',
    packages: [
      {
        id: 'iv_20mg',
        type: 'amp',
        name: 'Ampulle „Butylscopolamin”',
        incredients: [
          { amount: '20mg / ml' }
        ]
      }
    ],
    component: () => import('@/views/content/medications/butylscopolamin/ContentButylscopolamin.vue')
  },
  {
    id: MedId.Dimenhydrinat,
    title: 'Dimenhydrinat',
    subtitle: 'Vomex A',
    packages: [
      {
        id: 'iv_62mg',
        type: 'amp',
        name: 'Ampulle „Dimenhydrinat”',
        incredients: [
          { amount: '62mg / 10ml' },
        ]
      },
      {
        id: 'supp_40mg',
        type: 'supp',
        name: 'Zäpfchen „Vomex A”',
        incredients: [
          { amount: '40mg' },
        ]
      },
      {
        id: 'supp_70mg',
        type: 'supp',
        name: 'Zäpfchen „Vomex A”',
        incredients: [
          { amount: '70mg' },
        ]
      }
    ],
    component: () => import('@/views/content/medications/dimenhydrinat/ContentDimenhydrinat.vue')
  },
  {
    id: MedId.Dimetinden,
    title: 'Dimetinden',
    subtitle: 'Fenistil, Histakut',
    packages: [
      {
        id: 'iv_4mg',
        type: 'amp',
        name: 'Ampulle „Histakut”',
        incredients: [
          { amount: '4mg / 4ml' },
        ]
      }
    ],
    component: () => import('@/views/content/medications/dimetinden/ContentDimetinden.vue')
  },
  {
    id: MedId.Epinephrin,
    title: 'Adrenalin',
    subtitle: 'Epinephrin, Suprarenin',
    packages: [
      {
        id: 'iv_1mg',
        type: 'amp',
        name: 'Ampulle „Adrenalin”',
        incredients: [
          { amount: '1mg / 1ml' },
        ]
      }
    ],
    component: () => import('@/views/content/medications/epinephrin/ContentEpinephrin.vue')
  },
  {
    id: MedId.Esketamin,
    title: 'Esketamin',
    subtitle: 'Ketanest S',
    packages: [
      {
        id: 'iv_5mgml_5ml',
        type: 'amp',
        name: 'Ampulle „Esketamin”',
        incredients: [
          { amount: '5mg/ml (5ml)' },
        ]
      },
      {
        id: 'iv_25mgml_2ml',
        type: 'amp',
        name: 'Ampulle „Esketamin”',
        incredients: [
          { amount: '25mg/ml (2ml)' },
        ]
      },
      {
        id: 'iv_25mgml_10ml',
        type: 'amp',
        name: 'Ampulle „Esketamin”',
        incredients: [
          { amount: '25mg/ml (10ml)' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/esketamin/ContentEsketamin.vue')
  },
  {
    id: MedId.Fentanyl,
    title: 'Fentanyl',
    packages: [
      {
        id: 'iv_0_05mgml_2ml',
        type: 'amp',
        name: 'Ampulle „Fentanyl”',
        incredients: [
          { amount: '0,1mg/2ml' },
        ]
      },
      {
        id: 'iv_0_05mgml_10ml',
        type: 'amp',
        name: 'Ampulle „Fentanyl”',
        incredients: [
          { amount: '0,5mg/10ml' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/fentanyl/ContentFentanyl.vue')
  },
  {
    id: MedId.Furosemid,
    title: 'Furosemid',
    subtitle: 'Furesis, Lasix',
    packages: [
      {
        id: 'iv_20mg',
        type: 'amp',
        name: 'Ampulle „Furosemid”',
        incredients: [
          { amount: '20mg / 2ml' },
        ]
      },
      {
        id: 'iv_40mg',
        type: 'amp',
        name: 'Ampulle „Furosemid”',
        incredients: [
          { amount: '40mg / 4ml' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/furosemid/ContentFurosemid.vue')
  },
  {
    id: MedId.Glucagon,
    title: 'Glucagon',
    packages: [
      {
        id: 'im_1mg',
        type: 'spritz',
        name: 'Fertig-Set „Glucagon”',
        incredients: [
          { amount: '  1mg', label: 'Pulver (Durchstechflasche)' },
          { amount: '+ 1ml', label: 'Wasser (Spritze)' },
        ]
      },
      {
        id: 'nasal_3mg',
        type: 'spray',
        name: 'Nasenspray „baqsimi”',
        incredients: [
          { amount: '3mg' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/glucagon/ContentGlucagon.vue')
  },
  {
    id: MedId.Glucose,
    title: 'Glucose',
    packages: [
      {
        id: 'iv_1g_10ml',
        type: 'flexamp',
        name: 'Ampulle „G10”',
        incredients: [
          { amount: '1g/10ml' },
        ]
      },
      {
        id: 'iv_2g_10ml',
        type: 'flexamp',
        name: 'Ampulle „G20”',
        incredients: [
          { amount: '2g/10ml' },
        ]
      },
      {
        id: 'iv_4g_10ml',
        type: 'flexamp',
        name: 'Ampulle „G40”',
        incredients: [
          { amount: '4g/10ml' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/glucose/ContentGlucose.vue')
  },
  {
    id: MedId.Glyceroltrinitrat,
    title: 'Glyceroltrinitrat',
    subtitle: 'Nitro',
    packages: [
      {
        id: 'spray_0_4mg',
        type: 'spray',
        name: 'Spray „Nitro”',
        incredients: [
          { amount: '0,4mg / Hub' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/glyceroltrinitrat/ContentGlyceroltrinitrat.vue')
  },
  {
    id: MedId.Heparin,
    title: 'Heparin',
    packages: [
      {
        id: 'iv_25000ieml_0_2ml',
        type: 'amp',
        name: 'Ampulle „Heparin”',
        incredients: [
          { amount: ' 5.000IE (0.2ml)' },
        ]
      },
      {
        id: 'iv_5000ieml_5ml',
        type: 'amp',
        name: 'Ampulle „Heparin”',
        incredients: [
          { amount: '25.000IE (5ml)' },
        ]
      },
      {
        id: 'iv_5000ieml_1ml',
        type: 'amp',
        name: 'Ampulle „Heparin”',
        incredients: [
          { amount: ' 5.000IE (1ml)' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/heparin/ContentHeparin.vue')
  },
  {
    id: MedId.Ibuprofen,
    title: 'Ibuprofen',
    subtitle: 'Nurofen',
    packages: [
      {
        id: 'po_200mg_400mg_600mg_800mg',
        type: 'pill',
        name: 'Ibuprofen-Tabletten',
        incredients: [
          { amount: '200mg, 400mg', label: '(rezeptfrei)' },
          { amount: '600mg. 800mg', label: '(rezeptpflichtig)' },
        ]
      },
      {
        id: 'po_20mgml_40mgml',
        type: 'flsk',
        name: 'Ibuprofen-Saft',
        incredients: [
          { amount: ' 20mg / ml' },
          { amount: ' 40mg / ml' },
        ]
      },
      {
        id: 'supp_75mg_125mg_150mg_250mg',
        type: 'supp',
        name: 'Ibuprofen-Zäpfchen',
        incredients: [
          { amount: ' 75mg, 125mg' },
          { amount: '150mg, 250mg' },
        ]
      },
      {
        id: 'iv_4mgml_6mgml_100ml',
        type: 'infusion',
        name: 'Kurzinfusionen',
        incredients: [
          { amount: '400mg / 100ml' },
          { amount: '600mg / 100ml' },
        ]
      }
    ],
    component: () => import('@/views/content/medications/ibuprofen/ContentIbuprofen.vue')
  },
  {
    id: MedId.Ipratropiumbromid,
    title: 'Ipratropiumbromid',
    subtitle: 'Atrovent',
    packages: [
      {
        id: 'inh_250ug',
        type: 'flexamp',
        name: 'Ampulle „Atrovent”',
        incredients: [
          { amount: '250µg / 2ml' },
        ]
      },
      {
        id: 'inh_500ug',
        type: 'flexamp',
        name: 'Ampulle „Atrovent”',
        incredients: [
          { amount: '500µg / 2ml' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/ipratropiumbromid/ContentIpratropiumbromid.vue')
  },
  {
    id: MedId.Metoprolol,
    title: 'Metoprolol',
    subtitle: 'Beloc',
    packages: [
      {
        id: 'iv_5mg',
        type: 'amp',
        name: 'Ampulle „Metoprolol”',
        incredients: [
          { amount: '5mg / 5ml' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/metoprolol/ContentMetoprolol.vue')
  },
  {
    id: MedId.Midazolam,
    title: 'Midazolam',
    subtitle: 'Dormicum',
    packages: [
      {
        id: 'iv_5mgml_1ml',
        type: 'amp',
        name: 'Ampulle Midazolam',
        incredients: [
          { amount: '5mg / ml (1ml)' }
        ]
      },
      {
        id: 'iv_1mgml_5ml',
        type: 'amp',
        name: 'Ampulle Midazolam',
        incredients: [
          { amount: '1mg / ml (5ml)' }
        ]
      },
      {
        id: 'iv_5mgml_3ml',
        type: 'amp',
        name: 'Ampulle Midazolam',
        incredients: [
          { amount: '5mg / ml (3ml)' }
        ]
      },
      {
        id: 'buccal_2_5mg_5mg_7_5mg_10mg',
        type: 'spritz',
        name: 'Buccolam Fertigspritzen',
        incredients: [
          { amount: ' 2,5mg', label: '(gelb)' },
          { amount: ' 5,0mg', label: '(blau)' },
          { amount: ' 7,5mg', label: '(lila)' },
          { amount: '10,0mg', label: '(rot)' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/midazolam/ContentMidazolam.vue')
  },
  {
    id: MedId.Morphin,
    title: 'Morphin',
    packages: [
      {
        id: 'iv_10mg',
        type: 'amp',
        name: 'Ampulle Morphin',
        incredients: [
          { amount: '10mg / 1ml' },
        ]
      },
      {
        id: 'iv_20mg',
        type: 'amp',
        name: 'Ampulle Morphin',
        incredients: [
          { amount: '20mg / 1ml' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/morphin/ContentMorphin.vue')
  },
  {
    id: MedId.Nalbuphin,
    title: 'Nalbuphin',
    packages: [
      {
        id: 'iv_20mg',
        type: 'amp',
        name: 'Ampulle Nalbuphin',
        incredients: [
          { amount: '20mg / 2ml' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/nalbuphin/ContentNalbuphin.vue')
  },
  {
    id: MedId.Naloxon,
    title: 'Naloxon',
    packages: [
      {
        id: 'iv_0_4mg',
        type: 'amp',
        name: 'Ampulle Naloxon',
        incredients: [
          { amount: '0,4mg / 1ml' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/naloxon/ContentNaloxon.vue')
  },
  {
    id: MedId.Paracetamol,
    title: 'Paracetamol',
    subtitle: 'Perfalgan',
    packages: [
      {
        id: 'po_500mg',
        type: 'pill',
        name: 'Paracetamol-Tablette',
        incredients: [
          { amount: '500mg' }
        ]
      },
      {
        id: 'po_40mgml',
        type: 'flsk',
        name: 'Paracetamol-Saft',
        incredients: [
          { amount: '40mg / ml' }
        ]
      },
      {
        id: 'supp_125mg_250mg',
        type: 'supp',
        name: 'Paracetamol-Zäpfchen',
        incredients: [
          { amount: '125mg, 250mg' }
        ]
      },
      {
        id: 'iv_10mgml_100ml',
        type: 'infusion',
        name: 'Kurzinfusionen',
        incredients: [
          { amount: '10mg/ml (100ml)' }
        ]
      }
    ],
    component: () => import('@/views/content/medications/paracetamol/ContentParacetamol.vue')
  },
  {
    id: MedId.Prednisolon,
    title: 'Prednisolon',
    subtitle: 'Prednisolut',
    packages: [
      {
        id: 'supp_100mg',
        type: 'supp',
        name: 'Zäpfchen „Rectodelt”',
        incredients: [
          { amount: '100mg' }
        ]
      },
      {
        id: 'iv_100mg',
        type: 'amp-2x',
        name: 'Set „Prednisolut”',
        incredients: [
          { amount: ' 100mg', label: 'Pulver' },
          { amount: '+  2ml', label: 'Wasser' },
        ]
      },
      {
        id: 'iv_250mg',
        type: 'amp-flsk',
        name: 'Set „Prednisolut”',
        incredients: [
          { amount: ' 250mg', label: 'Pulver' },
          { amount: '+  5ml', label: 'Wasser' },
        ]
      },
    ],
    component: () => import('@/views/content/medications/prednisolon/ContentPrednisolon.vue')
  },
  {
    id: MedId.Salbutamol,
    title: 'Salbutamol',
    packages: [
      {
        id: 'inh_5mgml',
        type: 'flexamp',
        name: 'Inhalationslösung Salbutamol',
        incredients: [
          { amount: '5mg / ml' }
        ]
      },
    ],
    component: () => import('@/views/content/medications/salbutamol/ContentSalbutamol.vue')
  },
  {
    id: MedId.Tranexam,
    title: 'Tranexamsäure',
    packages: [
      {
        id: 'iv_100mgml_5ml',
        type: 'amp',
        name: 'Ampulle Tranexamsäure',
        incredients: [
          { amount: '100mg / ml (5ml)' }
        ]
      },
      {
        id: 'iv_100mgml_10ml',
        type: 'amp',
        name: 'Ampulle Tranexamsäure',
        incredients: [
          { amount: '100mg / ml (10ml)' }
        ]
      },
    ],
    component: () => import('@/views/content/medications/tranexam/ContentTranexam.vue')
  },
  {
    id: MedId.Urapidil,
    title: 'Urapidil',
    subtitle: 'Ebrantil',
    packages: [
      {
        id: 'iv_5mgml_5ml',
        type: 'amp',
        name: 'Ampulle Urapidil',
        incredients: [
          { amount: '5mg / ml (5ml)' }
        ]
      },
      {
        id: 'iv_5mgml_10ml',
        type: 'amp',
        name: 'Ampulle Urapidil',
        incredients: [
          { amount: '5mg / ml (10ml)' }
        ]
      },
    ],
    component: () => import('@/views/content/medications/urapidil/ContentUrapidil.vue')
  },
]