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
  verified: boolean
  needs_onboarding: boolean
  profile_picture_url?: string
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

  async getMe(): Promise<User> {
    const response: AxiosResponse<any> = await axios.get(
      API_URL + 'me',
      { headers: authHeader() }
    )
    return response.data
  }

  async userOnboarded(payload: OnboardPayload): Promise<OnboardResponse> {
    const response: AxiosResponse<any> = await axios.post(
      API_URL + 'onboarded',
      payload,
      { headers: authHeader() }
    )
    return response.data.data
  }

  async uploadProfilePicture(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)

    const response: AxiosResponse<any> = await axios.post(
      API_URL + 'profile-picture',
      formData,
      { 
        headers: { 
          ...authHeader(), 
          'Content-Type': 'multipart/form-data' 
        } 
      }
    )
    return response.data
  }
}

export default new UserService()