<template>
  <div class="space-y-6 text-left">
    <!-- Blog Header -->
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-lg font-bold font-serif text-brand-charcoal">Gestión de Blog</h2>
      <button @click="showNewPostForm = true"
        class="bg-brand-teal text-white px-4 py-2.5 rounded-full hover:bg-brand-teal-hover transition-all active:scale-[0.98] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-brand-teal/5 flex items-center">
        <PenTool class="h-3.5 w-3.5 mr-2" />
        Nuevo Artículo
      </button>
    </div>

    <!-- New Post Form -->
    <div v-if="showNewPostForm" class="bg-white rounded-[2rem] border border-brand-border p-8 shadow-xs text-left">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-base font-bold font-serif text-brand-charcoal">Crear Nuevo Artículo</h3>
        <button @click="showNewPostForm = false" class="text-brand-cool-gray hover:text-brand-charcoal cursor-pointer transition-colors">
          <X class="h-5 w-5" />
        </button>
      </div>

      <form @submit.prevent="createBlogPost" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Título</label>
          <input v-model="newPost.title" type="text" required
            class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA]"
            placeholder="Título del artículo">
        </div>

        <div>
          <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Resumen</label>
          <textarea v-model="newPost.excerpt" rows="2"
            class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA]"
            placeholder="Breve descripción del artículo"></textarea>
        </div>

        <div>
          <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Contenido</label>
          <textarea v-model="newPost.content" rows="8" required
            class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA]"
            placeholder="Contenido completo del artículo"></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Categoría</label>
            <select v-model="newPost.category"
              class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA]">
              <option value="">Selecciona una categoría</option>
              <option value="Ansiedad">Ansiedad</option>
              <option value="Depresión">Depresión</option>
              <option value="Relaciones">Relaciones</option>
              <option value="Autoestima">Autoestima</option>
              <option value="Estrés">Estrés</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Estado</label>
            <select v-model="newPost.status"
              class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA]">
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end space-x-3 pt-2">
          <button type="button" @click="showNewPostForm = false"
            class="px-5 py-2.5 border border-brand-border text-brand-cool-gray hover:text-brand-charcoal bg-white rounded-full transition-all text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs">
            Cancelar
          </button>
          <button type="submit"
            class="px-5 py-2.5 bg-brand-teal text-white rounded-full hover:bg-brand-teal-hover transition-all active:scale-[0.98] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md shadow-brand-teal/5">
            Crear Artículo
          </button>
        </div>
      </form>
    </div>

    <!-- Blog Posts List -->
    <div class="bg-white rounded-[2rem] border border-brand-border shadow-xs text-left">
      <div class="p-8 border-b border-brand-border">
        <h3 class="text-base font-bold font-serif text-brand-charcoal">Mis Artículos</h3>
      </div>

      <div class="p-8">
        <div class="space-y-4">
          <div v-for="post in blogPosts" :key="post.id" class="p-5 bg-brand-bg rounded-2xl border border-brand-border hover:border-brand-sage-border transition-all">
            <div class="flex items-start justify-between flex-wrap sm:flex-nowrap gap-4">
              <div class="flex-1">
                <h4 class="text-xs font-bold text-brand-charcoal mb-2">{{ post.title }}</h4>
                <p class="text-xs text-brand-muted-teal mb-3">{{ post.excerpt }}</p>
                <div class="flex items-center space-x-4 text-[11px] text-brand-cool-gray">
                  <span class="bg-brand-sage-bg text-brand-teal font-bold px-2 py-0.5 rounded-md border border-brand-sage-border">{{ post.category }}</span>
                  <span>{{ post.publishDate }}</span>
                  <span>{{ post.views }} vistas</span>
                </div>
              </div>
              <div class="flex items-center space-x-3 ml-4 shrink-0">
                <span
                  :class="post.status === 'published' ? 'bg-emerald-55/40 border border-emerald-200 text-emerald-800' : 'bg-brand-sage-bg border border-brand-sage-border text-brand-teal'"
                  class="px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider rounded-full">
                  {{ post.status === 'published' ? 'Publicado' : 'Borrador' }}
                </span>
                <button class="text-brand-teal hover:text-brand-teal-hover text-xs font-bold transition-all cursor-pointer">
                  Editar
                </button>
                <button class="text-brand-cool-gray hover:text-brand-charcoal cursor-pointer">
                  <MoreVertical class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div v-if="blogPosts.length === 0" class="text-center py-12 text-brand-cool-gray text-xs font-medium">
            No tienes artículos creados todavía.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  MoreVertical,
  PenTool,
  X
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