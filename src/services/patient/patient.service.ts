import axios, { type AxiosResponse } from 'axios'
import authHeader from '../auth/auth-header'
import type { CreatePayload, CreateResponse, DeletePayload, DeleteResponse, ReadAllResponse, ReadSingleByUserQuery, ReadSingleQuery, ReadSingleResponse, UpdatePayload, UpdateResponse } from './patient.types'

const API_URL = import.meta.env.VITE_BASE_API_URL + 'patient/'

export interface Patient {
    id: string
    user_id: string | null
    gender: number
    sexual_orientation: number
    birthdate: Date
    phone: string
    emergency_contact_name: string | null
    emergency_contact_phone: string | null
    insurance_policy_number: string | null
    medical_history: string | null
    current_medications: string | null
    allergies: string | null
    created_at: Date
}

class PatientService {
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

    async readSingle(query: ReadSingleQuery): Promise<ReadSingleResponse> {
        const response: AxiosResponse<any> = await axios.get(
            API_URL + 'single',
            { headers: authHeader(), params: query }
        )
        return response.data.data
    }

    async readSingleByUser(query: ReadSingleByUserQuery): Promise<ReadSingleResponse> {
        const response: AxiosResponse<any> = await axios.get(
            API_URL + 'user',
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

export default new PatientService()