import {
  FixedLayout,
  Flex,
  Footer,
  Group,
  Spinner,
  Text,
  Title,
  Box,
} from '@vkontakte/vkui'
import styles from '../App.module.css'
import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { $films, $filmsError, $filmsPending, loadFilmsFx } from '../common/model/films'
import { $filters, syncFiltersFromSearchParams } from '../common/model/filters'

import CardFilm from '../components/CardFilm'
import ProTip from '../components/ProTip'
import Copyright from '../components/Copyright'
import FiltersPanel from '../components/FiltersPanel'

export default function HomePage() {

  const [films, pending, error, filters] = useUnit([
    $films,
    $filmsPending,
    $filmsError,
    $filters,
  ])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    syncFiltersFromSearchParams(params)
  }, [])

  useEffect(() => {
    void loadFilmsFx({ page: 1 })
  }, [filters])

  useEffect(() => {
    const params = new URLSearchParams()

    filters.genres.forEach((g) => params.append('genre', g))
    params.set('ratingFrom', String(filters.ratingFrom))
    params.set('ratingTo', String(filters.ratingTo))
    params.set('yearFrom', String(filters.yearFrom))
    params.set('yearTo', String(filters.yearTo))

    const query = params.toString()
    const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname
    window.history.replaceState(null, '', newUrl)
  }, [filters])

  return (
    <Flex direction="column" className={styles.layout}>
      <Flex
        direction="column"
        align="center"
        gap={16}
        style={{ paddingTop: 56, paddingBottom: 72 }}
      >
        <Group style={{ width: '100%', maxWidth: 960 }}>
          <FiltersPanel />
        </Group>
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
            <Flex wrap="wrap" gap={16} justify="center" style={{ padding: 16 }}>
              {films.map((doc) => <CardFilm key={doc.id} {...doc} />)}
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
  )
}