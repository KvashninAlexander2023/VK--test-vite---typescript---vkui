import {
  AppRoot,
  ColorSchemeProvider,
  FixedLayout,
  Flex,
  Footer,
  Group,
  Title,
  Text,
  Button,
  IconButton,
} from '@vkontakte/vkui'
import { Icon24ArrowLeftOutline } from '@vkontakte/icons'
import { useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { useColorSchemeSwitcher } from '../ColorSchemeSwitcher'
import { $favorites } from '../common/model/favorites'
import CardFilm from '../components/CardFilm'
import Copyright from '../components/Copyright'
import styles from '../App.module.css'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const [colorScheme, colorSchemeSwitcher] = useColorSchemeSwitcher()
  const favorites = useUnit($favorites)

  return (
    <ColorSchemeProvider value={colorScheme}>
      <AppRoot disableSettingVKUIClassesInRuntime>
        <Flex direction="column" className={styles.layout}>
          <FixedLayout vertical="top">
            <Flex justify="space-between" align="center" className={styles.header}>
              <Flex align="center" gap={8}>
                <IconButton label="Назад" onClick={() => navigate('/')}>
                  <Icon24ArrowLeftOutline />
                </IconButton>
                <Title level="2" Component="div">
                  PoiskKino
                </Title>
              </Flex>
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
                Избранное
              </Title>

              {favorites.length === 0 ? (
                <Flex direction="column" align="center" style={{ padding: 32 }} gap={16}>
                  <Text style={{ color: 'var(--vkui--color_text_secondary)' }}>
                    Список избранного пуст
                  </Text>
                  <Button onClick={() => navigate('/')}>Перейти к фильмам</Button>
                </Flex>
              ) : (
                <Flex wrap="wrap" gap={16} justify="center" style={{ padding: 16 }}>
                  {favorites.map((doc) => <CardFilm key={doc.id} {...doc} />)}
                </Flex>
              )}
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
  )
}
