<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <RouterLink to="/">
                        <img src="/logo.svg" alt="MiPsicoRed Logo" class="h-8 w-auto" />
                    </RouterLink>
                </div>
                <div class="ml-3">
                    <h1 class="text-xl font-semibold text-gray-900">Mi Panel</h1>
                </div>
            </div>

            <!-- User Menu -->
            <div class="flex items-center space-x-4">
                <!-- Notifications Dropdown -->
                <div class="relative">
                    <button @click="showNotifications = !showNotifications"
                        class="text-gray-500 hover:text-gray-700 relative p-1 mt-1">
                        <Bell class="h-5 w-5" />
                        <!-- Unread badge -->
                        <span v-if="unreadCount > 0"
                            class="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white transform translate-x-1 -translate-y-1">
                            {{ unreadCount }}
                        </span>
                    </button>

                    <!-- Notifications Dropdown Menu -->
                    <div v-if="showNotifications"
                        class="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                        <div class="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 class="text-sm font-semibold text-gray-900">Notificaciones</h3>
                            <button v-if="notifications.length > 0" @click="clearNotifications"
                                class="text-xs text-teal-600 hover:text-teal-700 font-medium">
                                Marcar leídas
                            </button>
                        </div>

                        <div class="max-h-80 overflow-y-auto">
                            <div v-if="notifications.length > 0">
                                <a href="#" v-for="notif in notifications" :key="notif.id"
                                    class="block p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                    :class="{ 'bg-blue-50/30': notif.unread }">
                                    <div class="flex gap-3">
                                        <div class="flex-shrink-0 mt-0.5">
                                            <div class="w-2 h-2 rounded-full mt-1.5" :class="{
                                                'bg-blue-500': notif.type === 'info',
                                                'bg-green-500': notif.type === 'success',
                                                'bg-orange-500': notif.type === 'warning'
                                            }">
                                            </div>
                                        </div>
                                        <div>
                                            <p class="text-sm font-medium text-gray-900 mb-0.5">{{ notif.title }}</p>
                                            <p class="text-xs text-gray-500 line-clamp-2 mb-1">{{ notif.message }}</p>
                                            <p class="text-[10px] text-gray-400">{{ notif.time }}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div v-else class="p-6 text-center">
                                <Bell class="h-8 w-8 text-gray-300 mx-auto mb-2" />
                                <p class="text-sm text-gray-500">No tienes notificaciones nuevas</p>
                            </div>
                        </div>

                        <div v-if="notifications.length > 0"
                            class="p-2 border-t border-gray-100 text-center bg-gray-50/50">
                            <a href="#" class="text-xs font-medium text-teal-600 hover:text-teal-700">Ver todas las
                                notificaciones</a>
                        </div>
                    </div>
                </div>

                <div class="relative">
                    <button @click="showUserMenu = !showUserMenu"
                        class="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                        <img v-if="profilePictureUrl" :src="fullProfilePictureUrl" alt="Avatar"
                            class="w-8 h-8 rounded-full object-cover border border-gray-200" />
                        <div v-else class="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <User class="h-4 w-4 text-teal-600" />
                        </div>
                        <span class="text-sm font-medium">{{ profile?.first_name }}</span>
                        <ChevronDown class="h-4 w-4" />
                    </button>

                    <!-- Dropdown Menu -->
                    <div v-if="showUserMenu"
                        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                        <div class="py-1">
                            <a href="#" @click.prevent="activeTab = 'settings'"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Configuración</a>
                            <hr class="my-1">
                            <a @click.prevent="logout()"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Cerrar
                                Sesión</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import {
    Bell, User, ChevronDown
} from 'lucide-vue-next'
import authService from '@/services/auth/auth.service'

const props = defineProps({
    showUserMenu: Boolean,
    activeTab: String,
    profile: Object
})

const profilePictureUrl = computed(() => props.profile?.profile_picture_url || '')

const fullProfilePictureUrl = computed(() => {
    if (!profilePictureUrl.value) return ''
    const base = import.meta.env.VITE_BASE_API_URL || 'http://localhost:3001/api/user/'
    const appBaseUrl = base.split('/api/')[0] // Gets the http://localhost:3001
    return `${appBaseUrl}${profilePictureUrl.value}`
})

const emit = defineEmits(['update:showUserMenu', 'update:activeTab', 'logout'])

const showUserMenu = computed({
    get: () => props.showUserMenu,
    set: (value) => emit('update:showUserMenu', value)
})

const activeTab = computed({
    get: () => props.activeTab,
    set: (value) => emit('update:activeTab', value)
})

const logout = () => {
    authService.logout()
    window.location.reload()
}

// Notifications state
const showNotifications = ref(false)
const notifications = ref([
    {
        id: 1,
        type: 'info',
        title: 'Nueva funcionalidad',
        message: 'Ahora puedes subir tu propia foto de perfil desde los ajustes de tu cuenta.',
        time: 'Hace 2 horas',
        unread: true
    },
    {
        id: 2,
        type: 'success',
        title: 'Pago confirmado',
        message: 'Hemos recibido correctamente el pago de tu última sesión.',
        time: 'Ayer',
        unread: true
    },
    {
        id: 3,
        type: 'warning',
        title: 'Recordatorio',
        message: 'Tu próxima sesión es en 48 horas. Revisa que tu cámara y micrófono funcionen correctamente.',
        time: 'Ayer',
        unread: false
    }
])

const unreadCount = computed(() => notifications.value.filter(n => n.unread).length)

const clearNotifications = () => {
    notifications.value.forEach(n => n.unread = false)
}

// Close dropdowns on outside click
const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
        showNotifications.value = false
        showUserMenu.value = false
    }
}

onMounted(() => {
    if (typeof window !== 'undefined') {
        document.addEventListener('click', handleClickOutside)
    }
})

onUnmounted(() => {
    if (typeof window !== 'undefined') {
        document.removeEventListener('click', handleClickOutside)
    }
})
</script>
