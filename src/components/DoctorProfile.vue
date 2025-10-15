<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
     Hero Section with Doctor Info 
    <div class="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
      <div class="max-w-6xl mx-auto px-4 py-12">
        <div class="flex flex-col md:flex-row gap-8 items-start">
           Doctor Image 
          <div class="flex-shrink-0">
            <div class="relative">
              <img
                :src="doctor.image"
                :alt="doctor.name"
                class="w-48 h-48 rounded-2xl object-cover border-4 border-white shadow-2xl"
              />
              <div
                v-if="doctor.isAvailable"
                class="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white"
              ></div>
            </div>
          </div>

           Doctor Details 
          <div class="flex-1">
            <h1 class="text-4xl font-bold mb-2">{{ doctor.name }}</h1>
            <p class="text-xl text-teal-100 mb-4">{{ doctor.specialty }}</p>
            
            <div class="flex flex-wrap gap-4 mb-6">
              <div class="flex items-center gap-2">
                <Star class="w-5 h-5 fill-yellow-300 text-yellow-300" />
                <span class="font-semibold">{{ doctor.rating }}</span>
                <span class="text-teal-100">({{ doctor.reviewCount }} reviews)</span>
              </div>
              <div class="flex items-center gap-2">
                <Briefcase class="w-5 h-5" />
                <span>{{ doctor.experience }} years experience</span>
              </div>
              <div class="flex items-center gap-2">
                <MapPin class="w-5 h-5" />
                <span>{{ doctor.location }}</span>
              </div>
            </div>

            <button
              @click="bookSession"
              class="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors shadow-lg flex items-center gap-2"
            >
              <Calendar class="w-5 h-5" />
              Book a Session
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
         Main Content 
        <div class="lg:col-span-2 space-y-8">
           About Section 
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User class="w-6 h-6 text-teal-600" />
              About Dr. {{ doctor.lastName }}
            </h2>
            <p class="text-gray-600 leading-relaxed">{{ doctor.bio }}</p>
          </div>

           Specializations 
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award class="w-6 h-6 text-teal-600" />
              Specializations
            </h2>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="spec in doctor.specializations"
                :key="spec"
                class="px-4 py-2 bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700 rounded-lg font-medium"
              >
                {{ spec }}
              </span>
            </div>
          </div>

           Blog Posts 
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FileText class="w-6 h-6 text-teal-600" />
              Recent Articles
            </h2>
            <div class="space-y-4">
              <article
                v-for="post in doctor.blogPosts"
                :key="post.id"
                class="border-l-4 border-teal-500 pl-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer rounded-r"
                @click="viewPost(post.id)"
              >
                <h3 class="font-semibold text-gray-800 mb-1">{{ post.title }}</h3>
                <p class="text-sm text-gray-600 mb-2">{{ post.excerpt }}</p>
                <div class="flex items-center gap-4 text-xs text-gray-500">
                  <span class="flex items-center gap-1">
                    <Clock class="w-3 h-3" />
                    {{ post.date }}
                  </span>
                  <span>{{ post.readTime }} min read</span>
                </div>
              </article>
            </div>
          </div>

           Patient Reviews 
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MessageSquare class="w-6 h-6 text-teal-600" />
              Patient Reviews
            </h2>
            <div class="space-y-6">
              <div
                v-for="review in doctor.reviews"
                :key="review.id"
                class="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
              >
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ review.initials }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="font-semibold text-gray-800">{{ review.name }}</h4>
                      <div class="flex gap-1">
                        <Star
                          v-for="i in 5"
                          :key="i"
                          class="w-4 h-4"
                          :class="i <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'"
                        />
                      </div>
                    </div>
                    <p class="text-gray-600 text-sm mb-2">{{ review.comment }}</p>
                    <span class="text-xs text-gray-500">{{ review.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

         Sidebar 
        <div class="space-y-6">
           Quick Info Card 
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="font-bold text-gray-800 mb-4">Quick Information</h3>
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <GraduationCap class="w-5 h-5 text-teal-600 mt-0.5" />
                <div>
                  <p class="text-sm font-medium text-gray-800">Education</p>
                  <p class="text-sm text-gray-600">{{ doctor.education }}</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <Building class="w-5 h-5 text-teal-600 mt-0.5" />
                <div>
                  <p class="text-sm font-medium text-gray-800">Hospital</p>
                  <p class="text-sm text-gray-600">{{ doctor.hospital }}</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <Languages class="w-5 h-5 text-teal-600 mt-0.5" />
                <div>
                  <p class="text-sm font-medium text-gray-800">Languages</p>
                  <p class="text-sm text-gray-600">{{ doctor.languages.join(', ') }}</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <DollarSign class="w-5 h-5 text-teal-600 mt-0.5" />
                <div>
                  <p class="text-sm font-medium text-gray-800">Consultation Fee</p>
                  <p class="text-sm text-gray-600">{{ doctor.consultationFee }}</p>
                </div>
              </div>
            </div>
          </div>

           Availability Card 
          <div class="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 class="font-bold mb-4 flex items-center gap-2">
              <Clock class="w-5 h-5" />
              Availability
            </h3>
            <div class="space-y-2">
              <div
                v-for="schedule in doctor.schedule"
                :key="schedule.day"
                class="flex justify-between text-sm"
              >
                <span class="font-medium">{{ schedule.day }}</span>
                <span class="text-teal-100">{{ schedule.hours }}</span>
              </div>
            </div>
          </div>

           References/Certifications 
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award class="w-5 h-5 text-teal-600" />
              Certifications
            </h3>
            <div class="space-y-3">
              <div
                v-for="cert in doctor.certifications"
                :key="cert.id"
                class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <CheckCircle class="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p class="text-sm font-medium text-gray-800">{{ cert.name }}</p>
                  <p class="text-xs text-gray-600">{{ cert.issuer }} • {{ cert.year }}</p>
                </div>
              </div>
            </div>
          </div>

           Contact Card 
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="font-bold text-gray-800 mb-4">Contact</h3>
            <div class="space-y-3">
              <a
                href="#"
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone class="w-5 h-5 text-teal-600" />
                <span class="text-sm text-gray-700">{{ doctor.phone }}</span>
              </a>
              <a
                href="#"
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail class="w-5 h-5 text-teal-600" />
                <span class="text-sm text-gray-700">{{ doctor.email }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Star,
  Briefcase,
  MapPin,
  Calendar,
  User,
  Award,
  FileText,
  Clock,
  MessageSquare,
  GraduationCap,
  Building,
  Languages,
  DollarSign,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-vue-next'

// Sample doctor data - replace with actual data from your API
const doctor = ref({
  name: 'Dr. Sarah Johnson',
  lastName: 'Johnson',
  specialty: 'Clinical Psychologist',
  image: '/placeholder.svg?height=400&width=400',
  rating: 4.9,
  reviewCount: 127,
  experience: 12,
  location: 'New York, NY',
  isAvailable: true,
  bio: 'Dr. Sarah Johnson is a board-certified clinical psychologist with over 12 years of experience specializing in cognitive behavioral therapy, anxiety disorders, and depression. She takes a compassionate, evidence-based approach to help her patients achieve lasting positive change. Dr. Johnson believes in creating a safe, non-judgmental space where patients can explore their thoughts and feelings while developing practical coping strategies.',
  specializations: [
    'Cognitive Behavioral Therapy',
    'Anxiety Disorders',
    'Depression',
    'Stress Management',
    'Trauma Recovery'
  ],
  education: 'PhD in Clinical Psychology, Harvard University',
  hospital: 'Manhattan Mental Health Center',
  languages: ['English', 'Spanish', 'French'],
  consultationFee: '$150 per session',
  phone: '+1 (555) 123-4567',
  email: 'dr.johnson@mipsicored.com',
  schedule: [
    { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Wednesday', hours: '10:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 3:00 PM' },
    { day: 'Saturday', hours: 'By appointment' },
    { day: 'Sunday', hours: 'Closed' }
  ],
  blogPosts: [
    {
      id: 1,
      title: 'Understanding Anxiety: A Comprehensive Guide',
      excerpt: 'Learn about the different types of anxiety disorders and effective coping strategies that can help you manage symptoms.',
      date: 'March 15, 2024',
      readTime: 8
    },
    {
      id: 2,
      title: '5 Daily Habits for Better Mental Health',
      excerpt: 'Discover simple yet powerful daily practices that can significantly improve your mental well-being and resilience.',
      date: 'March 8, 2024',
      readTime: 5
    },
    {
      id: 3,
      title: 'The Science Behind Cognitive Behavioral Therapy',
      excerpt: 'Explore how CBT works and why it has become one of the most effective treatments for various mental health conditions.',
      date: 'February 28, 2024',
      readTime: 10
    }
  ],
  certifications: [
    {
      id: 1,
      name: 'Board Certified Clinical Psychologist',
      issuer: 'American Board of Professional Psychology',
      year: '2015'
    },
    {
      id: 2,
      name: 'Certified CBT Practitioner',
      issuer: 'Beck Institute',
      year: '2013'
    },
    {
      id: 3,
      name: 'Trauma-Focused Therapy Certification',
      issuer: 'International Society for Traumatic Stress Studies',
      year: '2018'
    }
  ],
  reviews: [
    {
      id: 1,
      name: 'Michael Chen',
      initials: 'MC',
      rating: 5,
      comment: 'Dr. Johnson has been instrumental in helping me manage my anxiety. Her approach is both professional and compassionate. Highly recommend!',
      date: 'March 10, 2024'
    },
    {
      id: 2,
      name: 'Emily Rodriguez',
      initials: 'ER',
      rating: 5,
      comment: 'After struggling with depression for years, Dr. Johnson helped me develop practical strategies that actually work. She truly cares about her patients.',
      date: 'March 5, 2024'
    },
    {
      id: 3,
      name: 'David Thompson',
      initials: 'DT',
      rating: 4,
      comment: 'Very knowledgeable and patient. The sessions have been very helpful in understanding my thought patterns.',
      date: 'February 28, 2024'
    }
  ]
})

const bookSession = () => {
  console.log('[v0] Booking session with', doctor.value.name)
  // Implement booking logic here
  alert('Booking functionality would be implemented here')
}

const viewPost = (postId) => {
  console.log('[v0] Viewing blog post:', postId)
  // Implement navigation to blog post
}
</script>