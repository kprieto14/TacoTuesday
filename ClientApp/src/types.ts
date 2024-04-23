import { CSSProperties } from 'react'

export interface CSSStarsProperties extends CSSProperties {
  '--rating': number
}

export type RestaurantType = {
  id?: number
  userId?: number | undefined
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
  user: {
    id: number
    fullName: string
    email: string
  }
}

export type NewReviewType = {
  id: number | undefined
  summary: string
  body: string
  stars: number
  createdAt: Date
  restaurantId: number
}

export type NewUserType = {
  fullName: string
  email: string
  password: string
}

export type LoginUserType = {
  email: string
  password: string
}

export type LoginSuccess = {
  token: string
  user: {
    id: number
    fullName: string
    email: string
  }
}

