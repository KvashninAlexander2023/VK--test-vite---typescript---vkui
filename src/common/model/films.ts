import { createEffect, createStore } from "effector";
import { filmsApi } from "../api/filmsApi";
import type { PoiskkinoDoc, PoiskkinoResponse } from "../api/poiskkino.types";
import { type FilmsFilters } from "./filters";


const PAGE_SIZE = 50;

type LoadParams = {
  filters?: FilmsFilters;
  page: number;
  limit?: number;
  query?: any;
};

type LoadResult = {
  docs: PoiskkinoDoc[];
  page: number;
  hasMore: boolean;
};


//TODO вынести константы 

export const loadFilmsFx = createEffect<LoadParams, LoadResult>(async ({ page, filters, query, limit }) => {

  const perPage = limit ?? PAGE_SIZE;

  const data = (await filmsApi.getFilms({ query })) as PoiskkinoResponse;

  const slice = data.docs;
  const hasMore = true;

  return {
    docs: slice,
    page,
    hasMore,
  };
});

export const $films = createStore<PoiskkinoDoc[]>([]).on(loadFilmsFx.doneData, (state, { docs, page }) => (page === 1 ? docs : [...state, ...docs]));

export const $page = createStore(1).on(loadFilmsFx.doneData, (_, { page }) => page)

export const $hasMore = createStore(true).on(loadFilmsFx.doneData, (_, { hasMore }) => hasMore);

export const $filmsPending = loadFilmsFx.pending;
export const $filmsError = createStore<string | null>(null).on(loadFilmsFx.failData, (_, err) => (err instanceof Error ? err.message : "Request failed"));
