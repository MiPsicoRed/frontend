import axios, { type AxiosResponse } from 'axios'
import authHeader from '../auth/auth-header'
import type { CreateCheckoutSessionPayload, CreateCheckoutSessionResponse } from './checkout.types'

const API_URL = import.meta.env.VITE_BASE_API_URL + 'checkout/'

class CheckoutService {
  async createSession(payload: CreateCheckoutSessionPayload): Promise<CreateCheckoutSessionResponse> {
    const response: AxiosResponse<any> = await axios.post(
      API_URL + 'session',
      payload,
      { headers: authHeader() }
    )
    return response.data
  }
}

export default new CheckoutService()
