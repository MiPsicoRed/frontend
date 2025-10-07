import axios, { type AxiosResponse } from 'axios'

const API_URL = 'http://localhost:3001/api/user/'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  username: string
  usersurname: string
  email: string
  phone: string
  birthdate: Date
  password: string
}

interface LoginResponse {
  jwt: string
  success: boolean
}

class AuthService {
  async login(user: LoginCredentials): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      API_URL + 'login',
      {
        email: user.email,
        password: user.password
      }
    )

    if (response.data.jwt) {
      localStorage.setItem('token', response.data.jwt)
    }

    return response.data
  }

  logout(): void {
    localStorage.removeItem('token')
  }

  async register(user: RegisterCredentials): Promise<AxiosResponse> {
    const response = await axios.post(API_URL + 'register', {
      username: user.username,
      usersurname: user.usersurname,
      email: user.email,
      phone: user.phone,
      birthdate: user.birthdate,
      password: user.password
    })

    return response.data.user_id
  }
}

export default new AuthService()