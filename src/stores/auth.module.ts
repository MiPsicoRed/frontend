import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import AuthService from '../services/auth.service.ts'
import { getAuthToken } from '../services/auth-header'
import type { ParsedToken } from '@/services/auth.types.ts'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const parsedToken = computed((): ParsedToken | null => {
    return token.value ? getAuthToken() : null
  })


  // Getters (computed)
  const isLoggedIn = computed(() => !!parsedToken.value)
  const userEmail = computed(() => parsedToken.value?.claims.email)
  const isVerified = computed(() => parsedToken.value?.claims.verified || false)

  // Actions
  async function login(userData: any) {
    try {
      const authResponse = await AuthService.login(userData)
      loginSuccess(authResponse.jwt)
      return Promise.resolve(authResponse)
    } catch (error) {
      loginFailure()
      return Promise.reject(error)
    }
  }

  function logout() {
    AuthService.logout()
    token.value = null
  }

  async function register(userData: any) {
    try {
      const response = await AuthService.register(userData)
      registerSuccess()
      return Promise.resolve(response.data)
    } catch (error) {
      registerFailure()
      return Promise.reject(error)
    }
  }

  // Internal mutations
  function loginSuccess(jwt: string) {
    token.value = jwt
    localStorage.setItem('token', jwt)
  }

  function loginFailure() {
    token.value = null
    localStorage.removeItem('token')
  }


  function registerSuccess() {
    // Usually after register you’re NOT logged in yet
    token.value = null
  }

  function registerFailure() {
    token.value = null
  }

  return {
    // State
    token,
    // Getters
    isLoggedIn,
    userEmail,
    isVerified,
    // Actions
    login,
    logout,
    register
  }
})