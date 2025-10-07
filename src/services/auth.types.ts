export interface JwtClaims {
    email: string
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