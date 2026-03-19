import { createEffect, createStore } from 'effector'
import { filmsApi } from '../api/test.api'
import type { PoiskkinoDoc, PoiskkinoResponse } from '../api/poiskkino.types'
import { $filters } from './filters'

const PAGE_SIZE = 20

type LoadParams = {
  page: number
  limit?: number
}

type LoadResult = {
  docs: PoiskkinoDoc[]
  page: number
  hasMore: boolean
}

export const loadFilmsFx = createEffect<LoadParams, LoadResult>(async ({ page, limit }) => {
  const perPage = limit ?? PAGE_SIZE

  const data = (await filmsApi.getFilms({ year: '2025-2026', limit: 50 })) as PoiskkinoResponse

  const filters = $filters.getState()

  const allDocs = (data.docs ?? []).filter((doc) => {
    const year = doc.year ?? doc.releaseYears?.[0]?.start
    const ratingValue = doc.rating?.kp ?? doc.rating?.imdb ?? 0
    const genres = (doc.genres ?? []).map((g) => g.name?.toLowerCase() ?? '')

    const matchYear =
      !year || (year >= filters.yearFrom && year <= filters.yearTo)

    const matchRating =
      ratingValue >= filters.ratingFrom && ratingValue <= filters.ratingTo

    const matchGenres =
      filters.genres.length === 0 ||
      filters.genres.every((g) => genres.includes(g.toLowerCase()))

    return matchYear && matchRating && matchGenres
  })

  const start = (page - 1) * perPage
  const slice = allDocs.slice(start, start + perPage)
  const hasMore = start + perPage < allDocs.length

  return {
    docs: slice,
    page,
    hasMore,
  }
})

export const $films = createStore<PoiskkinoDoc[]>([]).on(
  loadFilmsFx.doneData,
  (state, { docs, page }) => (page === 1 ? docs : [...state, ...docs])
)

export const $page = createStore(1).on(loadFilmsFx.doneData, (_, { page }) => page)

export const $hasMore = createStore(true).on(
  loadFilmsFx.doneData,
  (_, { hasMore }) => hasMore
)

export const $filmsPending = loadFilmsFx.pending
export const $filmsError = createStore<string | null>(null).on(
  loadFilmsFx.failData,
  (_, err) => (err instanceof Error ? err.message : 'Request failed')
)
