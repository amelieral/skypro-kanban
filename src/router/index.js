import HomeView from '@/views/HomeView.vue'
import NewCardView from '@/views/NewCardView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/new-card',
      name: 'new-card',
      component: () => import('@/views/NewCardView.vue'),
    },
  ],
})

export default router
