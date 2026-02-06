import axios, { type AxiosResponse } from 'axios'
import authHeader from '../auth/auth-header'
import type { CreateCheckoutSessionPayload, CreateCheckoutSessionResponse } from './stripe.types'

const API_URL = import.meta.env.VITE_BASE_API_URL + 'checkout/'

class CheckoutService {
  /**
   * Create a Stripe Checkout Session via backend API.
   * The backend creates the session with Stripe and returns the session ID.
   */
  async createCheckoutSession(payload: CreateCheckoutSessionPayload): Promise<CreateCheckoutSessionResponse> {
    const response: AxiosResponse<CreateCheckoutSessionResponse> = await axios.post(
      API_URL + 'create-session',
      payload,
      { headers: authHeader() }
    )
    return response.data
  }
}

export default new CheckoutService()
