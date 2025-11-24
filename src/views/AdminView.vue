<script setup lang="ts">
import { ref } from 'vue'
import AdminUsersTab from '@/components/Admin/AdminUsersTab.vue'
import AdminPatientsTab from '@/components/Admin/AdminPatientsTab.vue'
import AdminProfessionalsTab from '@/components/Admin/AdminProfessionalsTab.vue'
import AdminSessionsTab from '@/components/Admin/AdminSessionsTab.vue'
import AdminSessionTypesTab from '@/components/Admin/AdminSessionTypesTab.vue'
import AdminBlogPostsTab from '@/components/Admin/AdminBlogPostsTab.vue'

const activeTab = ref('users')
const error = ref('')

const tabs = [
  { id: 'users', label: 'Usuarios' },
  { id: 'patients', label: 'Pacientes' },
  { id: 'professionals', label: 'Profesionales' },
  { id: 'sessions', label: 'Sesiones' },
  { id: 'session_types', label: 'Tipos de Sesión' },
  { id: 'blog_posts', label: 'Blog Posts' }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-2xl font-bold text-gray-900">Panel de Administración</h1>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation Tabs -->
      <div class="flex space-x-4 mb-8 border-b border-gray-200 overflow-x-auto pb-4">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2 font-medium text-sm whitespace-nowrap transition-colors',
            activeTab === tab.id
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Users Tab -->
      <div v-show="activeTab === 'users'">
        <AdminUsersTab />
      </div>

      <!-- Patients Tab -->
      <div v-show="activeTab === 'patients'">
        <AdminPatientsTab />
      </div>

      <!-- Professionals Tab -->
      <div v-show="activeTab === 'professionals'">
        <AdminProfessionalsTab />
      </div>

      <!-- Sessions Tab -->
      <div v-show="activeTab === 'sessions'">
        <AdminSessionsTab />
      </div>

      <!-- Session Types Tab -->
      <div v-show="activeTab === 'session_types'">
        <AdminSessionTypesTab />
      </div>

      <!-- Blog Posts Tab -->
      <div v-show="activeTab === 'blog_posts'">
        <AdminBlogPostsTab />
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-teal-600 {
  color: #0d9488;
}

.border-teal-600 {
  border-color: #0d9488;
}
</style>