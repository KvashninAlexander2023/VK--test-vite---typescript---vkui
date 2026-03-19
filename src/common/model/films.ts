import { createEffect, createStore, sample } from 'effector'
import { filmsApi } from '../api/test.api'
import type { PoiskkinoDoc, PoiskkinoResponse } from '../api/poiskkino.types'

export const loadFilmsFx = createEffect(async () => {
  const data = (await filmsApi.getFilms({year:'2025-2026', limit:50})) as PoiskkinoResponse
  
  return data.docs ?? []
})

export const $films = createStore<PoiskkinoDoc[]>([]).on(
  loadFilmsFx.doneData,
  (_, docs) => docs
)

export const $filmsPending = loadFilmsFx.pending
export const $filmsError = createStore<string | null>(null)
  .on(loadFilmsFx.failData, (_, err) =>
    err instanceof Error ? err.message : 'Request failed'
  )
  .reset(loadFilmsFx)

sample({
  clock: loadFilmsFx.done,
  fn: () => null,
  target: $filmsError,
})

