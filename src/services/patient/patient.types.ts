import type { Patient } from "./patient.service"

export interface CreatePayload {
    user_id: string | null
    gender_id: number
    sexual_orientation_id: number
    birthdate: Date
    phone: string
    emergency_contact_name: string | null
    emergency_contact_phone: string | null
    insurance_policy_number: string | null
    medical_history: string | null
    current_medications: string | null
    allergies: string | null
}

export interface DeletePayload {
    patient_id: string
}

export interface ReadSingleQuery {
    patient_id: string
    user_id: string | null
}

export interface UpdatePayload {
    id: string
    gender_id: number
    sexual_orientation_id: number
    birthdate: Date
    phone: string
    emergency_contact_name: string | null
    emergency_contact_phone: string | null
    insurance_policy_number: string | null
    medical_history: string | null
    current_medications: string | null
    allergies: string | null
}

export interface CreateResponse {
    success: boolean
}

export interface DeleteResponse {
    success: boolean
}

export interface ReadAllResponse {
    data: Patient[]
    success: boolean
}

export interface ReadSingleResponse {
    data: Patient
    success: boolean
}

export interface UpdateResponse {
    success: boolean
}