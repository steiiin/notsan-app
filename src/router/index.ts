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
      {
        path: '',
        redirect: '/tabs/meds'
      },
      {
        path: 'meds',
        component: () => import('@/views/content/MedsListPage.vue'),
      },
      {
        path: 'meds/:id',
        component: () => import('@/views/content/medications/MedsContentPage.vue'),
        props: true
      },
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
        component: () => import('@/views/content/LibrarySubListPage.vue'),
        props: true
      },
      {
        path: 'lib/entry/:entryId',
        component: () => import('@/views/content/library/LibraryContentPage.vue'),
        props: true
      },
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
