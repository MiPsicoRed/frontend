<template>
  <div class="fixed inset-0 flex items-center justify-center p-4 z-50">
    <div class="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
      <div class="bg-gradient-to-r from-teal-500 to-blue-500 h-1.5 shrink-0">
        <div class="bg-gradient-to-r from-teal-600 to-blue-600 h-full transition-all duration-500 ease-out"
          :style="{ width: `${progress}%` }"></div>
      </div>
      <div class="flex-1 overflow-y-auto p-5 md:p-6 lg:p-8 custom-scrollbar">
        <!-- Step Indicator -->
        <div class="flex items-center justify-between mb-4">
          <div class="text-sm text-gray-500">
            Paso {{ currentStep }} de {{ totalSteps }}
          </div>
          <div class="text-sm font-medium text-teal-600 transition-all duration-300">
            {{ Math.round(progress) }}% Completado
          </div>
        </div>

        <!-- Question Title -->
        <h2 class="text-2xl font-bold text-gray-800 mb-2 text-balance transition-colors">
          {{ steps[currentStep - 1].question }}
        </h2>
        <p class="text-sm text-gray-600 mb-5 text-pretty transition-colors">
          {{ steps[currentStep - 1].description }}
        </p>

        <!-- Step Content  -->
        <div class="relative min-h-[180px]">
          <transition name="slide-fade" mode="out-in">
            <div :key="currentStep" class="w-full">
              <!-- Multiple Choice Step  -->
              <div v-if="steps[currentStep - 1].type === 'choice'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button v-for="(option, index) in steps[currentStep - 1].options" :key="index"
                  @click="selectOption(option.value)" :class="[
                    'group relative p-6 rounded-xl border-2 transition-all duration-300 text-left',
                    formData[steps[currentStep - 1].key] === option.value
                      ? 'border-teal-500 bg-teal-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-teal-300 hover:shadow-md hover:scale-102'
                  ]">
                  <div class="flex items-start gap-4">
                    <div :class="[
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                      formData[steps[currentStep - 1].key] === option.value
                        ? 'border-teal-500 bg-teal-500'
                        : 'border-gray-300 group-hover:border-teal-400'
                    ]">
                      <svg v-if="formData[steps[currentStep - 1].key] === option.value" class="w-4 h-4 text-white"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="font-semibold text-gray-800 mb-1">{{ option.label }}</div>
                      <div class="text-sm text-gray-600">{{ option.description }}</div>
                    </div>
                  </div>
                </button>
              </div>

              <!-- Textarea Step  -->
              <div v-if="steps[currentStep - 1].type === 'textarea'" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ steps[currentStep - 1].label }}
                  </label>
                  <textarea v-model="formData[steps[currentStep - 1].key]"
                    :placeholder="steps[currentStep - 1].placeholder" rows="6"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all resize-none"></textarea>
                </div>
              </div>

              <!-- File Upload Step  -->
              <div v-if="steps[currentStep - 1].type === 'file'" class="space-y-4">
                <div @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
                  @drop.prevent="handleFileDrop" :class="[
                    'border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer',
                    isDragging
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
                  ]" @click="$refs.fileInput.click()">
                  <input ref="fileInput" type="file" :accept="steps[currentStep - 1].accept" @change="handleFileSelect"
                    class="hidden" multiple />

                  <div v-if="!uploadedFiles.length" class="space-y-3">
                    <div class="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
                      <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-gray-700 font-medium">Arrastra archivos aquí o haz clic para seleccionar</p>
                      <p class="text-sm text-gray-500 mt-1">{{ steps[currentStep - 1].fileHint }}</p>
                    </div>
                  </div>

                  <div v-else class="space-y-2">
                    <div v-for="(file, index) in uploadedFiles" :key="index"
                      class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div class="text-left">
                          <p class="text-sm font-medium text-gray-800">{{ file.name }}</p>
                          <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
                        </div>
                      </div>
                      <button @click.stop="removeFile(index)" class="text-red-500 hover:text-red-700 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <button @click.stop="$refs.fileInput.click()"
                      class="text-sm text-teal-600 hover:text-teal-700 font-medium">
                      + Agregar más archivos
                    </button>
                  </div>
                </div>
              </div>

              <!-- Date Input Step -->
              <div v-if="steps[currentStep - 1].type === 'date'" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ steps[currentStep - 1].label }}
                  </label>
                  <input v-model="formData[steps[currentStep - 1].key]" type="date"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all" />
                </div>
              </div>

              <!-- Consent Step -->
              <div v-if="steps[currentStep - 1].type === 'consent'" class="space-y-4">
                <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800">
                  <p>Para continuar, necesitamos el consentimiento de tus padres o tutores legales. Por favor,
                    completa la siguiente información y firmen en los recuadros.</p>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">¿Es una familia monoparental?</label>
                  <div class="flex items-center gap-6">
                    <label class="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" :value="true" v-model="formData.isMonoparental"
                        class="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300">
                      <span class="text-sm text-gray-700 group-hover:text-gray-900">Sí</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" :value="false" v-model="formData.isMonoparental"
                        class="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300">
                      <span class="text-sm text-gray-700 group-hover:text-gray-900">No</span>
                    </label>
                  </div>
                </div>

                <!-- Tutor 1 -->
                <div class="space-y-3 border border-gray-200 p-4 rounded-xl bg-gray-50/50">
                  <h3 class="font-bold text-gray-700 text-sm">Tutor 1</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Nombre Completo</label>
                      <input v-model="formData.guardianName" type="text" placeholder="Nombre completo"
                        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">DNI / Documento de Identidad</label>
                      <input v-model="formData.guardianIdDocument" type="text" placeholder="Número de documento"
                        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Firma Digital</label>
                    <div class="border-2 border-gray-300 border-dashed rounded-lg bg-white overflow-hidden">
                      <canvas ref="canvas1" width="500" height="150" @mousedown="startDrawing($event, 1)"
                        @mousemove="draw($event, 1)" @mouseup="stopDrawing($event, 1)"
                        @mouseleave="stopDrawing($event, 1)" @touchstart.prevent="startDrawing($event, 1)"
                        @touchmove.prevent="draw($event, 1)" @touchend.prevent="stopDrawing($event, 1)"
                        class="w-full h-28 cursor-crosshair touch-none"></canvas>
                    </div>
                    <button @click="clearSignature(1)" class="text-sm text-red-500 hover:text-red-700 mt-2 font-medium">
                      Borrar firma
                    </button>
                  </div>
                </div>
              </div>

              <!-- Consent Step 2 -->
              <div v-if="steps[currentStep - 1].type === 'consent2'" class="space-y-4">
                <!-- Tutor 2 -->
                <div class="space-y-3 border border-gray-200 p-4 rounded-xl bg-gray-50/50">
                  <h3 class="font-bold text-gray-700 text-sm">Tutor 2</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Nombre Completo</label>
                      <input v-model="formData.guardian2Name" type="text" placeholder="Nombre completo"
                        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">DNI / Documento de Identidad</label>
                      <input v-model="formData.guardian2IdDocument" type="text" placeholder="Número de documento"
                        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Firma Digital</label>
                    <div class="border-2 border-gray-300 border-dashed rounded-lg bg-white overflow-hidden">
                      <canvas ref="canvas2" width="500" height="150" @mousedown="startDrawing($event, 2)"
                        @mousemove="draw($event, 2)" @mouseup="stopDrawing($event, 2)"
                        @mouseleave="stopDrawing($event, 2)" @touchstart.prevent="startDrawing($event, 2)"
                        @touchmove.prevent="draw($event, 2)" @touchend.prevent="stopDrawing($event, 2)"
                        class="w-full h-28 cursor-crosshair touch-none"></canvas>
                    </div>
                    <button @click="clearSignature(2)" class="text-sm text-red-500 hover:text-red-700 mt-2 font-medium">
                      Borrar firma
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Navigation Buttons  -->
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <button v-if="currentStep > 1" @click="previousStep" :disabled="isSubmitting"
            class="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>
          <div v-else></div>

          <button @click="nextStep" :disabled="!isStepValid || isSubmitting" :class="[
            'px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2',
            (isStepValid && !isSubmitting)
              ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          ]">
            <span v-if="isSubmitting" class="flex items-center gap-2">
              <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Guardando...
            </span>
            <template v-else>
              {{ currentStep === totalSteps ? 'Finalizar' : 'Siguiente' }}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.module'
import UserService from '@/services/user/user.service'

const emit = defineEmits(['click', 'closeOnboarding'])
const authStore = useAuthStore()

const currentStep = ref(1)
const isDragging = ref(false)
const uploadedFiles = ref([])
const isSubmitting = ref(false)

const props = defineProps({
  onboarding: {
    type: Boolean,
    default: false
  }
})

const formData = ref({
  userType: '',
  fullName: '',
  birthdate: '',
  email: '',
  phone: '',
  reason: '',
  experience: '',
  isMonoparental: true,
  guardianName: '',
  guardianIdDocument: '',
  signature: '',
  guardian2Name: '',
  guardian2IdDocument: '',
  signature2: '',
  documents: []
})

// Signature Pad Logic
const canvas1 = ref(null)
const canvas2 = ref(null)
const isDrawing = ref({ 1: false, 2: false })

const getCoordinates = (e, canvas) => {
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  let clientX, clientY

  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else {
    clientX = e.clientX
    clientY = e.clientY
  }

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  }
}

const startDrawing = (e, id) => {
  isDrawing.value[id] = true
  const canvas = e.target
  const ctx = canvas.getContext('2d')
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.strokeStyle = '#000'

  const { x, y } = getCoordinates(e, canvas)
  ctx.beginPath()
  ctx.moveTo(x, y)
}

const draw = (e, id) => {
  if (!isDrawing.value[id]) return
  const canvas = e.target
  const ctx = canvas.getContext('2d')

  const { x, y } = getCoordinates(e, canvas)
  ctx.lineTo(x, y)
  ctx.stroke()
}

const stopDrawing = (e, id) => {
  isDrawing.value[id] = false
  const canvas = e.target
  if (id === 1) {
    formData.value.signature = canvas.toDataURL()
  } else {
    formData.value.signature2 = canvas.toDataURL()
  }
}

const clearSignature = (id) => {
  const canvas = id === 1 ? canvas1.value : canvas2.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (id === 1) formData.value.signature = ''
    if (id === 2) formData.value.signature2 = ''
  }
}

// Age Calculation
const isMinor = computed(() => {
  if (!formData.value.birthdate) return false
  const birth = new Date(formData.value.birthdate)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--
  }
  return age < 18
})

const steps = computed(() => {
  const baseSteps = [
    {
      question: '¿Cómo te gustaría usar nuestra plataforma?',
      description: 'Selecciona la opción que mejor describa tu necesidad',
      type: 'choice',
      key: 'userType',
      options: [
        {
          value: 'patient',
          label: 'Busco terapia',
          description: 'Quiero conectar con un terapeuta profesional'
        },
        // ... (other options omitted for brevity, keeping existing)
      ]
    },
    {
      question: '¿Cuál es tu fecha de nacimiento?',
      description: 'Necesitamos confirmar tu edad para brindarte el servicio adecuado',
      type: 'date',
      key: 'birthdate',
      label: 'Fecha de nacimiento'
    }
  ]

  const consentStep = {
    question: 'Consentimiento del Primer Tutor',
    description: 'Al ser menor de edad, necesitamos la autorización de un adulto responsable.',
    type: 'consent',
    key: 'guardianConsent'
  }

  const consent2Step = {
    question: 'Consentimiento del Segundo Tutor',
    description: 'Por favor, necesitamos la autorización y firma del segundo padre o tutor.',
    type: 'consent2',
    key: 'guardian2Consent'
  }

  const remainingSteps = [
    {
      question: '¿Cuál es el motivo principal de tu consulta?',
      description: 'Esto nos ayudará a conectarte con el especialista adecuado',
      type: 'textarea',
      key: 'reason',
      label: 'Describe brevemente tu situación',
      placeholder: 'Comparte lo que te trae aquí...'
    },
    // ... (experience step)
    {
      question: 'Documentos opcionales',
      description: 'Si tienes documentos relevantes (referencias médicas, estudios previos), puedes subirlos aquí',
      type: 'file',
      key: 'documents',
      accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      fileHint: 'PDF, DOC, DOCX, JPG o PNG (máx. 10MB por archivo)'
    }
  ]

  if (isMinor.value) {
    if (!formData.value.isMonoparental) {
      return [...baseSteps, consentStep, consent2Step, ...remainingSteps]
    }
    return [...baseSteps, consentStep, ...remainingSteps]
  }
  return [...baseSteps, ...remainingSteps]
})

watch(currentStep, async () => {
  // Canvas contexts are now initialized lazily on Interaction using e.target,
  // preventing null-reference bugs caused by Vue transitions remounting DOM elements.
}, { immediate: true })

const totalSteps = computed(() => steps.value.length)

const progress = computed(() => {
  return (currentStep.value / totalSteps.value) * 100
})

const isStepValid = computed(() => {
  const step = steps.value[currentStep.value - 1]
  if (!step) return false

  const value = formData.value[step.key]

  if (step.type === 'file') {
    return true // File upload is optional
  }

  if (step.type === 'consent') {
    return formData.value.guardianName && formData.value.guardianIdDocument && formData.value.signature
  }

  if (step.type === 'consent2') {
    return formData.value.guardian2Name && formData.value.guardian2IdDocument && formData.value.signature2
  }

  return value && value.toString().trim().length > 0
})

const selectOption = (value) => {
  const step = steps.value[currentStep.value - 1]
  if (!step) return
  formData.value[step.key] = value
}

const nextStep = () => {
  if (!isStepValid.value) return

  if (currentStep.value === totalSteps.value) {
    submitForm()
  } else {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const handleFileSelect = (event) => {
  const target = event.target
  if (!target || !target.files) return
  const files = Array.from(target.files)
  uploadedFiles.value = [...uploadedFiles.value, ...files]
  formData.value.documents = uploadedFiles.value
}

const handleFileDrop = (event) => {
  isDragging.value = false
  if (!event.dataTransfer || !event.dataTransfer.files) return
  const files = Array.from(event.dataTransfer.files)
  uploadedFiles.value = [...uploadedFiles.value, ...files]
  formData.value.documents = uploadedFiles.value
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
  formData.value.documents = uploadedFiles.value
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const submitForm = async () => {
  console.log('Form submitted:', formData.value)
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  try {
    if (!authStore.userId) {
      console.error("No user ID found")
      isSubmitting.value = false;
      return
    }
    await UserService.userOnboarded({
      user_id: authStore.userId,
      user_type: formData.value.userType || 'paciente',
      full_name: formData.value.fullName || null,
      phone: formData.value.phone || null,
      birthdate: formData.value.birthdate || null,
      reason: formData.value.reason || null,
      experience: formData.value.experience || null,
      is_monoparental: !!formData.value.isMonoparental,
      guardian_name: formData.value.guardianName || null,
      guardian_id_document: formData.value.guardianIdDocument || null,
      signature: formData.value.signature || null,
      guardian_2_name: formData.value.isMonoparental ? null : (formData.value.guardian2Name || null),
      guardian_2_id_document: formData.value.isMonoparental ? null : (formData.value.guardian2IdDocument || null),
      signature_2: formData.value.isMonoparental ? null : (formData.value.signature2 || null)
    })
    emit('closeOnboarding')
    // Ideally update local auth state here if possible, 
    // for now relying on parent to hide it.
  } catch (error) {
    console.error("Error onboarding user:", error)
    alert("Error al guardar la información. Por favor intente nuevamente.")
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>