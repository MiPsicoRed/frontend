import axios, { type AxiosResponse } from 'axios'
import authHeader from '../auth/auth-header'
import type { CreatePayload, CreateResponse, DeletePayload, DeleteResponse, ReadAllResponse, ReadPatientQuery, ReadPatientResponse, ReadProfessionalQuery, ReadProfessionalResponse, ReadSingleQuery, ReadSingleResponse, UpdatePayload, UpdateResponse } from './session.types'

const API_URL = import.meta.env.VITE_BASE_API_URL + 'session/'

export interface Session {
    id: string
    patient_id: string
    professional_id: string,
    session_type_id: string | null
    session_status_id: number
    session_date: Date | null
    videocall_url: string | null
    notes: string | null
    completed: boolean
    session_duration: number | null
    created_at: Date
}

class SessionService {
    async create(payload: CreatePayload): Promise<CreateResponse> {
        const response: AxiosResponse<any> = await axios.post(
            API_URL + 'create',
            payload,
            { headers: authHeader() }
        )
        return response.data.data
    }

    async delete(payload: DeletePayload): Promise<DeleteResponse> {
        const response: AxiosResponse<any> = await axios.delete(
            API_URL + 'delete',
            { headers: authHeader(), data: payload }
        )
        return response.data.data
    }

    async readAll(): Promise<ReadAllResponse> {
        const response: AxiosResponse<any> = await axios.get(
            API_URL + 'all',
            { headers: authHeader() }
        )
        return response.data.data
    }

    async readPatient(query: ReadPatientQuery): Promise<ReadPatientResponse> {
        const response: AxiosResponse<any> = await axios.get(
            API_URL + 'patient',
            { headers: authHeader(), params: query }
        )
        return response.data.data
    }

    async readProfessional(query: ReadProfessionalQuery): Promise<ReadProfessionalResponse> {
        const response: AxiosResponse<any> = await axios.get(
            API_URL + 'professional',
            { headers: authHeader(), params: query }
        )
        return response.data.data
    }

    async readSingle(query: ReadSingleQuery): Promise<ReadSingleResponse> {
        const response: AxiosResponse<any> = await axios.get(
            API_URL + 'single',
            { headers: authHeader(), params: query }
        )
        return response.data.data
    }

    async update(payload: UpdatePayload): Promise<UpdateResponse> {
        const response: AxiosResponse<any> = await axios.patch(
            API_URL + 'update',
            payload,
            { headers: authHeader() }
        )
        return response.data.data
    }
}

export default new SessionService()