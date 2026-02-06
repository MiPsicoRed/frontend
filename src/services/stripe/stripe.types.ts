export interface CreateCheckoutSessionPayload {
  patient_id: string
  professional_id: string
  session_type_id: string | null
  session_date: string | null
  session_duration: number
  notes: string | null
}

export interface CreateCheckoutSessionResponse {
  client_secret: string
}
