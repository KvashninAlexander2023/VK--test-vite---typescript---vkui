import { Icon28MoonOutline, Icon28SunOutline } from '@vkontakte/icons';
import * as React from 'react';
import { ColorScheme, type ColorSchemeType, IconButton, useColorScheme } from '@vkontakte/vkui';
import { useUnit } from 'effector-react';
import { $theme, themeChanged, themeInitialized  } from './common/model/theme';


const ColorSchemeSwitcher: React.FC<{
  colorScheme: ColorSchemeType;
  setColorScheme: (colorScheme: ColorSchemeType) => void;
}> = ({ colorScheme, setColorScheme }) => {


  return (
    <IconButton
      label={`Цветовая схема: ${colorScheme}`}
      onClick={() =>
        setColorScheme(colorScheme === ColorScheme.LIGHT ? ColorScheme.DARK : ColorScheme.LIGHT)
      }
    >
      {colorScheme === ColorScheme.LIGHT ? <Icon28SunOutline /> : <Icon28MoonOutline />}
    </IconButton>
  );
};

export const useColorSchemeSwitcher = (): [ColorSchemeType, React.ReactNode] => {
 
   const [theme] = useUnit([$theme]);
  
  React.useEffect(() => {
    themeInitialized()
  }, []);


  return [
    theme,
    <ColorSchemeSwitcher
      key="color-scheme-switcher"
      colorScheme={theme}
      setColorScheme={themeChanged}
    />,
  ];
};
