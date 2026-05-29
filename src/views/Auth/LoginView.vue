<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.module'
import { useRouter } from 'vue-router'
import { Mail, Key, LogIn, ArrowRight, ShieldCheck } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Por favor, ingresa tus credenciales completas.'
    return
  }

  loading.value = true

  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión. Por favor, verifica tus datos.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="bg-stone-50 min-h-screen py-16 flex items-center justify-center relative overflow-hidden">
    
    <!-- Abstract warm blur design -->
    <div class="absolute -top-32 -right-32 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

    <div class="max-w-md w-full mx-auto px-4 relative z-10">
      
      <!-- Rounded branding panel -->
      <div class="bg-white rounded-[2.5rem] border border-brand-border p-8 shadow-xl text-left space-y-6">
        
        <div class="text-center space-y-1.5">
          <h2 class="text-2xl font-sans font-black text-brand-charcoal tracking-tight leading-none">
            Iniciar Sesión en MiPsicoRed
          </h2>
          <p class="text-brand-cool-gray text-xs">
            Accede a tus bitácoras y conéctate con terapeutas.
          </p>
        </div>

        <!-- Form container -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          
          <!-- Auth error notification -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl text-xs font-semibold leading-tight text-center">
            ⚠ {{ error }}
          </div>

          <!-- Email field -->
          <div class="space-y-1.5">
            <label for="email" class="text-xs font-bold text-stone-700 block">Correo Electrónico:</label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 text-brand-cool-gray w-4 h-4" />
              <input
                id="email"
                type="email"
                required
                placeholder="ejemplo@mipsicored.cl"
                v-model="email"
                class="w-full bg-stone-50 text-stone-900 border border-stone-200 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-brand-teal focus:bg-white"
              />
            </div>
          </div>

          <!-- Password field -->
          <div class="space-y-1.5">
            <label for="password" class="text-xs font-bold text-stone-700 block">Contraseña:</label>
            <div class="relative">
              <Key class="absolute left-3 top-1/2 -translate-y-1/2 text-brand-cool-gray w-4 h-4" />
              <input
                id="password"
                type="password"
                required
                placeholder="******"
                v-model="password"
                class="w-full bg-stone-50 text-stone-900 border border-stone-200 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-brand-teal focus:bg-white"
              />
            </div>
          </div>

          <!-- Submit Action Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-brand-teal hover:bg-brand-teal-hover active:scale-98 transition text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-brand-teal/10 cursor-pointer border-0 disabled:opacity-50"
          >
            <LogIn class="w-4 h-4 animate-fade-in" />
            <span>{{ loading ? 'Ingresando...' : 'Acceder al Portal' }}</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </button>

        </form>

        <!-- Secure disclaimer -->
        <div class="flex items-center gap-1.5 text-[10.5px] text-brand-teal font-semibold justify-center">
          <ShieldCheck class="w-4 h-4 text-brand-teal" />
          <span>Encriptado militar de datos médicos de entrada</span>
        </div>

        <!-- Form toggle links -->
        <div class="pt-4 border-t border-brand-border text-center">
          <a
            href="/register"
            class="text-xs text-stone-500 hover:text-stone-950 font-medium underline underline-offset-4"
          >
            ¿No posees una cuenta? Regístrate gratis
          </a>
        </div>

      </div>

    </div>
  </section>
</template>
