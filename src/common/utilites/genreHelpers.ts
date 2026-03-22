export interface SelectOption {
  value: string;
  label: string;
}

export type Genre = {
  name: string;
  slug: string;
};

//TODO вынести типы

export const transformGenresToSelectOptions = (genres: Genre[]): SelectOption[] => {
  return [
    { value: "", label: "Все жанры" },
    ...genres.map((genre) => ({
      value: genre.name,
      label: genre.name,
    })),
  ];
};
