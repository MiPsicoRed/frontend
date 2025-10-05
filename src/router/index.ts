import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/auth.module'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true },
    },
     {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isLoggedIn

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirect to login if not authenticated
    next({ 
      name: 'login',
      query: { redirect: to.fullPath } // Save intended destination
    })
  } 
  // Optional: Redirect to home if logged in user tries to access login
  else if (to.meta.guest && isLoggedIn) {
    next({ name: 'home' })
  } 
  // Allow navigation
  else {
    next()
  }
})

export default router
