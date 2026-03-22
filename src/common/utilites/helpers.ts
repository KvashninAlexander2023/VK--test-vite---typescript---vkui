import type { Genre, PoiskkinoDoc, SelectOption } from "./types";

export const transformGenresToSelectOptions = (genres: Genre[]): SelectOption[] => {
  return [
    { value: "", label: "Все жанры" },
    ...genres.map((genre) => ({
      value: genre.name,
      label: genre.name,
    })),
  ];
};

export function getTitle(doc: PoiskkinoDoc) {
  return doc.name ?? doc.alternativeName ?? doc.names?.[0]?.name ?? 'Без названия'
}

export function getYear(doc: PoiskkinoDoc) {
  return doc.year ?? doc.releaseYears?.[0]?.start
}

export function getRating(doc: PoiskkinoDoc) {
  const kp = doc.rating?.kp ?? 0
  const imdb = doc.rating?.imdb ?? 0
  const value = kp > 0 ? kp : imdb
  return value > 0 ? value : null
}

export function getNowYear(){
  return new Date().getFullYear()
}
