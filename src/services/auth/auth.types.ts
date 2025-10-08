export interface JwtClaims {
    uuid: string
    name: string
    verified: boolean
    exp: number
}

export interface ParsedToken {
    token: string
    claims: JwtClaims
    isExpired: boolean
}

export type AuthHeader = {
    Authorization: string
} & Record<string, string>

export interface LoginPayload {
    email: string
    password: string
}

export interface RegisterPayload {
    username: string
    usersurname: string
    email: string
    phone: string
    birthdate: Date
    password: string
}

export interface GenerateTokenPayload {
    user_id: string
}

export interface LoginResponse {
    jwt: string
    success: boolean
}

export interface RegisterResponse {
    jwt: string
    success: boolean
}

export interface GenerateTokenResponse {
    data: {
        created_at: Date,
        expires_at: Date,
        id: string,
        token: string,
        user_id: string,
    }
    success: boolean
}
