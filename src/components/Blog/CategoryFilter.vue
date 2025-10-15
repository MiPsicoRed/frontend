<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <h3 class="text-lg font-bold mb-4 text-gray-800">Categorías</h3>
    <div class="space-y-2">
      <button 
        v-for="category in categories" 
        :key="category.id"
        @click="selectCategory(category.id)"
        class="flex items-center justify-between w-full px-3 py-2 text-left rounded-md transition-colors"
        :class="selectedCategory === category.id ? 'bg-[#6A9997] text-white' : 'hover:bg-gray-100 text-gray-700'"
      >
        <span>{{ category.name }}</span>
        <span class="bg-white text-[#6A9997] text-xs font-medium px-2 py-0.5 rounded-full" v-if="selectedCategory === category.id">
          {{ category.count }}
        </span>
        <span class="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full" v-else>
          {{ category.count }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedCategory = ref(null)

const categories = [
  { id: 'all', name: 'Todos los artículos', count: 24 },
  { id: 'anxiety', name: 'Ansiedad', count: 8 },
  { id: 'depression', name: 'Depresión', count: 6 },
  { id: 'relationships', name: 'Relaciones', count: 5 },
  { id: 'mindfulness', name: 'Mindfulness', count: 4 },
  { id: 'therapy', name: 'Terapia Online', count: 7 },
  { id: 'wellness', name: 'Bienestar', count: 9 }
]

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  // In a real application, you would emit an event or update a store
  // to filter the blog posts based on the selected category
}
</script>