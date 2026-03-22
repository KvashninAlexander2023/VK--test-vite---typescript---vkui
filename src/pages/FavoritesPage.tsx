import {
  FixedLayout,
  Flex,
  Footer,
  Group,
  Text,
  Button,
} from '@vkontakte/vkui'
import { useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { $favorites } from '../common/model/favoritesStore'
import CardFilm from '../components/CardFilm'
import Copyright from '../components/Copyright'
import styles from '../App.module.css'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const favorites = useUnit($favorites)

  return (
    <Flex direction="column" className={styles.layout} style={{ marginTop: 40 }}>
      <Flex
        direction="column"
        align="center"
        gap={16}
        style={{ paddingTop: 56, paddingBottom: 72 }}
      >
        <Group style={{ width: '100%', maxWidth: 960 }}>
          {favorites.length === 0 ? (
            <Flex direction="column" align="center" style={{ padding: 32 }} gap={16}>
              <Text style={{ color: 'var(--vkui--color_text_secondary)' }}>
                Список избранного пуст
              </Text>
              <Button onClick={() => navigate('/')}>Перейти к фильмам</Button>
            </Flex>
          ) : (
            <Flex wrap="wrap" gap={16} justify="center" style={{ padding: 16 }}>
              {favorites.map((doc) =>
                <div
                  key={doc.id}
                  style={{ flex: '1 1 260px', minWidth: 260, maxWidth: 320, }}
                >
                  <CardFilm {...doc} />
                </div>
              )}
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
  )
}
