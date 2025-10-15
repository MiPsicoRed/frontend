<template>
  <header>
    <NavBar />
  </header>

  <div class="min-h-screen bg-gradient-to-br from-[slate-50] to-blue-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-r from-[#f8f3eb]/90 to-[#e8d5c4]/50 py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6">Como funciona</h1>
        <p class="text-xl leading-relaxed">
          Connect with qualified healthcare professionals in three simple steps. 
          Our platform makes it easy to get the care you need, when you need it.
        </p>
      </div>
    </section>

    <!-- Steps Section -->
    <section class="max-w-6xl mx-auto px-4 py-16">
      <!-- Step 1 -->
      <div class="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div class="flex-1">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 text-2xl font-bold mb-6">
            1
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Create Your Profile</h2>
          <p class="text-lg text-gray-600 mb-6 leading-relaxed">
            Sign up and complete your health profile in minutes. Share your medical history, 
            current conditions, and preferences to help us match you with the right healthcare professionals.
          </p>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Quick and secure registration process</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-[#b8d8d8] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Upload medical documents and prescriptions</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Set your preferences and availability</span>
            </li>
          </ul>
        </div>
        <div class="flex-1">
          <div class="bg-gradient-to-br from-[#f8f3eb]/90 to-[#e8d5c4]/50 rounded-2xl p-8 h-80 flex items-center justify-center">
            <svg class="w-48 h-48 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="flex flex-col md:flex-row-reverse items-center gap-12 mb-20">
        <div class="flex-1">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 text-2xl font-bold mb-6">
            2
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Find Your Doctor</h2>
          <p class="text-lg text-gray-600 mb-6 leading-relaxed">
            Browse our network of verified healthcare professionals. Filter by specialty, 
            availability, location, and ratings to find the perfect match for your needs.
          </p>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Search by specialty, location, or name</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Read verified patient reviews and ratings</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">View doctor profiles, credentials, and experience</span>
            </li>
          </ul>
        </div>
        <div class="flex-1">
          <div class="bg-gradient-to-br from-[#f8f3eb]/90 to-[#e8d5c4]/50 rounded-2xl p-8 h-80 flex items-center justify-center">
            <svg class="w-48 h-48 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#f8f3eb]/90 to-[#e8d5c4]/50 text-2xl font-bold mb-6">
            3
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Book & Connect</h2>
          <p class="text-lg text-gray-600 mb-6 leading-relaxed">
            Schedule your appointment at a time that works for you. Connect via video call, 
            phone, or in-person visit. Get the care you need from the comfort of your home.
          </p>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Real-time availability and instant booking</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Secure video consultations with HD quality</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">Automatic reminders and follow-up scheduling</span>
            </li>
          </ul>
        </div>
        <div class="flex-1">
          <div class="bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl p-8 h-80 flex items-center justify-center">
            <svg class="w-48 h-48 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="bg-white py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center text-gray-900 mb-4">Why Choose Our Platform</h2>
        <p class="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          We're committed to making healthcare accessible, affordable, and convenient for everyone.
        </p>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-gradient-to-r from-[#f8f3eb]/90 to-[#e8d5c4]/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Secure & Private</h3>
            <p class="text-gray-600">Your health data is encrypted and protected with industry-leading security standards.</p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-gradient-to-r from-[#f8f3eb]/90 to-[#e8d5c4]/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8  text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">24/7 Availability</h3>
            <p class="text-gray-600">Access healthcare professionals anytime, anywhere. No more waiting rooms or long delays.</p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8  text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Verified Professionals</h3>
            <p class="text-gray-600">All doctors are thoroughly vetted and licensed healthcare professionals.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-[#f8f3eb]/90 to-[#e8d5c4]/50 py-16 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p class="text-xl text-teal-50 mb-8">
          Join thousands of patients who trust us with their healthcare needs.
        </p>
        <button class="bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-50 transition-colors shadow-lg">
          Create Your Account
        </button>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="max-w-4xl mx-auto px-4 py-16 bg-gradient-to-r from-[#e8d5c4]/50 to-[#f8f3eb]/90">
      <h2 class="text-4xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
      
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" class="border border-gray-200 rounded-lg overflow-hidden">
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
          >
            <span class="font-semibold text-gray-900">{{ faq.question }}</span>
            <svg
              class="w-5 h-5 text-gray-500 transition-transform"
              :class="{ 'rotate-180': faq.open }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div
            v-show="faq.open"
            class="px-6 py-4 bg-gray-50 text-gray-600 border-t border-gray-200"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </section>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: 'How do I book an appointment?',
    answer: 'Simply browse our list of doctors, select the one that fits your needs, and click the "Book Now" button. You can choose your preferred date and time from their available slots.',
    open: false
  },
  {
    question: 'Is my health information secure?',
    answer: 'Yes, we use bank-level encryption and comply with all healthcare privacy regulations (HIPAA). Your data is stored securely and never shared without your explicit consent.',
    open: false
  },
  {
    question: 'What if I need to cancel or reschedule?',
    answer: 'You can cancel or reschedule appointments up to 24 hours before the scheduled time through your account dashboard. Late cancellations may be subject to a fee.',
    open: false
  },
  {
    question: 'Do you accept insurance?',
    answer: 'Many of our doctors accept various insurance plans. You can filter doctors by accepted insurance during your search. We also offer affordable self-pay options.',
    open: false
  },
  {
    question: 'How does the video consultation work?',
    answer: 'Our platform includes a built-in, secure video calling system. When it\'s time for your appointment, simply click "Join Call" from your dashboard. No additional software needed.',
    open: false
  }
])

const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open
}
</script>