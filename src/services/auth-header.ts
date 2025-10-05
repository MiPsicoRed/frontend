type AuthHeader = { Authorization: string } | Record<string, never>

export default function authHeader(): AuthHeader {
  const userStr = localStorage.getItem('user')
  
  if (!userStr) return {}
  
  try {
    const parsed = JSON.parse(userStr)
    
    // Check if it's a plain string (just the JWT token)
    if (typeof parsed === 'string') {
      return { Authorization: `Bearer ${parsed}` }
    }
    
    // Check if it's an object with accessToken or jwt property
    if (parsed?.accessToken) {
      return { Authorization: `Bearer ${parsed.accessToken}` }
    }
    
    if (parsed?.jwt) {
      return { Authorization: `Bearer ${parsed.jwt}` }
    }
  } catch (error) {
    console.error('Error parsing user from localStorage:', error)
  }
  
  return {}
}