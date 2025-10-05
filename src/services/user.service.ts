import axios, { type AxiosResponse } from 'axios'
import authHeader from './auth-header.ts'

const API_URL = 'http://localhost:3001/api/user/'

export interface User {
  id: string
  username: string
  email: string
}

class UserService {
  async getAllUsers(): Promise<User[]> {
    const response: AxiosResponse<any> = await axios.get(
      API_URL + 'all',
      { headers: authHeader() }
    )
    console.log(response)
    return response.data.data
  }
}

export default new UserService()