import { createEvent, createStore } from 'effector'
import type { PoiskkinoDoc } from '../api/poiskkino.types'

const STORAGE_KEY = 'favorites_films'

function loadFromStorage(): PoiskkinoDoc[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as PoiskkinoDoc[]) : []
  } catch {
    return []
  }
}

function saveToStorage(films: PoiskkinoDoc[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(films))
  } catch {
    // ignore
  }
}

export const addToFavorites = createEvent<PoiskkinoDoc>()
export const removeFromFavorites = createEvent<number>()

export const $favorites = createStore<PoiskkinoDoc[]>(loadFromStorage())
  .on(addToFavorites, (state, doc) => {
    if (state.some((f) => f.id === doc.id)) return state
    return [...state, doc]
  })
  .on(removeFromFavorites, (state, id) => state.filter((f) => f.id !== id))

$favorites.watch(saveToStorage)
