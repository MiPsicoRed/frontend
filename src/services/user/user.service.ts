import axios, { type AxiosResponse } from 'axios'
import authHeader from '../auth/auth-header'

const API_URL = 'http://localhost:3001/api/user/'

export interface User {
  id: string
  role_id: number
  username: string
  usersurname: string
  email: string
  verified: Boolean
  created_at: Date
}

class UserService {
  async getAllUsers(): Promise<User[]> {
    const response: AxiosResponse<any> = await axios.get(
      API_URL + 'all',
      { headers: authHeader() }
    )
    return response.data.data
  }
}

export default new UserService()