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
                <button class="text-gray-500 hover:text-gray-700">
                    <Bell class="h-5 w-5" />
                </button>
                <div class="relative">
                    <button @click="showUserMenu = !showUserMenu"
                        class="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                        <div class="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <User class="h-4 w-4 text-teal-600" />
                        </div>
                        <span class="text-sm font-medium">{{ profile?.first_name }}</span>
                        <ChevronDown class="h-4 w-4" />
                    </button>

                    <!-- Dropdown Menu -->
                    <div v-if="showUserMenu"
                        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                        <div class="py-1">
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Mi Perfil</a>
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
import { computed } from 'vue'
import {
    Bell, User, ChevronDown
} from 'lucide-vue-next'
import authService from '@/services/auth/auth.service'


const props = defineProps({
    showUserMenu: Boolean,
    activeTab: String,
    profile: Object
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
</script>
