export type PoiskkinoPoster = {
  url?: string
  previewUrl?: string
}

export type PoiskkinoRating = {
  kp?: number
  imdb?: number
}

export type PoiskkinoDoc = {
  id: number
  name?: string
  alternativeName?: string
  year?: number
  poster?: PoiskkinoPoster
  rating?: PoiskkinoRating
  names?: Array<{ name?: string | null }>
  releaseYears?: Array<{ start?: number }>
}

export type PoiskkinoResponse = {
  docs: PoiskkinoDoc[]
}

