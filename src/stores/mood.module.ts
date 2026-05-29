import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import authHeader from '../services/auth/auth-header'

const API_URL = import.meta.env.VITE_BASE_API_URL + 'mood_log/'

export const useMoodStore = defineStore('mood', () => {
  const logs = ref([])
  const loading = ref(false)

  async function fetchMyLogs() {
    loading.value = true
    try {
      const response = await axios.get(API_URL + 'mine', { headers: authHeader() })
      logs.value = response.data
    } catch (error) {
      console.error('Failed to fetch mood logs', error)
    } finally {
      loading.value = false
    }
  }

  async function createLog(payload: { mood_score: number, note: string | null, shared_with_professional: boolean }) {
    try {
      const response = await axios.post(API_URL + 'create', payload, { headers: authHeader() })
      logs.value.unshift(response.data)
      return response.data
    } catch (error) {
      console.error('Failed to create mood log', error)
      throw error
    }
  }

  return {
    logs,
    loading,
    fetchMyLogs,
    createLog
  }
})
