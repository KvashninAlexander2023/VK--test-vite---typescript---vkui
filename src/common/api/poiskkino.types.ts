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
  poster?: PoiskkinoPoster
  rating?: PoiskkinoRating
  genres?: PoiskkinoGenre[]
  names?: Array<{ name?: string | null }>
  releaseYears?: Array<{ start?: number }>
}

export type PoiskkinoResponse = {
  docs: PoiskkinoDoc[]
}

