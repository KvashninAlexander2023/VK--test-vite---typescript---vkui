import {
  AppRoot,
  Caption,
  ColorSchemeProvider,
  FixedLayout,
  Flex,
  Footer,
  Group,

  Link,
  Spinner,
  Text,
  Title,
  Box,
} from '@vkontakte/vkui';
import { useColorSchemeSwitcher } from './ColorSchemeSwitcher';
import styles from './App.module.css';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $films, $filmsError, $filmsPending, loadFilmsFx } from './common/model/films';

import CardFilm from './components/CardFilm';
import ProTip from './components/ProTip';
import Copyright from './components/Copyright';





export default function App() {
  const [colorScheme, colorSchemeSwitcher] = useColorSchemeSwitcher();

  const [films, pending, error] = useUnit([$films, $filmsPending, $filmsError]);

  useEffect(() => {
    void loadFilmsFx();
  }, []);


  return (
    <ColorSchemeProvider value={colorScheme}>
      <AppRoot disableSettingVKUIClassesInRuntime>
        <Flex direction="column" className={styles.layout}>
          <FixedLayout vertical="top">
            <Flex justify="space-between" align="center" className={styles.header}>
              <Title level="2" Component="div">
                PoiskKino
              </Title>
              {colorSchemeSwitcher}
            </Flex>
          </FixedLayout>
          <Flex
            direction="column"
            align="center"
            gap={16}
            style={{ paddingTop: 56, paddingBottom: 72 }}
          >

            <Group style={{ width: '100%', maxWidth: 960 }}>
              <Title level="1" Component="h1" style={{ padding: 16, paddingBottom: 0 }}>
                Фильмы
              </Title>
              {pending && (
                <Flex justify="center" style={{ padding: 16 }}>
                  <Spinner size="m" />
                </Flex>
              )}
              {error && <Text style={{ padding: 16 }}>{error}</Text>}

              {!pending && !error && (
                <Flex wrap="wrap" gap={16} justify="center" style={{ padding: 16 } }>
                  {films.map((doc) => {
                    return CardFilm(doc)
                  })}
                </Flex>
              )}
            </Group>

            <Group style={{ width: '100%', maxWidth: 960 }}>
              <Box>
                <ProTip />
              </Box>
            </Group>
          </Flex>

          <FixedLayout vertical="bottom">
            <Footer>
              <Copyright />
            </Footer>
          </FixedLayout>
        </Flex>
      </AppRoot>
    </ColorSchemeProvider>
  );
}
