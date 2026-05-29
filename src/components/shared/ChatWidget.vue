<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMessageStore } from '@/stores/messages.module.ts'
import { useAuthStore } from '@/stores/auth.module.ts'

const props = defineProps<{
  otherUserId: string
  otherUserName: string
}>()

const messageStore = useMessageStore()
const authStore = useAuthStore()
const newMessage = ref('')

onMounted(() => {
  if (props.otherUserId) {
    messageStore.fetchConversation(props.otherUserId)
  }
})

const send = async () => {
  if (!newMessage.value.trim()) return
  await messageStore.sendMessage(props.otherUserId, newMessage.value)
  newMessage.value = ''
}
</script>

<template>
  <div class="flex flex-col h-[500px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <!-- Header -->
    <div class="bg-gray-50 border-b border-gray-100 p-4">
      <h3 class="font-semibold text-gray-800">Chat with {{ otherUserName }}</h3>
    </div>
    
    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
      <div v-for="msg in messageStore.conversation" :key="msg.id" 
           :class="['max-w-[80%] rounded-2xl p-3', msg.sender_id === authStore.userId ? 'bg-indigo-600 text-white self-end rounded-br-none' : 'bg-gray-100 text-gray-800 self-start rounded-bl-none']">
        <p class="text-sm">{{ msg.content }}</p>
        <span :class="['text-[10px] mt-1 block opacity-70', msg.sender_id === authStore.userId ? 'text-right' : '']">
          {{ new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
        </span>
      </div>
      <div v-if="messageStore.conversation.length === 0" class="flex-1 flex items-center justify-center text-gray-400 text-sm">
        No messages yet. Send a message to start the conversation!
      </div>
    </div>
    
    <!-- Input -->
    <div class="p-3 border-t border-gray-100 bg-white">
      <form @submit.prevent="send" class="flex gap-2">
        <input v-model="newMessage" type="text" placeholder="Type a message..." class="flex-1 border border-gray-200 rounded-full px-4 focus:ring-indigo-500 focus:border-indigo-500 text-sm outline-none">
        <button type="submit" class="bg-indigo-600 text-white p-2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
        </button>
      </form>
    </div>
  </div>
</template>
