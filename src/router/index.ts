import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import { useAuthStore } from '@/stores/auth.module'
import RegisterView from '../views/Auth/RegisterView.vue'
import VerifyView from '@/views/Auth/VerifyView.vue'
import VerifiedView from '@/views/Auth/VerifiedView.vue'
import DashboardView from '../views/DashboardView.vue'

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
    {
      path: '/verified',
      name: 'verified',
      component: VerifiedView,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isLoggedIn
  const isVerified = authStore.isVerified

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return // Important: return early
  }

  // Validate token if user claims to be logged in AND going to protected route
  if (isLoggedIn && to.meta.requiresAuth) {
    const isValid = await authStore.validateToken()

    if (!isValid) {
      // Token is invalid or expired, log them out
      authStore.logout()
      next({
        name: 'login',
        query: { redirect: to.fullPath, error: 'session_expired' }
      })
      return
    }
  }

  // Redirect to home if logged in user tries to access guest:true route
  if (to.meta.guest && isLoggedIn) {
    next({ name: 'home' })
    return
  }

  // Redirect to verification page if logged in but not verified
  if (isLoggedIn && !isVerified && to.meta.requiresAuth && (to.name !== 'verification' && to.name !== 'verified')) {
    next({ name: 'verification' })
    return
  }

  // Allow navigation
  next()
})

export default router
