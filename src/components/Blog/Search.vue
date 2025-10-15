<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <h3 class="text-lg font-bold mb-4 text-gray-800">Buscar</h3>
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar artículos..."
        class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A9997] focus:border-transparent"
        @keyup.enter="search"
      />
      <button 
        @click="search"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#6A9997]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const search = () => {
  if (searchQuery.value.trim()) {
    // In a real application, you would implement search functionality
    // For example, navigate to a search results page or filter the current list
    console.log('Searching for:', searchQuery.value)
  }
}
</script>