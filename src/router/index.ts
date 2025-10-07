import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/meds'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [

      // startpage
      {
        path: '',
        redirect: '/tabs/meds'
      },

      // medication-tab
      {
        path: 'meds',
        component: () => import('@/views/content/MedsListPage.vue'),
      },
      {
        path: 'meds/:id',
        component: () => import('@/views/content/medications/MedsContentPage.vue'),
        props: true
      },

      // library-tab
      {
        path: 'lib',
        component: () => import('@/views/content/LibraryListPage.vue'),
      },
      {
        path: 'lib/list/:listId/:entryId',
        component: () => import('@/views/content/library/LibraryContentPage.vue'),
        props: true
      },
      {
        path: 'lib/list/:id',
        component: () => import('@/views/content/library/LibrarySubListPage.vue'),
        props: true
      },
      {
        path: 'lib/entry/:entryId',
        component: () => import('@/views/content/library/LibraryContentPage.vue'),
        props: true
      },

      // forms-tab
      {
        path: 'forms',
        component: () => import('@/views/content/FormListPage.vue'),
      },
      {
        path: 'forms/list/:listId/:entryId',
        component: () => import('@/views/content/forms/FormsContentPage.vue'),
        props: true
      },
      {
        path: 'forms/list/:id',
        component: () => import('@/views/content/forms/FormsSubListPage.vue'),
        props: true
      },
      {
        path: 'forms/entry/:entryId',
        component: () => import('@/views/content/forms/FormsContentPage.vue'),
        props: true
      },

      // emergency-tab
      {
        path: 'emergency',
        component: () => import('@/views/content/EmergencyPage.vue'),
      },

    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
