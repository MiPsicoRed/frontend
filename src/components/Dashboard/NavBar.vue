<template>
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <RouterLink to="/">
                        <img src="/logo.svg" alt="MiPsicoRed Logo" class="h-7 w-auto" />
                    </RouterLink>
                </div>
                <div class="ml-3">
                    <h1 class="text-base font-bold text-brand-dark-text font-serif tracking-tight">Mi Panel</h1>
                </div>
            </div>

            <!-- User Menu -->
            <div class="flex items-center space-x-4">
                <!-- Notifications Dropdown -->
                <div class="relative">
                    <button @click="showNotifications = !showNotifications"
                        class="text-brand-cool-gray hover:text-brand-teal relative p-1.5 transition-colors cursor-pointer">
                        <Bell class="h-4.5 w-4.5" />
                        <!-- Unread badge -->
                        <span v-if="notificationStore.unreadCount > 0"
                            class="absolute top-0.5 right-0.5 inline-flex items-center justify-center w-3.5 h-3.5 text-[8.5px] font-black text-white bg-amber-600 rounded-full border border-white">
                            {{ notificationStore.unreadCount }}
                        </span>
                    </button>

                    <!-- Notifications Dropdown Menu -->
                    <div v-if="showNotifications"
                        class="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-brand-border z-50 overflow-hidden animate-fade-in">
                        <div class="p-4 border-b border-brand-border flex justify-between items-center bg-brand-sage-bg/30">
                            <h3 class="text-xs font-black uppercase tracking-wider text-brand-charcoal font-sans">Notificaciones</h3>
                            <button v-if="notificationStore.notifications.length > 0" @click="notificationStore.markAllAsRead"
                                class="text-[11px] text-brand-teal hover:text-brand-teal-hover font-bold transition-colors cursor-pointer">
                                Marcar leídas
                            </button>
                        </div>

                        <div class="max-h-80 overflow-y-auto">
                            <div v-if="notificationStore.notifications.length > 0">
                                <a href="#" v-for="notif in notificationStore.notifications" :key="notif.id"
                                    class="block p-4 border-b border-brand-border hover:bg-brand-bg transition-colors"
                                    :class="{ 'bg-brand-sage-bg/20': !notif.is_read }">
                                    <div class="flex gap-3">
                                        <div class="flex-shrink-0 mt-0.5">
                                            <div class="w-1.5 h-1.5 rounded-full mt-1.5" :class="{
                                                'bg-brand-teal': notif.type === 'info',
                                                'bg-emerald-500': notif.type === 'success',
                                                'bg-amber-500': notif.type === 'warning'
                                            }">
                                            </div>
                                        </div>
                                        <div class="text-left">
                                            <p class="text-xs font-bold text-brand-charcoal mb-0.5">{{ notif.title }}</p>
                                            <p class="text-[11px] text-brand-muted-teal leading-relaxed mb-1">{{ notif.message }}</p>
                                            <p class="text-[9.5px] text-brand-cool-gray font-mono">{{ new Date(notif.created_at).toLocaleString() }}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div v-else class="p-6 text-center">
                                <Bell class="h-6 w-6 text-brand-cool-gray/40 mx-auto mb-2" />
                                <p class="text-xs text-brand-cool-gray font-medium">No tienes notificaciones nuevas</p>
                            </div>
                        </div>

                        <div v-if="notificationStore.notifications.length > 0"
                            class="p-3 border-t border-brand-border text-center bg-brand-bg">
                            <a href="#" class="text-[11px] font-bold text-brand-teal hover:text-brand-teal-hover transition-colors">Ver todas las
                                notificaciones</a>
                        </div>
                    </div>
                </div>

                <div class="relative">
                    <button @click="showUserMenu = !showUserMenu"
                        class="flex items-center space-x-2 text-brand-charcoal hover:text-brand-teal transition-colors cursor-pointer">
                        <img v-if="profilePictureUrl" :src="fullProfilePictureUrl" alt="Avatar"
                            class="w-7 h-7 rounded-full object-cover border border-brand-border" />
                        <div v-else class="w-7 h-7 bg-brand-sage-bg rounded-full flex items-center justify-center border border-brand-sage-border">
                            <User class="h-3.5 w-3.5 text-brand-teal" />
                        </div>
                        <span class="text-xs font-bold font-sans">{{ profile?.first_name }}</span>
                        <ChevronDown class="h-3.5 w-3.5 text-brand-cool-gray" />
                    </button>

                    <!-- Dropdown Menu -->
                    <div v-if="showUserMenu"
                        class="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-lg border border-brand-border z-50 py-1.5 animate-fade-in">
                        <div class="py-1">
                            <a href="#" @click.prevent="activeTab = 'settings'"
                                class="block px-4.5 py-2.5 text-xs font-bold text-brand-charcoal hover:bg-brand-sage-bg/40 hover:text-brand-teal transition-all cursor-pointer">Configuración</a>
                            <hr class="border-brand-border my-1">
                            <a @click.prevent="logout()"
                                class="block px-4.5 py-2.5 text-xs font-bold text-red-650 hover:bg-red-50/50 transition-all cursor-pointer">Cerrar
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
import { useNotificationStore } from '@/stores/notifications.module'

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
const notificationStore = useNotificationStore()

// Fetch notifications on mount
onMounted(() => {
    notificationStore.fetchNotifications()
    if (typeof window !== 'undefined') {
        document.addEventListener('click', handleClickOutside)
    }
})

// Close dropdowns on outside click
const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
        showNotifications.value = false
        showUserMenu.value = false
    }
}



onUnmounted(() => {
    if (typeof window !== 'undefined') {
        document.removeEventListener('click', handleClickOutside)
    }
})
</script>
