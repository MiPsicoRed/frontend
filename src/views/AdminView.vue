<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserService, { type User } from '@/services/user/user.service'

const users = ref<User[]>([])
const loading = ref(false)
const error = ref('')

const fetchUsers = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await UserService.getAllUsers()
    users.value = response.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load users'
    console.error('Error fetching users:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <main class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p class="text-gray-600">Manage all users in the system</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div class="flex items-center justify-center">
          <svg class="animate-spin h-10 w-10 text-indigo-600" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none">
            </circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <span class="ml-3 text-lg text-gray-600">Loading users...</span>
        </div>
      </div>

      <!-- Users List -->
      <div v-else-if="users.length > 0" class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Table Header -->
        <div class="bg-linear-to-r from-indigo-600 to-indigo-700 px-6 py-4">
          <h2 class="text-xl font-semibold text-white">All Users ({{ users.length }})</h2>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Username</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4 text-sm text-gray-600">{{ user.id }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span class="text-white font-semibold">
                        {{ user.username.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <span class="font-medium text-gray-900">{{ user.username }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-2">
                    <button
                      class="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium transition">
                      Edit
                    </button>
                    <button
                      class="px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium transition">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Card View -->
        <div class="md:hidden divide-y divide-gray-200">
          <div v-for="user in users" :key="user.id" class="p-6 hover:bg-gray-50 transition">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <span class="text-white font-semibold text-lg">
                  {{ user.username.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 mb-1">{{ user.username }}</h3>
                <p class="text-sm text-gray-600 mb-1">{{ user.email }}</p>
                <p class="text-xs text-gray-500">ID: {{ user.id }}</p>
                <div class="flex items-center space-x-2 mt-3">
                  <button
                    class="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium transition">
                    Edit
                  </button>
                  <button
                    class="px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
        <p class="text-gray-600">There are no users in the system yet.</p>
      </div>
    </div>
  </main>
</template>