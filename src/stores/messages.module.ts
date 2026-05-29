import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import authHeader from '../services/auth/auth-header'

const API_URL = import.meta.env.VITE_BASE_API_URL + 'message/'

export const useMessageStore = defineStore('messages', () => {
  const conversation = ref([])
  const loading = ref(false)

  async function fetchConversation(otherUserId: string) {
    loading.value = true
    try {
      const response = await axios.get(API_URL + `conversation/${otherUserId}`, { headers: authHeader() })
      conversation.value = response.data
    } catch (error) {
      console.error('Failed to fetch conversation', error)
    } finally {
      loading.value = false
    }
  }

  async function sendMessage(receiverId: string, content: string) {
    try {
      const response = await axios.post(API_URL + 'send', { receiver_id: receiverId, content }, { headers: authHeader() })
      conversation.value.push(response.data)
      return response.data
    } catch (error) {
      console.error('Failed to send message', error)
      throw error
    }
  }

  return {
    conversation,
    loading,
    fetchConversation,
    sendMessage
  }
})
