<template>
    <div class="container flex items-center justify-center min-h-screen py-12 px-4">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-6 space-y-6">
          <div class="space-y-2 text-center">
            <h1 class="text-2xl font-bold">Iniciar sesión</h1>
            <p class="text-gray-500">Ingresa tus credenciales para acceder a tu cuenta</p>
          </div>
  
          <form @submit.prevent="handleLogin" class="space-y-4">
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium">Correo electrónico</label>
              <input id="email" v-model="email" type="email" placeholder="correo@ejemplo.com" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A9997]" />
            </div>
  
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium">Contraseña</label>
                <NuxtLink to="/#" class="text-sm text-gray-500 hover:text-[#6A9997]">
                  ¿Olvidaste tu contraseña?
                </NuxtLink>
              </div>
              <input id="password" v-model="password" type="password" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A9997]" />
            </div>
  
            <button type="submit"
              class="w-full py-2 px-4 bg-[#6A9997] hover:bg-[#5a8886] text-white font-medium rounded-md transition duration-200"
              :disabled="isLoading">
              {{ isLoading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
            </button>
          </form>
          <div v-if="error" class="flex items-center justify-center rounded-md bg-red-300 p-2">
            <span class="text-center w-full">{{ error }}</span>
          </div>
  
          <div class="text-center text-sm">
            ¿No tienes una cuenta?
            <a href="/register" class="text-[#6A9997] hover:underline ml-1">
              Regístrate
            </a>
          </div>
        </div>
      </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'

  definePageMeta({
    middleware: 'guest'
  })

const config = useRuntimeConfig()
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)
const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref("")

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = "Por favor ingresa tu correo y contraseña."
    return
  }

  isLoading.value = true
  error.value = null

  try {

    const { data: verificationData } = await useFetch(`/api/check_verification?email=${email.value}`);
    const verified = verificationData.value.verified;

    
    const { data: loginData, error: supabaseError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    
    if (!verified && !supabaseError) {
      supabase.auth.signOut()  //Evitar crear una sesion sin que el usuario esté verificado
      console.log("User is not verified");
      error.value = "Debes verificar tu correo electrónico antes de iniciar sesión."
      isLoading.value = false
      return
    } else if (supabaseError && supabaseError.message.includes("Invalid login credentials")) {
      console.log("Login failed:", supabaseError)
      error.value = "Credenciales de inicio de sesión no válidas."
    } else if (!verified && supabaseError) {
      console.log("Login failed:", supabaseError);
      error.value = supabaseError.message
      isLoading.value = false
      return
    } else {
      router.push("/dashboard")
    }
  } catch (err) {
    console.error(err)
    error.value = "Error al iniciar sesión. Por favor, inténtalo de nuevo."
  } finally {
    isLoading.value = false
  }
}
</script>
