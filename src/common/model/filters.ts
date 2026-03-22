import { createEvent, createStore, sample } from 'effector'

export type FilmsFilters = {
  genres: string[]
  ratingFrom: number
  ratingTo: number
  yearFrom: number
  yearTo: number
}

// TODO вынести константы и переиспользуемые типы

export function getYear(){
  return new Date().getFullYear()
}

const DEFAULT_FILTERS: FilmsFilters = {
  genres: [],
  ratingFrom: 0,
  ratingTo: 10,
  yearFrom: getYear()-2,
  yearTo: getYear(),
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
    const genresParam = search.get('genres.name')
    const genres = genresParam
      ? genresParam
          .split(',')                    
          .map(g => g.replace(/^\+/, ''))
          .filter(Boolean)
      : []
    
    // если year=2025-2026
    const yearParam = search.get('year')
    let yearFrom = DEFAULT_FILTERS.yearFrom
    let yearTo = DEFAULT_FILTERS.yearTo
    
    if (yearParam && yearParam.includes('-')) {
      const [from, to] = yearParam.split('-').map(Number)
      if (Number.isFinite(from)) yearFrom = from
      if (Number.isFinite(to)) yearTo = to
    } else if (yearParam) {

      // Если одиночный год
      const singleYear = Number(yearParam)
      if (Number.isFinite(singleYear)) {
        yearFrom = singleYear
        yearTo = singleYear
      }
    }
    
    // Рейтинг: rating.imdb=7-10
    const ratingParam = search.get('rating.imdb')
    let ratingFrom = DEFAULT_FILTERS.ratingFrom
    let ratingTo = DEFAULT_FILTERS.ratingTo
    
    if (ratingParam && ratingParam.includes('-')) {
      const [from, to] = ratingParam.split('-').map(Number)
      if (Number.isFinite(from)) ratingFrom = from
      if (Number.isFinite(to)) ratingTo = to
    } else if (ratingParam) {
      const singleRating = Number(ratingParam)
      if (Number.isFinite(singleRating)) {
        ratingFrom = singleRating
        ratingTo = singleRating
      }
    }
    
    return {
      genres,
      ratingFrom,
      ratingTo,
      yearFrom,
      yearTo,
    } satisfies FilmsFilters
  },
  target: $filters,
})

