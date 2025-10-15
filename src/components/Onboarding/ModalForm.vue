<template>
  <div class="min-h-autoflex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="bg-gradient-to-r from-teal-500 to-blue-500 h-2">
        <div class="bg-gradient-to-r from-teal-600 to-blue-600 h-full transition-all duration-500 ease-out"
          :style="{ width: `${progress}%` }"></div>
      </div>
      <div class="p-8 md:p-12">
        <!-- Step Indicator -->
        <div class="flex items-center justify-between mb-8">
          <div class="text-sm text-gray-500">
            Paso {{ currentStep }} de {{ totalSteps }}
          </div>
          <div class="text-sm font-medium text-teal-600">
            {{ Math.round(progress) }}% Completado
          </div>
        </div>

        <!-- Question Title -->
        <h2 class="text-3xl font-bold text-gray-800 mb-3 text-balance">
          {{ steps[currentStep - 1].question }}
        </h2>
        <p class="text-gray-600 mb-8 text-pretty">
          {{ steps[currentStep - 1].description }}
        </p>

        <!-- Step Content  -->
        <div class="min-h-auto">
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

          <!-- Text Input Step  -->
          <div v-if="steps[currentStep - 1].type === 'text'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ steps[currentStep - 1].label }}
              </label>
              <input v-model="formData[steps[currentStep - 1].key]" type="text"
                :placeholder="steps[currentStep - 1].placeholder"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all" />
            </div>
          </div>

          <!-- Textarea Step  -->
          <div v-if="steps[currentStep - 1].type === 'textarea'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ steps[currentStep - 1].label }}
              </label>
              <textarea v-model="formData[steps[currentStep - 1].key]" :placeholder="steps[currentStep - 1].placeholder"
                rows="6"
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
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
        </div>

        <!-- Navigation Buttons  -->
        <div class="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button v-if="currentStep > 1" @click="previousStep"
            class="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>
          <div v-else></div>

          <button @click="nextStep" :disabled="!isStepValid" :class="[
            'px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2',
            isStepValid
              ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          ]">
            {{ currentStep === totalSteps ? 'Finalizar' : 'Siguiente' }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const emit = defineEmits(['click', 'closeOnboarding'])

const currentStep = ref(1)
const isDragging = ref(false)
const uploadedFiles = ref([])

const props = defineProps({
  onboarding: {
    type: Boolean,
    default: false
  }
})

const formData = ref({
  userType: '',
  fullName: '',
  email: '',
  phone: '',
  reason: '',
  experience: '',
  documents: []
})

const steps = [
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
      {
        value: 'therapist',
        label: 'Soy terapeuta',
        description: 'Quiero ofrecer mis servicios profesionales'
      },
      {
        value: 'couple',
        label: 'Terapia de pareja',
        description: 'Buscamos ayuda para nuestra relación'
      },
      {
        value: 'family',
        label: 'Terapia familiar',
        description: 'Necesitamos apoyo como familia'
      },
      {
        value: 'group',
        label: 'Terapia grupal',
        description: 'Me interesa participar en sesiones grupales'
      },
      {
        value: 'corporate',
        label: 'Servicio empresarial',
        description: 'Busco servicios para mi organización'
      }
    ]
  },
  {
    question: '¿Cuál es tu nombre completo?',
    description: 'Necesitamos conocerte para personalizar tu experiencia',
    type: 'text',
    key: 'fullName',
    label: 'Nombre completo',
    placeholder: 'Ej: María González Pérez'
  },
  {
    question: 'Información de contacto',
    description: 'Usaremos esta información para comunicarnos contigo',
    type: 'text',
    key: 'email',
    label: 'Correo electrónico',
    placeholder: 'tu@email.com'
  },
  {
    question: '¿Cuál es el motivo principal de tu consulta?',
    description: 'Esto nos ayudará a conectarte con el especialista adecuado',
    type: 'textarea',
    key: 'reason',
    label: 'Describe brevemente tu situación',
    placeholder: 'Comparte lo que te trae aquí. Esta información es confidencial y nos ayudará a brindarte el mejor apoyo posible.'
  },
  {
    question: '¿Has tenido experiencia previa con terapia?',
    description: 'Selecciona la opción que mejor describa tu experiencia',
    type: 'choice',
    key: 'experience',
    options: [
      {
        value: 'none',
        label: 'Primera vez',
        description: 'Esta es mi primera experiencia con terapia'
      },
      {
        value: 'some',
        label: 'Algo de experiencia',
        description: 'He tenido algunas sesiones anteriormente'
      },
      {
        value: 'regular',
        label: 'Experiencia regular',
        description: 'He asistido a terapia por varios meses'
      },
      {
        value: 'extensive',
        label: 'Experiencia extensa',
        description: 'He estado en terapia por más de un año'
      },
      {
        value: 'professional',
        label: 'Soy profesional',
        description: 'Soy terapeuta o profesional de salud mental'
      },
      {
        value: 'prefer-not',
        label: 'Prefiero no decir',
        description: 'No deseo compartir esta información'
      }
    ]
  },
  {
    question: 'Documentos opcionales',
    description: 'Si tienes documentos relevantes (referencias médicas, estudios previos), puedes subirlos aquí',
    type: 'file',
    key: 'documents',
    accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
    fileHint: 'PDF, DOC, DOCX, JPG o PNG (máx. 10MB por archivo)'
  }
]

const totalSteps = steps.length

const progress = computed(() => {
  return (currentStep.value / totalSteps) * 100
})

const isStepValid = computed(() => {
  const step = steps[currentStep.value - 1]
  const value = formData.value[step.key]

  if (step.type === 'file') {
    return true // File upload is optional
  }

  return value && value.toString().trim().length > 0
})

const selectOption = (value) => {
  const step = steps[currentStep.value - 1]
  formData.value[step.key] = value
}

const nextStep = () => {
  if (!isStepValid.value) return

  if (currentStep.value === totalSteps) {
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
  const files = Array.from(event.target.files)
  uploadedFiles.value = [...uploadedFiles.value, ...files]
  formData.value.documents = uploadedFiles.value
}

const handleFileDrop = (event) => {
  isDragging.value = false
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

const submitForm = () => {
  console.log('Form submitted:', formData.value)
  alert('Form uploaded, check consloe')
  emit('closeOnboarding');
}
</script>