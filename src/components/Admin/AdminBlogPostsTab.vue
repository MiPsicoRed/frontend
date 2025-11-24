<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Blog Posts</h2>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
      >
        + Crear Post
      </button>
    </div>

    <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
      {{ error }}
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500">
      Cargando blog posts...
    </div>

    <div v-else-if="blogPosts.length > 0" class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Título</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Slug</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Autor</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Vistas</th>
            <th class="px-6 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="post in blogPosts" :key="post.id" class="hover:bg-gray-50">
            <td class="px-6 py-3 text-sm text-gray-900 font-medium">{{ post.title }}</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ post.slug }}</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ post.author_id.substring(0, 8) }}...</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ post.view_count || 0 }}</td>
            <td class="px-6 py-3 text-right">
              <button
                @click="deleteBlogPost(post.id)"
                class="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm font-medium transition"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500">
      No hay blog posts registrados.
    </div>

    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Crear Nuevo Blog Post</h3>
        <form @submit.prevent="createBlogPost" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Autor ID (UUID)</label>
            <input
              v-model="createForm.author_id"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status ID</label>
            <input
              v-model.number="createForm.blog_post_status_id"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              v-model="createForm.title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input
              v-model="createForm.slug"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
            <textarea
              v-model="createForm.content"
              rows="4"
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

// Create a simple blog post interface since the service might not be fully typed
interface BlogPost {
  id: string
  author_id: string
  title: string
  slug: string
  content: string
  blog_post_status_id: number
  view_count?: number
  created_at?: Date
}

const blogPosts = ref<BlogPost[]>([])
const loading = ref(false)
const error = ref('')
const showCreateModal = ref(false)

const createForm = ref({
  author_id: '',
  blog_post_status_id: 1,
  title: '',
  slug: '',
  content: ''
})

const fetchBlogPosts = async () => {
  loading.value = true
  error.value = ''

  try {
    // For now, show placeholder - you can implement actual blog post service calls
    blogPosts.value = []
  } catch (err: any) {
    error.value = err?.message || 'Failed to load blog posts'
  } finally {
    loading.value = false
  }
}

const createBlogPost = async () => {
  try {
    loading.value = true
    // Implement blog post creation
    alert('Blog post creation not yet fully implemented')
    showCreateModal.value = false
    await fetchBlogPosts()
  } catch (err: any) {
    error.value = err?.message || 'Error creating blog post'
  } finally {
    loading.value = false
  }
}

const deleteBlogPost = async (postId: string) => {
  if (!confirm('¿Estás seguro?')) return

  try {
    loading.value = true
    // Implement blog post deletion
    alert('Blog post deletion not yet fully implemented')
    await fetchBlogPosts()
  } catch (err: any) {
    error.value = err?.message || 'Error deleting blog post'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBlogPosts()
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
