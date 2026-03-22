import { createEffect, createEvent, createStore } from "effector";
import { filmsApi } from "../api/filmsApi";
import type { PoiskkinoDoc, PoiskkinoResponse } from "../api/poiskkino.types";
import { type FilmsFilters } from "./filters";
import type { Nullable } from "../utilites/types";


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
  nextToken: Nullable<string>
};


//TODO вынести константы 
export const loadFilmsFx = createEffect<LoadParams, LoadResult>(async ({ page, query }) => {

  const data = (await filmsApi.getFilms({ query })) as PoiskkinoResponse;

  const nextToken = data.next
  const slice = data.docs;
  const hasMore = data.hasNext;

  return {
    docs: slice,
    page,
    hasMore,
    nextToken: nextToken
  };
});

//TODO не используется - убрать
export const loadMore = createEvent() 
export const resetFilms = createEvent() 

export const $films = createStore<PoiskkinoDoc[]>([])
    .on(loadFilmsFx.doneData, (state, { docs, page }) => (page === 1 ? docs : [...state, ...docs]))
    .reset(resetFilms)

export const $page = createStore(1)
  .on(loadFilmsFx.doneData, (_, { page }) => page)
  .reset(resetFilms)

export const $hasMore = createStore(true)
  .on(loadFilmsFx.doneData, (_, { hasMore }) => hasMore)
  .reset(resetFilms)

export const $nextLink = createStore<string | null>(null)
  .on(loadFilmsFx.doneData, (state, { nextToken }) => state === nextToken ? state : nextToken)
  .reset(resetFilms)


export const $filmsPending = loadFilmsFx.pending
export const $filmsError = createStore<string | null>(null).on(loadFilmsFx.failData, (_, err) => (err instanceof Error ? err.message : "Request failed"));
