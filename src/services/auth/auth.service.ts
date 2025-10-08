import axios, { type AxiosResponse } from 'axios'
import type { GenerateTokenPayload, LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from './auth.types'
import authHeader from './auth-header'

const USER_API_URL = 'http://localhost:3001/api/user/'
const USERTOKENAPI_URL = 'http://localhost:3001/api/user_token/'


class AuthService {
  async validateToken(): Promise<boolean> {
    try {
      const response = await axios.post(
        USERTOKENAPI_URL + 'validate',
        {},
        { headers: authHeader() }
      )

      return response.data.valid;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log('Token is invalid or expired');
        } else {
          console.error('Token validation error:', error.response?.status);
        }
      } else {
        console.error('Token validation error:', error);
      }
      return false;
    }
  }

  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      USER_API_URL + 'login',
      {
        email: payload.email,
        password: payload.password
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

  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await axios.post(USER_API_URL + 'register', {
      username: payload.username,
      usersurname: payload.usersurname,
      email: payload.email,
      phone: payload.phone,
      birthdate: payload.birthdate,
      password: payload.password
    })

    if (response.data.jwt) {
      localStorage.setItem('token', response.data.jwt)
    }

    return response.data
  }

  async generate_token(payload: GenerateTokenPayload): Promise<RegisterResponse> {
    const response = await axios.post(
      USERTOKENAPI_URL + 'generate',
      { user_id: payload.user_id },
      { headers: authHeader() }
    )
    return response.data
  }

  async verifyToken(token: string) {
    const response = await axios.get(USERTOKENAPI_URL + 'verify', {
      params: { token }
    })
    return response.data
  }

}

export default new AuthService()