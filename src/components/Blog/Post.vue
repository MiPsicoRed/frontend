<template>
    <article 
            class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
          >
            <NuxtLink :to="`/blog/${props.post.slug}`" class="block">
              <img 
                :src="props.post.image" 
                :alt="props.post.title" 
                class="w-full h-48 object-cover"
              />
              <div class="p-6">
                <div class="flex items-center mb-4">
                  <span class="bg-[#6A9997]/10 text-[#6A9997] text-xs font-medium px-2.5 py-0.5 rounded">
                    {{ props.post.category }}
                  </span>
                  <span class="text-gray-500 text-sm ml-auto">{{ props.post.date }}</span>
                </div>
                <h2 class="text-xl font-bold mb-2 text-gray-800">{{ props.post.title }}</h2>
                <p class="text-gray-600 mb-4">{{ props.post.excerpt }}</p>
                <div class="flex items-center">
                  <img 
                    :src="props.post.author.avatar" 
                    :alt="props.post.author.name" 
                    class="w-8 h-8 rounded-full mr-2"
                  />
                  <span class="text-sm text-gray-700">{{ props.post.author.name }}</span>
                </div>
              </div>
            </NuxtLink>
          </article>
</template>

<script setup>
    const props = defineProps({
        post: {
            type: Object,
            required: true
        }
    })
</script>