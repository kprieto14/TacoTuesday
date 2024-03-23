import { CSSProperties } from 'react'

export interface CSSStarsProperties extends CSSProperties {
  '--rating': number
}

export type RestaurantType = {
  id?: number
  name: string
  description: string
  address: string
  telephone: string
  reviews: ReviewType[]
}


export type APIError = {
  errors: Record<string, string[]>
  status: number
  title: string
  traceId: string
  type: string
}

export type ReviewType = {
  id?: number
  summary: string
  body: string
  stars: number
  createdAt?: string
  restaurantId: number
}