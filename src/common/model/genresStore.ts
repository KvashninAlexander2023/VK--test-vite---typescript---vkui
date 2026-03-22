// store/genres.js
import { createStore, createEffect, createEvent } from "effector";
import { filmsApi } from "../api/filmsApi";

// Эффект для загрузки жанров
export const fetchGenresFx = createEffect(async () => {
  return await filmsApi.getFilmGenres();
});

// События
export const setGenres = createEvent();
export const resetGenres = createEvent();

// Стор для хранения жанров
export const $genres = createStore([])
  .on(fetchGenresFx.done, (_, { result }) => result)
  .on(setGenres, (_, genres) => genres)
  .on(resetGenres, () => []);

// Стор для состояния загрузки
export const $genresLoading = fetchGenresFx.pending;
