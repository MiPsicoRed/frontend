import type { User } from "./user.service"

export interface OnboardPayload {
    user_id: string
    user_type: string
    full_name: string
    phone: string
    birthdate?: string | null
    reason?: string | null
    experience?: string | null
    is_monoparental?: boolean | null
    guardian_name?: string | null
    guardian_id_document?: string | null
    signature?: string | null
    guardian_2_name?: string | null
    guardian_2_id_document?: string | null
    signature_2?: string | null
}

export interface ReadAllResponse {
    data: User[]
    success: boolean
}

export interface OnboardResponse {
    success: boolean
}
