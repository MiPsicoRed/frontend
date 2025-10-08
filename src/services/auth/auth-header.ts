import { jwtDecode } from 'jwt-decode'
import type { JwtClaims, ParsedToken, AuthHeader } from '../auth/auth.types'

function parseJwt(token: string): ParsedToken | null {
  try {
    const decodedPayload = jwtDecode<JwtClaims>(token)

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000)
    const isExpired = decodedPayload.exp ? decodedPayload.exp < currentTime : false

    return {
      token,
      claims: decodedPayload,
      isExpired
    }
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

export function getAuthToken(): ParsedToken | null {
  const token = localStorage.getItem('token')

  if (!token) return null

  try {
    const parsedToken = parseJwt(token)

    // If token is expired, clear localStorage
    if (parsedToken?.isExpired) {
      console.warn('Token has expired, clearing localStorage')
      localStorage.removeItem('token')
      return null
    }

    return parsedToken
  } catch (error) {
    console.error('Error parsing token from localStorage:', error)
    return null
  }
}

export default function authHeader(): AuthHeader | Record<string, never> {
  const parsedToken = getAuthToken()

  if (parsedToken && !parsedToken.isExpired) {
    return { Authorization: `Bearer ${parsedToken.token}` }
  }

  return {}
}
