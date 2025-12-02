<template>
  <div class="space-y-6">
    <!-- Blog Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Gestión de Blog</h2>
      <button @click="showNewPostForm = true"
        class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
        <PenTool class="h-4 w-4 inline mr-2" />
        Nuevo Artículo
      </button>
    </div>

    <!-- New Post Form -->
    <div v-if="showNewPostForm" class="bg-white rounded-xl shadow-sm border p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Crear Nuevo Artículo</h3>
        <button @click="showNewPostForm = false" class="text-gray-400 hover:text-gray-600">
          <X class="h-5 w-5" />
        </button>
      </div>

      <form @submit.prevent="createBlogPost" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Título</label>
          <input v-model="newPost.title" type="text" required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Título del artículo">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Resumen</label>
          <textarea v-model="newPost.excerpt" rows="2"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Breve descripción del artículo"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Contenido</label>
          <textarea v-model="newPost.content" rows="8" required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Contenido completo del artículo"></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <select v-model="newPost.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
              <option value="">Selecciona una categoría</option>
              <option value="Ansiedad">Ansiedad</option>
              <option value="Depresión">Depresión</option>
              <option value="Relaciones">Relaciones</option>
              <option value="Autoestima">Autoestima</option>
              <option value="Estrés">Estrés</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select v-model="newPost.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button type="button" @click="showNewPostForm = false"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button type="submit"
            class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Crear Artículo
          </button>
        </div>
      </form>
    </div>

    <!-- Blog Posts List -->
    <div class="bg-white rounded-xl shadow-sm border">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Mis Artículos</h3>
      </div>

      <div class="p-6">
        <div class="space-y-4">
          <div v-for="post in blogPosts" :key="post.id" class="border rounded-lg p-4">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h4 class="font-medium text-gray-900 mb-2">{{ post.title }}</h4>
                <p class="text-sm text-gray-600 mb-3">{{ post.excerpt }}</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{{ post.category }}</span>
                  <span>{{ post.publishDate }}</span>
                  <span>{{ post.views }} visualizaciones</span>
                </div>
              </div>
              <div class="flex items-center space-x-3 ml-4">
                <span
                  :class="post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                  class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ post.status === 'published' ? 'Publicado' : 'Borrador' }}
                </span>
                <button class="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  Editar
                </button>
                <button class="text-gray-400 hover:text-gray-600">
                  <MoreVertical class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  MoreVertical
} from 'lucide-vue-next'

const showNewPostForm = ref(false)

const newPost = ref({
  title: '',
  excerpt: '',
  content: '',
  category: '',
  status: 'draft'
})

const blogPosts = ref([])

const createBlogPost = () => {
  // Handle blog post creation
  console.log('Creating blog post:', newPost.value)
  showNewPostForm.value = false
  newPost.value = {
    title: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'draft'
  }
}
</script>