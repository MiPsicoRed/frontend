import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import authHeader from '../services/auth/auth-header'
import { useToast } from 'vue-toastification'

const API_URL = import.meta.env.VITE_BASE_API_URL + 'notification'

export interface Notification {
  id: string
  user_id: string
  type: 'info' | 'success' | 'warning' | 'default'
  title: string
  message: string
  is_read: boolean
  created_at: string
}

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])
  const loading = ref(false)
  const toast = useToast()

  const unreadCount = computed(() => notifications.value.filter(n => !n.is_read).length)

  async function fetchNotifications() {
    loading.value = true
    try {
      const response = await axios.get(API_URL, { headers: authHeader() })
      notifications.value = response.data
    } catch (error) {
      console.error('Failed to fetch notifications', error)
    } finally {
      loading.value = false
    }
  }

  async function markAllAsRead() {
    try {
      await axios.patch(API_URL + '/read-all', {}, { headers: authHeader() })
      notifications.value.forEach(n => n.is_read = true)
    } catch (error) {
      console.error('Failed to mark notifications as read', error)
    }
  }

  async function markAsRead(id: string) {
    try {
      await axios.patch(API_URL + `/${id}/read`, {}, { headers: authHeader() })
      const notif = notifications.value.find(n => n.id === id)
      if (notif) notif.is_read = true
    } catch (error) {
      console.error('Failed to mark notification as read', error)
    }
  }

  function addNotification(notification: Notification) {
    // Add to the top of the list
    notifications.value.unshift(notification)
    
    // Show a toast
    toast(notification.title, {
      bodyClassName: 'custom-toast-body',
      type: notification.type === 'info' ? 'info' : 
            notification.type === 'success' ? 'success' : 
            notification.type === 'warning' ? 'warning' : 'default'
    })
  }

  function clearAll() {
    notifications.value = []
  }

  return {
    notifications,
    loading,
    unreadCount,
    fetchNotifications,
    markAllAsRead,
    markAsRead,
    addNotification,
    clearAll
  }
})
