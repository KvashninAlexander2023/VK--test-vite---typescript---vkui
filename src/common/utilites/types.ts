import type { HttpStatusCode } from "axios"

export type PoiskkinoPoster = {
  url?: string
  previewUrl?: string
}

export type PoiskkinoRating = {
  kp?: number
  imdb?: number
}

export type PoiskkinoGenre = {
  name?: string
}

export type PoiskkinoDoc = {
  id: number
  name?: string
  alternativeName?: string
  year?: number
  description?: string
  seriesLength?: string
  movieLength?: string
  poster?: PoiskkinoPoster
  rating?: PoiskkinoRating
  genres?: PoiskkinoGenre[]
  names?: Array<{ name?: string | null }>
  releaseYears?: Array<{ start?: number }>
}

export type PoiskkinoResponse = {
  docs: PoiskkinoDoc[]
  limit: number
  next: Nullable<string>
  prev: Nullable<string>
  hasNext: boolean,
  hasPrev: boolean,
}

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

export type CompareFilm = PoiskkinoDoc & {
  addedAt: number  
}

export type FilmsFilters = {
  genres: string[]
  ratingFrom: number
  ratingTo: number
  yearFrom: number
  yearTo: number
}

export type SelectOption =  {
  value: string;
  label: string;
}

export type Genre = {
  name: string;
  slug: string;
};