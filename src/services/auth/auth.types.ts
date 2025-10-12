export interface JwtClaims {
    uuid: string
    fullname: string
    role: number,
    verified: boolean
    exp: number
}

export enum Role {
    Patient = 1,
    Professional = 2,
    Admin = 3,
}

export function fromRoleId(id: number): Role | undefined {
    if (Object.values(Role).includes(id as Role)) {
        return id as Role;
    }
    return undefined;
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
    success: boolean
}
