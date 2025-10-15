<template>
  <div class="font-sans bg-[#fcfaf7]">
  <header
    class="bg-[#fcfaf7]/90 backdrop-blur-sm shadow-sm top-0 z-99 border-b border-[#e8d5c4]/30 sticky w-full">
    <NavBar />
  </header>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-3xl md:text-4xl font-bold mb-4">Blog de MiPsicoRed</h1>
          <p class="text-gray-600 text-lg">
            Artículos, consejos y recursos sobre salud mental y bienestar psicológico
          </p>
        </div>
      </div>
    </div>

    <!-- Blog List Section -->
    <div class="container mx-auto px-4 flex gap-6">
      <div class="container mx-auto px-4 py-6 w-8/12">
        <BlogFeatured />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogPost 
            v-for="post in blogPosts"
            :post="post"
            :key="post.id" 
          />
        </div>
      </div>

      <div class="container mx-auto px-4 py-6 w-4/12">
        <BlogSearch />
        <BlogCategoryFilter />
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-12 pb-12">
          <nav class="inline-flex rounded-md shadow">
            <a href="#" class="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Anterior
            </a>
            <a href="#" class="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </a>
            <a href="#" class="px-4 py-2 border-t border-b border-gray-300 bg-[#6A9997] text-sm font-medium text-white">
              2
            </a>
            <a href="#" class="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </a>
            <a href="#" class="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Siguiente
            </a>
          </nav>
    </div>

    <!-- Blog Posts Grid -->
  </div>
  
  <footer class="bg-[#f8f3eb] py-12 border-t border-[#e8d5c4]/30">
    <Footer />
  </footer>
  </div>
</template>

<script setup>
// Sample blog post data
const blogPosts = [
  {
    id: 1,
    slug: 'como-manejar-la-ansiedad',
    title: 'Cómo manejar la ansiedad en situaciones cotidianas',
    excerpt: 'Descubre técnicas efectivas para controlar la ansiedad y mejorar tu bienestar emocional en el día a día.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Ansiedad',
    date: '12 Mayo 2023',
    author: {
      name: 'Dra. María Rodríguez',
      avatar: '/placeholder.svg?height=100&width=100'
    }
  },
  {
    id: 2,
    slug: 'beneficios-terapia-online',
    title: 'Los beneficios de la terapia online para tu salud mental',
    excerpt: 'La terapia online ofrece flexibilidad y accesibilidad. Conoce cómo puede ayudarte a mejorar tu bienestar psicológico.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Terapia Online',
    date: '28 Abril 2023',
    author: {
      name: 'Dr. Carlos Méndez',
      avatar: '/placeholder.svg?height=100&width=100'
    }
  },
  {
    id: 3,
    slug: 'mindfulness-para-principiantes',
    title: 'Mindfulness para principiantes: guía práctica',
    excerpt: 'Aprende los fundamentos del mindfulness y cómo incorporar esta práctica en tu rutina diaria para reducir el estrés.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Mindfulness',
    date: '15 Abril 2023',
    author: {
      name: 'Lic. Ana Gómez',
      avatar: '/placeholder.svg?height=100&width=100'
    }
  },
  {
    id: 4,
    slug: 'relaciones-saludables',
    title: 'Cómo construir relaciones saludables',
    excerpt: 'Consejos prácticos para desarrollar y mantener relaciones interpersonales sanas y satisfactorias.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Relaciones',
    date: '3 Abril 2023',
    author: {
      name: 'Dr. Javier Torres',
      avatar: '/placeholder.svg?height=100&width=100'
    }
  },
  {
    id: 5,
    slug: 'superar-depresion',
    title: 'Estrategias para superar la depresión',
    excerpt: 'Conoce diferentes enfoques terapéuticos y hábitos que pueden ayudarte a combatir los síntomas de la depresión.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Depresión',
    date: '22 Marzo 2023',
    author: {
      name: 'Dra. Laura Sánchez',
      avatar: '/placeholder.svg?height=100&width=100'
    }
  },
  {
    id: 6,
    slug: 'habitos-saludables-mente',
    title: '7 hábitos para mantener una mente saludable',
    excerpt: 'Incorpora estos hábitos en tu rutina diaria para mejorar tu salud mental y aumentar tu bienestar general.',
    image: '/placeholder.svg?height=400&width=600',
    category: 'Bienestar',
    date: '10 Marzo 2023',
    author: {
      name: 'Lic. Roberto Díaz',
      avatar: '/placeholder.svg?height=100&width=100'
    }
  }
]
</script>