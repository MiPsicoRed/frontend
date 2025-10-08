import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/auth.module'
import RegisterView from '../views/RegisterView.vue'
import VerifyView from '@/views/VerifyView.vue'
import VerifiedView from '@/views/VerifiedView.vue'

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
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guest: true }
    },
    {
      path: '/verification-needed',
      name: 'verification',
      component: VerifyView,
      meta: { requiresAuth: true },
    },
    // {
    //   path: '/verified',
    //   name: 'verfied',
    //   component: VerifiedView,
    //   meta: { requiresAuth: true },
    // }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isLoggedIn
  const isVerified = authStore.isVerified

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirect to login if not authenticated
    next({
      name: 'login',
      query: { redirect: to.fullPath } // Save intended destination
    })
  }
  // Redirect to home if logged in user tries to access guest:true route
  else if (to.meta.guest && isLoggedIn) {
    next({ name: 'home' })
  }
  // Redirect to verification page if logged in user but not verified tries to access route
  else if (!isVerified && to.meta.requiresAuth && to.name !== 'verification') {
    next({ name: 'verification' })
  }
  // Allow navigation
  else {
    next()
  }
})

export default router
