<template>
  <div>
    <div class="chat-icon" @click="toggleChat">💬</div>

    <div v-if="isOpen" class="chat-box">
      <div class="header">Asistente Psicológico Virtual</div>
      <div class="messages">
        <div v-for="(msg, index) in messages" :key="index" :class="msg.role">
          {{ msg.text }}
        </div>
      </div>

      <div v-if="step < questions.length" class="question">
        <p>{{ questions[step] }}</p>
        <div class="options">
          <button v-for="option in options[step]" :key="option" @click="answer(option)">
            {{ option }}
          </button>
        </div>
      </div>

      <div v-else-if="loading">Analizando tus respuestas...</div>

      <div v-else class="results">
        <p><strong>Categoría:</strong> {{ result.category }}</p>
        <p>{{ result.explanation }}</p>
        <div v-for="t in result.recommended" :key="t.name">
          <p>{{ t.name }} — {{ t.specialty }}</p>
          <a :href="t.whatsapp" target="_blank">Contactar por WhatsApp</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const step = ref(0)
const answers = ref([])
const loading = ref(false)
const result = ref({})
const messages = ref([{ role: 'bot', text: '¡Hola! 👋 Soy tu asistente psicológico virtual. Te haré unas preguntas rápidas para guiarte.' }])

const questions = [
  '¿Cómo te has sentido últimamente?',
  '¿Qué área sientes más afectada?',
  '¿Cómo está impactando en tu día a día?',
  '¿Qué esperas de una terapia?'
]

const options = [
  ['Triste', 'Ansioso', 'Con problemas de pareja', 'Estrés'],
  ['Trabajo', 'Relaciones', 'Emociones', 'Salud'],
  ['Me cuesta dormir', 'Me afecta en mi relación', 'No disfruto las cosas', 'No estoy seguro'],
  ['Orientación', 'Apoyo emocional', 'Terapia formal', 'No lo sé']
]

function toggleChat() {
  isOpen.value = !isOpen.value
}

async function answer(option) {
  answers.value.push(option)
  step.value++

  if (step.value >= questions.length) {
    loading.value = true
    const res = await fetch('http://localhost:3000/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: answers.value })
    })
    const data = await res.json()
    result.value = data
    loading.value = false
  }
}
</script>

<style scoped>
.chat-icon {
  position: fixed; bottom: 20px; right: 20px;
  background: #7a9e9f; color: white; border-radius: 50%;
  width: 60px; height: 60px; display: flex; align-items: center;
  justify-content: center; cursor: pointer; font-size: 28px;
}
.chat-box {
  position: fixed; bottom: 90px; right: 20px;
  width: 300px; background: white; border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2); padding: 10px;
}
.header { font-weight: bold; text-align: center; margin-bottom: 10px; }
.messages { max-height: 200px; overflow-y: auto; margin-bottom: 10px; }
.bot { color: #333; }
.user { color: #5d7879; text-align: right; }
button { margin: 5px; border: none; background: #7a9e9f; color: white; padding: 6px 10px; border-radius: 8px; cursor: pointer; }
button:hover { background: #5d7879; }
</style>