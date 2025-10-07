<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.module'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const model = reactive({
  username: "",
  usersurname: "",
  email: "",
  phone: "",
  birthdate: new Date(),
  password: "",
  confirmPassword: "",
})
const acceptTerms = ref(false)
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  error.value = ''

  if (!acceptTerms) {
    error.value = "You have to accept the agreement"
    return
  }
  
  if (
    !model.username ||
    !model.usersurname ||
    !model.email ||
    !model.phone ||
    !model.birthdate ||
    !model.password ||
    !model.confirmPassword
  ) {
    error.value = "Please fill in all fields"
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(model.email)) {
    error.value = "Invalid email address"
    return
  }

  // Phone number validation (digits only, min length)
  const phoneRegex = /^[0-9]{7,15}$/
  if (!phoneRegex.test(model.phone)) {
    error.value = "Invalid phone number"
    return
  }

  // Password length validation
  if (model.password.length < 6) {
    error.value = "Password must be at least 6 characters long"
    return
  }

  // Passwords match validation
  if (model.password !== model.confirmPassword) {
    error.value = "Passwords do not match"
    return
  }
  
  loading.value = true
  
  try {
    await authStore.register({
      username: model.username,
      usersurname: model.usersurname,
      email: model.email,
      phone: model.phone,
      birthdate: model.birthdate, // will be a Date object
      password: model.password,
      confirmPassword: model.confirmPassword,
    })
    //router.push('/admin') // Redirect after successful register (Maybe the backend should return the uuid to go to verification tab?)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Register failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-w-screen container flex items-center justify-center min-h-screen py-6 px-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="p-6 space-y-6">
        <!-- Header -->
        <div class="space-y-2 text-center">
          <h1 class="text-2xl font-bold">Crear una cuenta</h1>
          <p class="text-gray-500">Ingresa tus datos para registrarte en MiPsicoRed</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-600 text-sm">{{ error }}</p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label for="username" class="block text-sm font-medium">Nombre</label>
              <input
                id="username"
                v-model="model.username"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A9997]"
              />
            </div>

            <div class="space-y-2">
              <label for="usersurname" class="block text-sm font-medium">Apellido</label>
              <input
                id="usersurname"
                v-model="model.usersurname"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A9997]"
              />
            </div>
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium">Correo electrónico</label>
            <input
              id="email"
              v-model="model.email"
              type="email"
              placeholder="correo@ejemplo.com"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A9997]"
            />
          </div>

          <!-- Phone -->
          <div class="space-y-2">
            <label for="phone" class="block text-sm font-medium">Teléfono</label>
            <input
              id="phone"
              v-model="model.phone"
              type="tel"
              placeholder="123-456-7890"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A9997]"
            />
          </div>

          <!-- Birthdate -->
          <div class="space-y-2">
            <label for="birthdate" class="block text-sm font-medium">Fecha de nacimiento</label>
            <input
              id="birthdate"
              v-model="model.birthdate"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A9997]"
            />
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium">Contraseña</label>
            <input
              id="password"
              v-model="model.password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A9997]"
            />
          </div>

          <!-- Confirm Password -->
          <div class="space-y-2">
            <label for="confirmPassword" class="block text-sm font-medium">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              v-model="model.confirmPassword"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A9997]"
            />
          </div>

          <!-- Terms Checkbox -->
          <div class="flex items-center space-x-2">
            <input
              id="terms"
              v-model="acceptTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-[#6A9997] focus:ring-[#6A9997] border-gray-300 rounded"
            />
            <label for="terms" class="text-sm">
              Acepto los
              <NuxtLink to="/#" class="text-[#6A9997] hover:underline">términos y condiciones</NuxtLink>
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-2 px-4 bg-[#6A9997] hover:bg-[#5a8886] text-white font-medium rounded-md transition duration-200"
            :disabled="loading"
          >
            {{ loading ? 'Registrando...' : 'Registrarse' }}
          </button>
        </form>

        <!-- Sign In Link -->
        <div class="text-center text-sm">
          ¿Ya tienes una cuenta?
          <a href="/login" class="text-[#6A9997] hover:underline ml-1">Iniciar sesión</a>
        </div>
      </div>
    </div>
  </div>
</template>

