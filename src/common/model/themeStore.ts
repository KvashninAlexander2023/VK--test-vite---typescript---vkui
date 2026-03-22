import { createEvent, createStore, sample } from 'effector';
import { type ColorSchemeType } from '@vkontakte/vkui';


export const themeChanged = createEvent<ColorSchemeType>();
export const themeInitialized = createEvent();


export const $theme = createStore<ColorSchemeType>('dark')
  .on(themeChanged, (_, theme) => theme)
  .on(themeInitialized, (state) => {

    const saved = localStorage.getItem('theme') as ColorSchemeType;
    return saved || state;
  });


sample({
  clock: $theme,
  fn: (theme) => {
    localStorage.setItem('theme', theme);
    return theme;
  },
});