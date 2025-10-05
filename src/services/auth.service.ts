import axios, { type AxiosResponse } from 'axios'

const API_URL = 'http://localhost:3001/api/user/'

interface LoginCredentials {
  username: string
  password: string
}

interface RegisterCredentials {
  username: string
  email: string
  password: string
}

interface AuthResponse {
  jwt: string
  success: boolean 
}

class AuthService {
  async login(user: LoginCredentials): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      API_URL + 'login',
      {
        username: user.username,
        password: user.password
      }
    )
    
    if (response.data.jwt) {
      localStorage.setItem('user', JSON.stringify(response.data.jwt))
    }
    
    return response.data
  }

  logout(): void {
    localStorage.removeItem('user')
  }

  async register(user: RegisterCredentials): Promise<AxiosResponse> {
    return await axios.post(API_URL + 'register', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()