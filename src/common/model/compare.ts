// common/model/compare.ts
import { createEvent, createStore, sample } from 'effector'
import type { PoiskkinoDoc } from '../api/poiskkino.types'


// Тип для фильма в сравнении
export type CompareFilm = PoiskkinoDoc & {
  addedAt: number  // для FIFO (первый вошел — первый вышел)
}

// События
export const addToCompare = createEvent<PoiskkinoDoc>()
export const removeFromCompare = createEvent<number>() // по id
export const clearCompare = createEvent()

// Хранилище (максимум 2)
export const $compareFilms = createStore<CompareFilm[]>([])
  .on(addToCompare, (state, film) => {
    // 1. Проверяем, есть ли уже
    const existsIndex = state.findIndex(f => f.id === film.id)
    
    if (existsIndex !== -1) {
      // Удаляем если уже есть (как toggle)
      return state.filter((_, i) => i !== existsIndex)
    }
    
    // 2. Создаем новый объект с временем
    const newFilm: CompareFilm = {
      ...film,
      addedAt: Date.now()
    }
    
    // 3. Если уже 2 — удаляем самый старый
    if (state.length >= 2) {
      // Находим индекс самого старого (с наименьшим addedAt)
      const oldestIndex = state.reduce((oldest, item, index) => 
        item.addedAt < state[oldest].addedAt ? index : oldest, 0
      )
      const newState = [...state]
      newState[oldestIndex] = newFilm
      return newState
    }
    
    // 4. Просто добавляем
    return [...state, newFilm]
  })
  .on(removeFromCompare, (state, id) => {
    return state.filter(film => film.id !== id)
  })
  .reset(clearCompare)

// Селектор для получения чистого массива (без addedAt)
export const $compareFilmsList = $compareFilms.map(films => 
  films.map(({ addedAt, ...film }) => film)
)

// Количество фильмов в сравнении
export const $compareCount = $compareFilms.map(films => films.length)

// Проверка, есть ли фильм в сравнении
export const $isInCompare = (id: number) => 
  $compareFilms.map(films => films.some(f => f.id === id))