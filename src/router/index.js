import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CommentView from '@/views/CommentView.vue'
import AccountView from '@/views/AccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/comment',
      name: 'comment',
      component: CommentView,
    },
    {
      path: '/account',
      name: ' account',
      component: AccountView,
    }
  ],
})

export default router
