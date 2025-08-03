import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'new-card',
          name: 'new-card',
          component: () => import('@/views/NewCardView.vue'),
          meta: { isModal: true },
        },
        {
          path: 'card/:id',
          name: 'card',
          component: () => import('@/views/CardView.vue'),
          meta: { isModal: true },
        },
        {
          path: 'exit',
          name: 'exit',
          component: () => import('@/views/LogoutView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: SignInView,
      meta: { hideHeader: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: { hideHeader: true },
    },
  ],
})

export default router
