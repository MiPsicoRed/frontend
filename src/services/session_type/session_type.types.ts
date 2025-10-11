import type { SessionType } from "./session_type.service"

export interface CreatePayload {
    name: string
}

export interface DeletePayload {
    session_type_id: string
}

export interface ReadSingleQuery {
    session_type_id: string
}

export interface UpdatePayload {
    id: string,
    name: string,
}

export interface CreateResponse {
    success: boolean
}

export interface DeleteResponse {
    success: boolean
}

export interface ReadAllResponse {
    data: SessionType[]
    success: boolean
}

export interface ReadSingleResponse {
    data: SessionType
    success: boolean
}

export interface UpdateResponse {
    success: boolean
}