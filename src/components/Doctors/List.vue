<template>
  <div class="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Our Medical Professionals</h1>
        <p class="text-lg text-gray-600">Find the right specialist for your healthcare needs</p>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name or specialty..."
              class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- Specialty Filter -->
          <select
            v-model="selectedSpecialty"
            class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Psychiatry">Psychiatry</option>
          </select>

          <!-- Availability Filter -->
          <select
            v-model="availabilityFilter"
            class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">All Availability</option>
            <option value="today">Available Today</option>
            <option value="week">Available This Week</option>
          </select>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6">
        <p class="text-gray-600">
          Showing <span class="font-semibold text-teal-600">{{ filteredDoctors.length }}</span> doctors
        </p>
      </div>

      <!-- Doctors Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="doctor in filteredDoctors"
          :key="doctor.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          @click="viewProfile(doctor.id)"
        >
          <!-- Doctor Image -->
          <div class="relative h-64 bg-gradient-to-br from-teal-400 to-blue-500">
            <img
              :src="doctor.image"
              :alt="doctor.name"
              class="w-full h-full object-cover"
            />
            <div
              v-if="doctor.availableToday"
              class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
            >
              Available Today
            </div>
          </div>

          <!-- Doctor Info -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-1">{{ doctor.name }}</h3>
            <p class="text-teal-600 font-semibold mb-3">{{ doctor.specialty }}</p>

            <!-- Rating -->
            <div class="flex items-center gap-2 mb-4">
              <div class="flex">
                <svg
                  v-for="star in 5"
                  :key="star"
                  class="w-5 h-5"
                  :class="star <= doctor.rating ? 'text-yellow-400' : 'text-gray-300'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="text-gray-600 text-sm">({{ doctor.reviews }} reviews)</span>
            </div>

            <!-- Experience & Hospital -->
            <div class="space-y-2 mb-4">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{{ doctor.experience }} years experience</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{{ doctor.hospital }}</span>
              </div>
            </div>

            <!-- Consultation Fee -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p class="text-sm text-gray-600">Consultation Fee</p>
                <p class="text-lg font-bold text-gray-900">{{ doctor.fee }}</p>
              </div>
              <button
                class="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-blue-600 transition-all duration-300"
                @click.stop="bookSession(doctor.id)"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredDoctors.length === 0"
        class="text-center py-16"
      >
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
        <p class="text-gray-600">Try adjusting your search or filters</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedSpecialty = ref('')
const availabilityFilter = ref('')

// Sample doctors data
const doctors = ref([
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    image: '/placeholder.svg?height=400&width=400',
    rating: 5,
    reviews: 127,
    experience: 15,
    hospital: 'City General Hospital',
    fee: '$150',
    availableToday: true
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    image: '/placeholder.svg?height=400&width=400',
    rating: 5,
    reviews: 98,
    experience: 12,
    hospital: 'Metropolitan Medical Center',
    fee: '$180',
    availableToday: true
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    image: '/placeholder.svg?height=400&width=400',
    rating: 5,
    reviews: 156,
    experience: 10,
    hospital: 'Children\'s Healthcare',
    fee: '$120',
    availableToday: false
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    image: '/placeholder.svg?height=400&width=400',
    rating: 4,
    reviews: 89,
    experience: 18,
    hospital: 'Sports Medicine Institute',
    fee: '$200',
    availableToday: true
  },
  {
    id: 5,
    name: 'Dr. Priya Patel',
    specialty: 'Dermatology',
    image: '/placeholder.svg?height=400&width=400',
    rating: 5,
    reviews: 143,
    experience: 8,
    hospital: 'Skin & Wellness Clinic',
    fee: '$140',
    availableToday: false
  },
  {
    id: 6,
    name: 'Dr. Robert Martinez',
    specialty: 'Psychiatry',
    image: '/placeholder.svg?height=400&width=400',
    rating: 5,
    reviews: 112,
    experience: 14,
    hospital: 'Mental Health Center',
    fee: '$160',
    availableToday: true
  }
])

const filteredDoctors = computed(() => {
  return doctors.value.filter(doctor => {
    const matchesSearch = searchQuery.value === '' ||
      doctor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesSpecialty = selectedSpecialty.value === '' ||
      doctor.specialty === selectedSpecialty.value

    const matchesAvailability = availabilityFilter.value === '' ||
      (availabilityFilter.value === 'today' && doctor.availableToday) ||
      (availabilityFilter.value === 'week')

    return matchesSearch && matchesSpecialty && matchesAvailability
  })
})

const viewProfile = (doctorId) => {
  console.log('[v0] Viewing doctor profile:', doctorId)
  // Navigate to doctor profile page
  // router.push(`/doctors/${doctorId}`)
}

const bookSession = (doctorId) => {
  console.log('[v0] Booking session with doctor:', doctorId)
  // Open booking modal or navigate to booking page
}
</script>