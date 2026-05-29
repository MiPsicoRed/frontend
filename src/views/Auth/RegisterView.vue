<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.module'
import { useRouter } from 'vue-router'
import { User, Mail, Key, Sparkles, ArrowRight, ShieldCheck } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()

const model = reactive({
  username: "",
  usersurname: "",
  email: "",
  password: "",
  confirmPassword: "",
})
const acceptTerms = ref(false)
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  error.value = ''

  if (!acceptTerms.value) {
    error.value = "Debes aceptar los términos y condiciones"
    return
  }

  if (
    !model.username ||
    !model.usersurname ||
    !model.email ||
    !model.password ||
    !model.confirmPassword
  ) {
    error.value = "Por favor, completa todos los campos"
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(model.email)) {
    error.value = "Dirección de correo no válida"
    return
  }

  // Password length validation
  if (model.password.length < 6) {
    error.value = "La contraseña debe tener al menos 6 caracteres"
    return
  }

  // Passwords match validation
  if (model.password !== model.confirmPassword) {
    error.value = "Las contraseñas no coinciden"
    return
  }

  loading.value = true

  try {
    await authStore.register({
      username: model.username,
      usersurname: model.usersurname,
      email: model.email,
      password: model.password,
      confirmPassword: model.confirmPassword,
    })
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al registrarse. Por favor, vuelve a intentarlo.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="bg-brand-bg min-h-screen py-16 flex items-center justify-center relative overflow-hidden">
    
    <!-- Abstract warm blur design -->
    <div class="absolute -top-32 -right-32 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

    <div class="max-w-md w-full mx-auto px-4 relative z-10 font-sans">
      
      <!-- Rounded branding panel -->
      <div class="bg-white rounded-[2rem] border border-brand-border p-8 shadow-xs text-left space-y-6">
        
        <div class="text-center space-y-2">
          <h2 class="text-lg font-bold font-serif text-brand-charcoal leading-tight">
            Registrar Expediente Clínico
          </h2>
          <p class="text-brand-cool-gray text-xs font-medium">
            Tus datos están protegidos de acuerdo a normas de salud.
          </p>
        </div>

        <!-- Form container -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          
          <!-- Auth error notification -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl text-xs font-semibold leading-tight text-center">
            ⚠ {{ error }}
          </div>

          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label for="username" class="text-xs font-bold text-brand-charcoal block">Nombre</label>
              <div class="relative">
                <User class="absolute left-3 top-1/2 -translate-y-1/2 text-brand-cool-gray w-4 h-4" />
                <input
                  id="username"
                  type="text"
                  required
                  placeholder="Claudio"
                  v-model="model.username"
                  class="w-full bg-[#F9FBFA] text-brand-charcoal border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <label for="usersurname" class="text-xs font-bold text-brand-charcoal block">Apellido</label>
              <div class="relative">
                <User class="absolute left-3 top-1/2 -translate-y-1/2 text-brand-cool-gray w-4 h-4" />
                <input
                  id="usersurname"
                  type="text"
                  required
                  placeholder="Valenzuela"
                  v-model="model.usersurname"
                  class="w-full bg-[#F9FBFA] text-brand-charcoal border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <!-- Email field -->
          <div class="space-y-1.5">
            <label for="email" class="text-xs font-bold text-brand-charcoal block">Correo Electrónico</label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 text-brand-cool-gray w-4 h-4" />
              <input
                id="email"
                type="email"
                required
                placeholder="ejemplo@mipsicored.cl"
                v-model="model.email"
                class="w-full bg-[#F9FBFA] text-brand-charcoal border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
              />
            </div>
          </div>

          <!-- Password field -->
          <div class="space-y-1.5">
            <label for="password" class="text-xs font-bold text-brand-charcoal block">Contraseña</label>
            <div class="relative">
              <Key class="absolute left-3 top-1/2 -translate-y-1/2 text-brand-cool-gray w-4 h-4" />
              <input
                id="password"
                type="password"
                required
                placeholder="mínimo 6 caracteres"
                v-model="model.password"
                class="w-full bg-[#F9FBFA] text-brand-charcoal border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
              />
            </div>
          </div>

          <!-- Confirm Password field -->
          <div class="space-y-1.5">
            <label for="confirmPassword" class="text-xs font-bold text-brand-charcoal block">Confirmar Contraseña</label>
            <div class="relative">
              <Key class="absolute left-3 top-1/2 -translate-y-1/2 text-brand-cool-gray w-4 h-4" />
              <input
                id="confirmPassword"
                type="password"
                required
                placeholder="repite contraseña"
                v-model="model.confirmPassword"
                class="w-full bg-[#F9FBFA] text-brand-charcoal border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-xs focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
              />
            </div>
          </div>

          <!-- Terms Checkbox -->
          <div class="flex items-center space-x-2 py-1">
            <input 
              id="terms" 
              type="checkbox" 
              required
              v-model="acceptTerms"
              class="h-4 w-4 border-brand-border text-brand-teal focus:ring-brand-teal focus:ring-offset-0 focus:ring-1 rounded cursor-pointer animate-none" 
            />
            <label for="terms" class="text-xs text-brand-muted-teal font-medium cursor-pointer">
              Acepto el 
              <a href="#" class="text-brand-teal hover:text-brand-teal-hover font-bold transition-colors">Consentimiento Clínico Informado</a>
            </label>
          </div>

          <!-- Submit Action Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-brand-teal hover:bg-brand-teal-hover active:scale-[0.98] transition-all text-white font-bold text-xs py-3 rounded-full flex items-center justify-center gap-1.5 shadow-md shadow-brand-teal/5 cursor-pointer border-0 disabled:opacity-50 uppercase tracking-wider"
          >
            <Sparkles class="w-4 h-4" />
            <span>{{ loading ? 'Registrando...' : 'Dar de Alta Expediente' }}</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </button>

        </form>

        <!-- Secure disclaimer -->
        <div class="flex items-center gap-1.5 text-[10px] text-brand-teal font-bold justify-center uppercase tracking-wider">
          <ShieldCheck class="w-4 h-4 text-brand-teal" />
          <span>Encriptado militar de datos médicos</span>
        </div>

        <!-- Form toggle links -->
        <div class="pt-6 border-t border-brand-border text-center">
          <a
            href="/login"
            class="text-xs text-brand-cool-gray hover:text-brand-charcoal font-bold transition-all cursor-pointer underline underline-offset-4"
          >
            ¿Ya tienes un expediente? Inicia sesión
          </a>
        </div>

      </div>

    </div>
  </section>
</template>
