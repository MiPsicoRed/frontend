import type { ProfessionalSepecialization } from "./professional-specialization.service"

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
    data: ProfessionalSepecialization[]
    success: boolean
}

export interface ReadSingleResponse {
    data: ProfessionalSepecialization
    success: boolean
}

export interface UpdateResponse {
    success: boolean
}