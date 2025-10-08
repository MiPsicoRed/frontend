import axios, { type AxiosResponse } from 'axios'
import authHeader from '../auth/auth-header'

const API_URL = 'http://localhost:3001/api/user/'

export interface User {
  id: string
  username: string
  usersurname: string
  email: string
  phone: string
  verified: Boolean
  birthdate: Date
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