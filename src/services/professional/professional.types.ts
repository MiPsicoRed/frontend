import type { Professional } from "./professional.service"

export interface CreatePayload {
    user_id: string
    gender_id: number
    birthdate: Date
    license_number: string | null
    bio: string | null
    education: string | null
    experience_years: number | null
    hourly_rate: number | null
    accepts_insurance: boolean
}

export interface DeletePayload {
    professional_id: string
}

export interface ReadSingleQuery {
    professional_id: string
}

export interface UpdatePayload {
    id: string
    gender_id: number
    birthdate: Date
    license_number: string | null
    bio: string | null
    education: string | null
    experience_years: number | null
    hourly_rate: number | null
    accepts_insurance: boolean
}

export interface CreateResponse {
    success: boolean
}

export interface DeleteResponse {
    success: boolean
}

export interface ReadAllResponse {
    data: Professional[]
    success: boolean
}

export interface ReadSingleResponse {
    data: Professional
    success: boolean
}

export interface UpdateResponse {
    success: boolean
}