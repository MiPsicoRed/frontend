import type { ProfessionalLanguage } from "./professional-language.service"

export interface CreatePayload {
    professional_id: string
    name: string
}

export interface DeletePayload {
    professional_language_id: string
}

export interface ReadSingleQuery {
    professional_language_id: string
}

export interface UpdatePayload {
    id: string
    name: string
}

export interface CreateResponse {
    success: boolean
}

export interface DeleteResponse {
    success: boolean
}

export interface ReadAllResponse {
    data: ProfessionalLanguage[]
    success: boolean
}

export interface ReadSingleResponse {
    data: ProfessionalLanguage
    success: boolean
}

export interface UpdateResponse {
    success: boolean
}