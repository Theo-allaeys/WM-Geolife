import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/tab2'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab2'
      },
      {
        path: 'tab1',
        component: () => import('@/views/GameModePage.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/WelcomePage.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/GameLobbySolo.vue')
      },
      {
        path: 'tab4',
        component: () => import('@/views/LoginPage.vue')
      },
      {
        path: 'tab5',
        component: () => import('@/views/Game.vue')
      },
      {
        path: 'tab6',
        component: () => import('@/views/addPOI.vue')
      },
      {
        path: 'tab7',
        component: () => import('@/views/RewardScreen.vue')
      },
      {
        path: 'tab8',
        component: () => import('@/views/LevelPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
