import type { User } from "./user.service"

export interface OnboardPayload {
    user_id: string
}

export interface ReadAllResponse {
    data: User[]
    success: boolean
}

export interface OnboardResponse {
    success: boolean
}
