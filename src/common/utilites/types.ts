import { HttpStatusCode } from 'axios'


export type Nullable<T> = T | null

export type ErrorMessage = {
  field: string
  message: string
}

export type ErrorResponse = {
  error: string
  messages: ErrorMessage[] | string
  statusCode: HttpStatusCode
}

export type SortDirection = 'asc' | 'desc'
