<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { Sparkles, Send, Brain, Bot, Heart, Phone } from 'lucide-vue-next'
import { therapistsData, type Therapist } from '@/data/therapists'

interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
}

const messages = ref<ChatMessage[]>([
  {
    id: 'welcome-msg',
    sender: 'assistant',
    text: '¡Hola! Soy Sofía, la Coordinadora de Triaje Inteligente de MiPsicoRed. Estoy aquí para escucharte y ayudarte a encontrar el apoyo emocional perfecto para ti. ¿Qué te trae hoy por aquí? ¿Cuáles son los principales desafíos o sentimientos que estás cruzando?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
])

const inputText = ref('')
const isLoading = ref(false)
const matchedTherapists = ref<Therapist[]>([])
const messagesEndRef = ref<HTMLElement | null>(null)

const suggestions = [
  { label: 'Siento ansiedad laboral constante', text: 'Últimamente siento un estrés y ansiedad laboral tremenda, casi no puedo dormir de noche pensando en lo que pasará mañana.' },
  { label: 'Problemas de comunicación con mi pareja', text: 'Busco ayuda para mi relación. Siento que mi pareja y yo ya no nos entendemos y cualquier conversación menor termina en discusión.' },
  { label: 'Orientación para la mente de mi hijo', text: 'Quisiera orientación psicológica para mi hijo pequeño. Le cuesta mucho concentrarse en la escuela y suele frustrarse rápido.' },
  { label: 'Superar un evento traumático', text: 'He pasado por un evento difícil y doloroso recientemente. Me siento estancada y con pesadillas duradera.' }
]

const scrollToBottom = async () => {
  await nextTick()
  if (messagesEndRef.value) {
    messagesEndRef.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleSendMessage = async (textToSend: string) => {
  if (!textToSend.trim() || isLoading.value) return

  const userMsg: ChatMessage = {
    id: `user-${Date.now()}`,
    sender: 'user',
    text: textToSend,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  messages.value.push(userMsg)
  inputText.value = ''
  isLoading.value = true
  await scrollToBottom()

  try {
    const chatHistory = messages.value.map(m => ({
      sender: m.sender,
      text: m.text
    }))

    const apiUrl = (import.meta.env.VITE_BASE_API_URL || 'http://localhost:3001/api/') + 'gemini/chat'

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory })
    })

    if (!res.ok) {
      throw new Error('La llamada al servidor de Triaje Inteligente falló.')
    }

    const data = await res.json()
    
    const assistantMsg: ChatMessage = {
      id: `assistant-${Date.now()}`,
      sender: 'assistant',
      text: data.reply || 'He recibido tu mensaje de forma segura, déjame analizar tus inquietudes.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    messages.value.push(assistantMsg)

    // Match recommended therapist profiles using IDs from backend
    if (data.matchedTherapistIds && Array.isArray(data.matchedTherapistIds)) {
      matchedTherapists.value = therapistsData.filter(t => data.matchedTherapistIds.includes(t.id))
    }

  } catch (error) {
    console.error(error)
    const errorMsg: ChatMessage = {
      id: `error-${Date.now()}`,
      sender: 'assistant',
      text: 'Lo lamento, experimenté una interrupción de conexión. Por favor, describe tus inquietudes de nuevo.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    messages.value.push(errorMsg)
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}
</script>

<template>
  <section class="bg-white py-20 border-b border-brand-border">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      
      <!-- Layout Row -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        <!-- Informational Column (Left Side) -->
        <div class="lg:col-span-4 flex flex-col justify-between text-left space-y-6">
          <div class="space-y-4">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sage-bg text-brand-teal text-xs font-bold font-sans border border-brand-sage-border">
              <Brain class="w-3.5 h-3.5 text-brand-teal" />
              Soporte de Entrada Inteligente
            </span>
            <h2 class="text-2xl font-serif font-bold text-brand-charcoal tracking-tight leading-tight">
              Triaje Asistido con Inteligencia Artificial
            </h2>
            <p class="text-brand-muted-teal text-xs leading-relaxed font-sans font-medium">
              Describe tus emociones, estrés o conflictos con total confidencialidad. Sofía, nuestra coordinadora virtual, analizará tu contexto y te derivará de inmediato con el especialista ideal.
            </p>
          </div>

          <!-- Quality list points -->
          <div class="space-y-3 pt-4 border-t border-brand-border">
            <div class="flex gap-2.5 items-start">
              <div class="w-6 h-6 rounded-full bg-brand-sage-bg text-brand-teal flex items-center justify-center text-xs font-black shrink-0 font-sans border border-brand-sage-border">1</div>
              <p class="text-xs text-brand-charcoal leading-tight font-sans"><strong>Confidencialidad Garantizada:</strong> Tus textos no se usan para entrenar modelos externos.</p>
            </div>
            <div class="flex gap-2.5 items-start">
              <div class="w-6 h-6 rounded-full bg-brand-sage-bg text-brand-teal flex items-center justify-center text-xs font-black shrink-0 font-sans border border-brand-sage-border">2</div>
              <p class="text-xs text-brand-charcoal leading-tight font-sans"><strong>Sugerencias Inteligentes:</strong> Conexión con psicólogos basados en su real especialidad clínica.</p>
            </div>
          </div>

          <!-- Quick therapists showing block when matched -->
          <div v-if="matchedTherapists.length > 0" class="p-5 rounded-2xl bg-brand-sage-bg border border-brand-sage-border space-y-3">
            <div class="flex items-center gap-1.5 font-sans">
              <Heart class="w-4 h-4 text-brand-teal animate-pulse" />
              <span class="text-xs font-bold text-brand-teal">Terapeutas Recomendados:</span>
            </div>
            
            <div class="space-y-2 font-sans">
              <div v-for="t in matchedTherapists" :key="t.id" class="bg-white p-3 rounded-xl border border-brand-border flex gap-2.5 items-center">
                <img 
                  :src="t.image" 
                  :alt="t.name" 
                  class="w-10 h-10 rounded-full object-cover shrink-0 bg-[#F4F7F6]"
                />
                <div class="text-left flex-1 min-w-0">
                  <p class="text-xs font-bold text-brand-charcoal truncate">{{ t.name }}</p>
                  <p class="text-[10px] text-brand-muted-teal truncate">{{ t.specialty[0] }}</p>
                </div>
                <a 
                  :href="`https://wa.me/56900000000?text=Hola,%20vi%20el%20perfil%20del%20terapeuta%20${encodeURIComponent(t.name)}%20en%20MiPsicoRed%20y%20me%20gustaría%20agendar%20una%20consulta.`"
                  target="_blank"
                  rel="noreferrer"
                  class="p-1.5 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors"
                  title="Contactar vía WhatsApp"
                >
                  <Phone class="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- Chat Panel Box (Right Side) -->
        <div class="lg:col-span-8 flex flex-col bg-[#F9FBFA] rounded-[2rem] border border-brand-border shadow-sm overflow-hidden min-h-[460px] max-h-[550px]">
          
          <!-- Triage Window Header -->
          <div class="bg-white border-b border-brand-border px-6 py-5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-brand-teal flex items-center justify-center text-white">
                <Bot class="w-4.5 h-4.5" />
              </div>
              <div class="text-left font-sans">
                <h4 class="text-xs font-bold text-brand-charcoal leading-tight">Asistente Sofía</h4>
                <p class="text-[9px] text-[#66827F] font-bold leading-none mt-1 uppercase tracking-widest">Coordinadora IA • Activa</p>
              </div>
            </div>
            <div class="flex items-center gap-1.5 text-brand-muted-teal text-xs font-sans">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              <span class="font-semibold text-[10.5px]">Confidencial</span>
            </div>
          </div>

          <!-- Chat Messages Log -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4 text-left font-sans">
            <div 
              v-for="m in messages" 
              :key="m.id"
              class="flex"
              :class="m.sender === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div class="max-w-[80%] rounded-[1.25rem] p-4 text-xs leading-relaxed shadow-xs"
                :class="m.sender === 'user' ? 'bg-brand-teal text-white rounded-br-none' : 'bg-white text-brand-charcoal border border-brand-border rounded-bl-none'"
              >
                <p class="whitespace-pre-line">{{ m.text }}</p>
                <span class="block text-[9px] mt-1.5 text-right"
                  :class="m.sender === 'user' ? 'text-brand-sage-bg' : 'text-brand-cool-gray'"
                >
                  {{ m.timestamp }}
                </span>
              </div>
            </div>

            <!-- Bot typing simulation indicator -->
            <div v-if="isLoading" class="flex justify-start">
              <div class="bg-white border border-brand-border rounded-2xl rounded-bl-none p-4 text-xs space-y-1.5 shadow-xs max-w-sm">
                <div class="flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-teal animate-bounce" style="animation-delay: 0ms" />
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-teal animate-bounce" style="animation-delay: 150ms" />
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-teal animate-bounce" style="animation-delay: 300ms" />
                </div>
                <p class="text-[10px] text-brand-cool-gray font-medium">Sofía está formulando recomendaciones empáticas...</p>
              </div>
            </div>

            <div ref="messagesEndRef" />
          </div>

          <!-- Suggestion Chips -->
          <div v-if="messages.length === 1" class="bg-white border-t border-brand-border p-4 text-left font-sans">
            <p class="text-[10.5px] font-bold text-brand-muted-teal mb-2.5">Historias de ejemplo para empezar:</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(s, index) in suggestions"
                :key="index"
                @click="handleSendMessage(s.text)"
                class="text-[10px] px-3.5 py-2 bg-[#F4F7F6] border border-[#D1E2E0] text-[#0D5C63] hover:border-brand-teal hover:bg-[#e9f0ee] rounded-full transition-colors cursor-pointer font-bold text-left"
              >
                {{ s.label }}
              </button>
            </div>
          </div>

          <!-- Input Bar Form -->
          <div class="bg-white border-t border-brand-border p-4 font-sans">
            <div class="flex gap-2">
              <input
                type="text"
                v-model="inputText"
                placeholder="Escribe tu mensaje con absoluta confidencialidad..."
                @keydown.enter="handleSendMessage(inputText)"
                class="flex-1 bg-[#F4F7F6] text-brand-charcoal border border-brand-border rounded-full px-5 py-3 text-xs focus:outline-brand-teal focus:bg-white transition-all"
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="handleSendMessage(inputText)"
                :disabled="isLoading || !inputText.trim()"
                class="px-5 bg-brand-teal text-white rounded-full hover:bg-brand-teal-hover active:scale-95 transition-all flex items-center justify-center shrink-0 disabled:opacity-40 cursor-pointer border-0"
              >
                <Send class="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>