import axios, { type AxiosResponse } from 'axios'
import authHeader from '../auth/auth-header'
import type { OnboardPayload, OnboardResponse, ReadAllResponse } from './user.types'

const API_URL = import.meta.env.VITE_BASE_API_URL + 'user/'

export interface User {
  id: string
  role_id: number
  username: string
  usersurname: string
  email: string
  verified: Boolean
  needs_onboarding: Boolean
  created_at: Date
}

class UserService {
  async getAllUsers(): Promise<ReadAllResponse> {
    const response: AxiosResponse<any> = await axios.get(
      API_URL + 'all',
      { headers: authHeader() }
    )
    return response.data.data
  }

  async userOnboarded(payload: OnboardPayload): Promise<OnboardResponse> {
    const response: AxiosResponse<any> = await axios.get(
      API_URL + 'onboarded',
      { headers: authHeader(), data: payload }
    )
    return response.data.data
  }
}

export default new UserService()