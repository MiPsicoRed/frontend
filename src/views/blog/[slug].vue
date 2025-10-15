<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-3xl mx-auto">
        <!-- Breadcrumbs -->
        <div class="flex items-center text-sm text-gray-500 mb-8">
          <NuxtLink to="/" class="hover:text-[#6A9997]">Inicio</NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink to="/blog" class="hover:text-[#6A9997]">Blog</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-gray-700">{{ post.title }}</span>
        </div>

        <!-- Article -->
        <article class="bg-white rounded-lg shadow-md overflow-hidden">
          <img :src="post.image" :alt="post.title" class="w-full h-64 md:h-96 object-cover" />

          <div class="p-6 md:p-8">
            <div class="flex items-center mb-6">
              <span class="bg-[#6A9997]/10 text-[#6A9997] text-xs font-medium px-2.5 py-0.5 rounded">
                {{ post.category }}
              </span>
              <span class="text-gray-500 text-sm ml-auto">{{ post.date }}</span>
            </div>

            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-800">{{ post.title }}</h1>

            <div class="flex items-center mb-8 pb-8 border-b border-gray-200">
              <img :src="post.author.avatar" :alt="post.author.name" class="w-12 h-12 rounded-full mr-4" />
              <div>
                <div class="font-medium text-gray-800">{{ post.author.name }}</div>
                <div class="text-sm text-gray-500">{{ post.author.role }}</div>
              </div>
            </div>

            <div class="prose max-w-none">
              <p class="mb-4">
                La ansiedad es una respuesta natural del cuerpo ante situaciones de estrés o peligro. Sin embargo,
                cuando esta respuesta se vuelve desproporcionada o interfiere con nuestra vida diaria, puede convertirse
                en un problema. En este artículo, exploraremos algunas técnicas efectivas para manejar la ansiedad en
                situaciones cotidianas.
              </p>

              <h2 class="text-xl font-bold mt-8 mb-4">Entendiendo la ansiedad</h2>
              <p class="mb-4">
                Antes de abordar las técnicas para manejar la ansiedad, es importante entender qué es y cómo funciona.
                La ansiedad es una respuesta del sistema nervioso que prepara al cuerpo para enfrentar una amenaza. Esta
                respuesta incluye cambios físicos como aumento del ritmo cardíaco, respiración acelerada y tensión
                muscular.
              </p>
              <p class="mb-4">
                Cuando experimentamos ansiedad, nuestro cerebro está activando el sistema de "lucha o huida", una
                respuesta evolutiva que nos ha ayudado a sobrevivir como especie. El problema surge cuando esta
                respuesta se activa en situaciones que no representan un peligro real.
              </p>

              <h2 class="text-xl font-bold mt-8 mb-4">Técnicas de respiración</h2>
              <p class="mb-4">
                Una de las formas más efectivas de controlar la ansiedad es a través de la respiración consciente.
                Cuando estamos ansiosos, tendemos a respirar de forma rápida y superficial, lo que puede aumentar la
                sensación de ansiedad. Practicar la respiración diafragmática puede ayudar a reducir estos síntomas.
              </p>
              <p class="mb-4">
                Para practicar la respiración diafragmática:
              </p>
              <ol class="list-decimal pl-6 mb-4">
                <li class="mb-2">Siéntate o acuéstate en una posición cómoda.</li>
                <li class="mb-2">Coloca una mano en tu pecho y otra en tu abdomen.</li>
                <li class="mb-2">Inhala lentamente por la nariz, sintiendo cómo tu abdomen se expande.</li>
                <li class="mb-2">Exhala lentamente por la boca, sintiendo cómo tu abdomen se contrae.</li>
                <li>Repite este proceso durante 5-10 minutos.</li>
              </ol>

              <h2 class="text-xl font-bold mt-8 mb-4">Mindfulness y meditación</h2>
              <p class="mb-4">
                El mindfulness, o atención plena, es una práctica que consiste en prestar atención al momento presente
                sin juzgar. Esta práctica puede ayudar a reducir la ansiedad al permitirnos observar nuestros
                pensamientos y emociones sin dejarnos llevar por ellos.
              </p>
              <p class="mb-4">
                Existen muchas formas de practicar mindfulness, desde meditaciones guiadas hasta ejercicios simples como
                prestar atención a los sentidos. Incluso dedicar unos minutos al día a esta práctica puede tener
                beneficios significativos para reducir la ansiedad.
              </p>

              <h2 class="text-xl font-bold mt-8 mb-4">Reestructuración cognitiva</h2>
              <p class="mb-4">
                La reestructuración cognitiva es una técnica que consiste en identificar y cuestionar los pensamientos
                negativos o distorsionados que contribuyen a la ansiedad. Al cambiar estos patrones de pensamiento,
                podemos reducir la ansiedad que experimentamos.
              </p>
              <p class="mb-4">
                Por ejemplo, si tienes el pensamiento "todo va a salir mal", puedes cuestionarlo preguntándote: ¿Qué
                evidencia tengo de que todo va a salir mal? ¿Ha habido ocasiones en las que las cosas han salido bien?
                ¿Qué es lo peor que podría pasar y cómo podría manejarlo?
              </p>

              <h2 class="text-xl font-bold mt-8 mb-4">Actividad física regular</h2>
              <p class="mb-4">
                El ejercicio físico regular es una de las formas más efectivas de reducir la ansiedad. La actividad
                física libera endorfinas, que son neurotransmisores que producen sensación de bienestar. Además, el
                ejercicio puede ayudar a reducir la tensión muscular y mejorar la calidad del sueño.
              </p>
              <p class="mb-4">
                No es necesario realizar ejercicios intensos para obtener estos beneficios. Caminar, nadar, bailar o
                practicar yoga son actividades que pueden ayudar a reducir la ansiedad.
              </p>

              <h2 class="text-xl font-bold mt-8 mb-4">Cuándo buscar ayuda profesional</h2>
              <p class="mb-4">
                Si la ansiedad interfiere significativamente con tu vida diaria, es importante buscar ayuda profesional.
                Un psicólogo o psiquiatra puede ayudarte a desarrollar estrategias personalizadas para manejar la
                ansiedad y, en algunos casos, puede recomendar medicación.
              </p>
              <p class="mb-4">
                Recuerda que buscar ayuda no es un signo de debilidad, sino de fortaleza. La terapia puede proporcionar
                herramientas valiosas para manejar la ansiedad y mejorar la calidad de vida.
              </p>

              <h2 class="text-xl font-bold mt-8 mb-4">Conclusión</h2>
              <p class="mb-4">
                La ansiedad es una experiencia común, pero existen muchas técnicas efectivas para manejarla. La
                respiración consciente, el mindfulness, la reestructuración cognitiva y la actividad física regular son
                solo algunas de las estrategias que pueden ayudar. Si la ansiedad persiste, no dudes en buscar ayuda
                profesional.
              </p>
              <p>
                Recuerda que manejar la ansiedad es un proceso, y lo que funciona para una persona puede no funcionar
                para otra. Es importante ser paciente y estar dispuesto a probar diferentes técnicas hasta encontrar las
                que mejor se adapten a ti.
              </p>
            </div>
          </div>
        </article>

        <!-- Share and Tags -->
        <div class="mt-8 flex flex-wrap items-center justify-between">
          <div class="flex flex-wrap gap-2 mb-4 md:mb-0">
            <span class="text-sm font-medium text-gray-700">Etiquetas:</span>
            <a href="#" class="text-sm text-[#6A9997] hover:underline">#ansiedad</a>
            <a href="#" class="text-sm text-[#6A9997] hover:underline">#saludmental</a>
            <a href="#" class="text-sm text-[#6A9997] hover:underline">#bienestar</a>
          </div>
          <div class="flex items-center">
            <span class="text-sm font-medium text-gray-700 mr-2">Compartir:</span>
            <div class="flex space-x-2">
              <a href="#" class="text-gray-500 hover:text-[#6A9997]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-[#6A9997]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-twitter">
                  <path
                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-[#6A9997]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-[#6A9997]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-mail">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Related Posts -->
        <div class="mt-12">
          <h3 class="text-xl font-bold mb-6">Artículos relacionados</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(relatedPost, index) in relatedPosts" :key="index"
              class="bg-white rounded-lg shadow overflow-hidden">
              <NuxtLink :to="`/blog/${relatedPost.slug}`" class="block">
                <img :src="relatedPost.image" :alt="relatedPost.title" class="w-full h-40 object-cover" />
                <div class="p-4">
                  <h4 class="font-bold mb-2 text-gray-800">{{ relatedPost.title }}</h4>
                  <p class="text-sm text-gray-600">{{ relatedPost.excerpt }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="mt-12 bg-[#6A9997] text-white rounded-lg p-6 md:p-8 text-center">
          <h3 class="text-xl md:text-2xl font-bold mb-4">¿Necesitas ayuda profesional?</h3>
          <p class="mb-6">Nuestros terapeutas están listos para ayudarte. Agenda tu primera sesión gratuita hoy mismo.
          </p>
          <NuxtLink to="/register"
            class="inline-block bg-white text-[#6A9997] font-medium py-2 px-6 rounded-md hover:bg-gray-100 transition duration-200">
            Reservar consulta
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug

const { data: post } = await useAsyncData('post', () => {
  return queryCollection('blogs')
    .where('slug', '=', slug)
    .first()
})

// // Get all blogs
// const { data: blogs } = await useAsyncData('blogs', () => {
//   return queryCollection('blogs')
//     .order('id', 'DESC')
//     .all()
// })

// Related posts
const relatedPosts = [
  {
    slug: 'mindfulness-para-principiantes',
    title: 'Mindfulness para principiantes: guía práctica',
    excerpt: 'Aprende los fundamentos del mindfulness y cómo incorporar esta práctica en tu rutina diaria.',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    slug: 'tecnicas-respiracion',
    title: 'Técnicas de respiración para reducir el estrés',
    excerpt: 'Aprende cómo la respiración consciente puede ayudarte a manejar situaciones estresantes.',
    image: '/placeholder.svg?height=400&width=600'
  },
  {
    slug: 'habitos-saludables-mente',
    title: '7 hábitos para mantener una mente saludable',
    excerpt: 'Incorpora estos hábitos en tu rutina diaria para mejorar tu salud mental.',
    image: '/placeholder.svg?height=400&width=600'
  }
]
</script>