export interface CreateCheckoutSessionPayload {
  amount: number
  currency: string
  success_url: string
  cancel_url: string
}

export interface CreateCheckoutSessionResponse {
  client_secret: string
}
