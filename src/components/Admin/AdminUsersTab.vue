<template>
  <div>
    <!-- Header with Create Button -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Usuarios</h2>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
      >
        + Crear Usuario
      </button>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
      {{ error }}
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8 text-gray-500">
      Cargando usuarios...
    </div>

    <!-- Users Table -->
    <div v-else-if="users.length > 0" class="bg-white rounded-lg shadow-sm border overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b sticky top-0">
          <tr>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">User ID</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Username</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Email</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Apellido</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Rol</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Verificado</th>
            <th class="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Creado</th>
            <th class="px-4 py-3 text-right font-semibold text-gray-700 whitespace-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 font-mono text-xs text-gray-900 break-all">{{ user.id }}</td>
            <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{{ user.username }}</td>
            <td class="px-4 py-3 text-gray-600 break-all">{{ user.email }}</td>
            <td class="px-4 py-3 text-gray-600">{{ user.usersurname }}</td>
            <td class="px-4 py-3">
              <span :class="['px-2 py-1 rounded-full text-xs font-medium', roleClass(user.role_id)]">
                {{ roleName(user.role_id) }}
              </span>
            </td>
            <td class="px-4 py-3">
              <span v-if="user.verified" class="text-green-600 font-medium text-xs">✓ Verificado</span>
              <span v-else class="text-gray-400 text-xs">No verificado</span>
            </td>
            <td class="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{{ formatDate(user.created_at) }}</td>
            <td class="px-4 py-3 text-right">
              <button
                @click="deleteUser(user.id)"
                class="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-xs font-medium transition"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500">
      No hay usuarios registrados.
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Crear Nuevo Usuario</h3>

        <form @submit.prevent="createUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              v-model="createForm.username"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="createForm.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              v-model="createForm.password"
              type="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Surname</label>
            <input
              v-model="createForm.usersurname"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="submit"
              class="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Crear
            </button>
            <button
              type="button"
              @click="showCreateModal = false"
              class="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserService, { type User } from '@/services/user/user.service'

const users = ref<User[]>([])
const loading = ref(false)
const error = ref('')
const showCreateModal = ref(false)

const createForm = ref({
  username: '',
  email: '',
  password: '',
  usersurname: ''
})

const roleName = (roleId: number) => {
  const roles: Record<number, string> = { 1: 'Patient', 2: 'Professional', 3: 'Admin' }
  return roles[roleId] || 'Unknown'
}

const roleClass = (roleId: number) => {
  const classes: Record<number, string> = {
    1: 'bg-blue-100 text-blue-800',
    2: 'bg-purple-100 text-purple-800',
    3: 'bg-red-100 text-red-800'
  }
  return classes[roleId] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date: Date | string | null): string => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString()
}

const fetchUsers = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await UserService.getAllUsers()
    users.value = Array.isArray(response) ? response : response.data || []
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Failed to load users'
    console.error('Error fetching users:', err)
  } finally {
    loading.value = false
  }
}

const createUser = async () => {
  try {
    loading.value = true
    await UserService.register(createForm.value)
    alert('Usuario creado exitosamente')
    showCreateModal.value = false
    createForm.value = { username: '', email: '', password: '', usersurname: '' }
    await fetchUsers()
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Error creating user'
    console.error('Error creating user:', err)
  } finally {
    loading.value = false
  }
}

const deleteUser = async (userId: string) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return

  try {
    // Add delete endpoint when available
    alert('Delete endpoint not yet implemented')
  } catch (err: any) {
    error.value = err?.message || 'Error deleting user'
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.bg-teal-600 {
  background-color: #0d9488;
}

.hover\:bg-teal-700:hover {
  background-color: #0f766e;
}

.text-teal-600 {
  color: #0d9488;
}

.focus\:ring-teal-500:focus {
  --tw-ring-color: #14b8a6;
}

.focus\:border-teal-500:focus {
  border-color: #14b8a6;
}
</style>
