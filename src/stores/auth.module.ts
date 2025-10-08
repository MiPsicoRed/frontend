import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import AuthService from '../services/auth/auth.service.ts'
import { getAuthToken } from '../services/auth/auth-header'
import type { LoginResponse, ParsedToken, RegisterResponse } from '@/services/auth/auth.types.ts'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const parsedToken = computed((): ParsedToken | null => {
    return token.value ? getAuthToken() : null
  })


  // Getters (computed)
  const isLoggedIn = computed(() => !!token.value && !!parsedToken.value)
  const userId = computed(() => parsedToken.value?.claims.uuid)
  const isVerified = computed(() => parsedToken.value?.claims.verified || false)

  // Actions
  async function validateToken(): Promise<boolean> {
    if (!token.value) return false

    try {
      const isValid = await AuthService.validateToken()
      if (!isValid) {
        logout() // Clear invalid token
      }
      return isValid
    } catch (error) {
      logout()
      return false
    }
  }

  async function login(userData: any): Promise<LoginResponse> {
    try {
      const data = await AuthService.login(userData)
      loginSuccess(data.jwt)
      return data
    } catch (error) {
      loginFailure()
      throw error
    }
  }

  function logout() {
    AuthService.logout()
    token.value = null
  }

  async function register(userData: any): Promise<RegisterResponse> {
    try {
      const data = await AuthService.register(userData)
      registerSuccess(data.jwt)
      return data
    } catch (error) {
      registerFailure()
      throw error
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


  function registerSuccess(jwt: string) {
    token.value = jwt
    localStorage.setItem('token', jwt)
  }

  function registerFailure() {
    token.value = null
    localStorage.removeItem('token')
  }

  return {
    // State
    token,
    // Getters
    isLoggedIn,
    userId,
    isVerified,
    // Actions
    login,
    logout,
    register,
    validateToken
  }
})