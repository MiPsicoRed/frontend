import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import AuthService from '../services/auth.service.ts'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const status = ref({
    loggedIn: user.value ? true : false
  })

  // Getters (computed)
  const isLoggedIn = computed(() => status.value.loggedIn)
  const currentUser = computed(() => user.value)

  // Actions
  async function login(userData: any) {
    try {
      const loggedInUser = await AuthService.login(userData)
      loginSuccess(loggedInUser)
      return Promise.resolve(loggedInUser)
    } catch (error) {
      loginFailure()
      return Promise.reject(error)
    }
  }

  function logout() {
    AuthService.logout()
    status.value.loggedIn = false
    user.value = null
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

  // Mutations (internal functions)
  function loginSuccess(userData: any) {
    status.value.loggedIn = true
    user.value = userData
  }

  function loginFailure() {
    status.value.loggedIn = false
    user.value = null
  }

  function registerSuccess() {
    status.value.loggedIn = false
  }

  function registerFailure() {
    status.value.loggedIn = false
  }

  return {
    // State
    user,
    status,
    // Getters
    isLoggedIn,
    currentUser,
    // Actions
    login,
    logout,
    register
  }
})