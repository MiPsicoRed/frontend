<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMoodStore } from '@/stores/mood.module.ts'

const moodStore = useMoodStore()
const currentScore = ref(3)
const note = ref('')
const shared = ref(false)

onMounted(() => {
  moodStore.fetchMyLogs()
})

const saveMood = async () => {
  await moodStore.createLog({
    mood_score: currentScore.value,
    note: note.value,
    shared_with_professional: shared.value
  })
  note.value = ''
  currentScore.value = 3
  shared.value = false
}
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
    <h3 class="text-xl font-semibold text-gray-800">How are you feeling today?</h3>
    
    <div class="flex justify-between items-center gap-2">
      <button v-for="i in 5" :key="i" 
              @click="currentScore = i"
              :class="['p-4 rounded-full transition-all', currentScore === i ? 'bg-indigo-100 ring-2 ring-indigo-500 scale-110' : 'bg-gray-50 hover:bg-gray-100']">
        <span class="text-2xl">{{ ['😢', '😟', '😐', '🙂', '😁'][i-1] }}</span>
      </button>
    </div>
    
    <div class="flex flex-col gap-2 mt-4">
      <label class="text-sm font-medium text-gray-600">Add a journal note (optional)</label>
      <textarea v-model="note" rows="3" class="w-full border-gray-200 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500" placeholder="What's on your mind?"></textarea>
    </div>
    
    <div class="flex items-center gap-2">
      <input type="checkbox" id="share" v-model="shared" class="rounded text-indigo-600 focus:ring-indigo-500">
      <label for="share" class="text-sm text-gray-600">Share this log with my psychologist</label>
    </div>
    
    <button @click="saveMood" class="mt-2 w-full bg-indigo-600 text-white font-medium py-3 rounded-xl hover:bg-indigo-700 transition-colors" :disabled="moodStore.loading">
      {{ moodStore.loading ? 'Saving...' : 'Save Mood Log' }}
    </button>

    <div v-if="moodStore.logs.length > 0" class="mt-8">
      <h4 class="text-lg font-medium text-gray-800 mb-4">Past Logs</h4>
      <div class="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
        <div v-for="log in moodStore.logs" :key="log.id" class="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xl">{{ ['😢', '😟', '😐', '🙂', '😁'][log.mood_score - 1] }}</span>
            <span class="text-xs text-gray-500">{{ new Date(log.created_at).toLocaleDateString() }}</span>
          </div>
          <p v-if="log.note" class="text-sm text-gray-700">{{ log.note }}</p>
          <span v-if="log.shared_with_professional" class="text-xs text-indigo-600 font-medium mt-2 block">Shared with Professional</span>
        </div>
      </div>
    </div>
  </div>
</template>
