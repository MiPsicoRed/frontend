import type { Session } from "./session.service"

export interface CreatePayload {
    patient_id: string
    professional_id: string
    session_type_id: string | null
    session_status_id: number | null
    session_date: Date | null
    videocall_url: string | null
    notes: string | null
    session_duration: number | null
}

export interface DeletePayload {
    session_id: string
}

export interface ReadSingleQuery {
    session_id: string
    user_id: string | null
}

export interface UpdatePayload {
    id: string
    patient_id: string
    professional_id: string
    session_type_id: string | null
    session_status_id: number | null
    session_date: Date | null
    videocall_url: string | null
    notes: string | null
    session_duration: number | null
}

export interface CreateResponse {
    success: boolean
}

export interface DeleteResponse {
    success: boolean
}

export interface ReadAllResponse {
    data: Session[]
    success: boolean
}

export interface ReadSingleResponse {
    data: Session
    success: boolean
}

export interface UpdateResponse {
    success: boolean
}