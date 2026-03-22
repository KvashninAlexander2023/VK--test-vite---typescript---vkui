import type { FilmsFilters } from "./types"

export function revertToQuery(filters: FilmsFilters) {

    const params = new URLSearchParams()

    filters.genres.forEach((g) => params.append('genres.name', g))
    params.set('rating.imdb', `${String(filters.ratingFrom)}-${String(filters.ratingTo)}`)
    params.set('year', `${String(filters.yearFrom)}-${String(filters.yearTo)}`)


    const query = params.toString()
    const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname
    window.history.replaceState(null, '', newUrl)

    if (String(filters.yearFrom).length !== 4 || String(filters.yearTo).length !== 4) {
        return null
    }

    return query
}
