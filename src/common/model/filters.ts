import { createEvent, createStore, sample } from 'effector'

export type FilmsFilters = {
  genres: string[]
  ratingFrom: number
  ratingTo: number
  yearFrom: number
  yearTo: number
}

const DEFAULT_FILTERS: FilmsFilters = {
  genres: [],
  ratingFrom: 0,
  ratingTo: 10,
  yearFrom: 1990,
  yearTo: new Date().getFullYear(),
}

export const filtersChanged = createEvent<Partial<FilmsFilters>>()
export const filtersReset = createEvent()

export const $filters = createStore<FilmsFilters>(DEFAULT_FILTERS)
  .on(filtersChanged, (state, patch) => ({
    ...state,
    ...patch,
  }))
  .reset(filtersReset)

// URL <-> filters
export const syncFiltersFromSearchParams = createEvent<URLSearchParams>()

sample({
  clock: syncFiltersFromSearchParams,
  fn: (search) => {
    const genres = search.getAll('genre')
    const ratingFrom = Number(search.get('ratingFrom') ?? DEFAULT_FILTERS.ratingFrom)
    const ratingTo = Number(search.get('ratingTo') ?? DEFAULT_FILTERS.ratingTo)
    const yearFrom = Number(search.get('yearFrom') ?? DEFAULT_FILTERS.yearFrom)
    const yearTo = Number(search.get('yearTo') ?? DEFAULT_FILTERS.yearTo)

    return {
      genres,
      ratingFrom: Number.isFinite(ratingFrom) ? ratingFrom : DEFAULT_FILTERS.ratingFrom,
      ratingTo: Number.isFinite(ratingTo) ? ratingTo : DEFAULT_FILTERS.ratingTo,
      yearFrom: Number.isFinite(yearFrom) ? yearFrom : DEFAULT_FILTERS.yearFrom,
      yearTo: Number.isFinite(yearTo) ? yearTo : DEFAULT_FILTERS.yearTo,
    } satisfies FilmsFilters
  },
  target: $filters,
})

