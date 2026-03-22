import {
  Flex,
  Group,
  Spinner,
  Text,
  Title,
} from '@vkontakte/vkui'
import styles from '../App.module.css'
import { useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { $films, $filmsError, $filmsPending, loadFilmsFx } from '../common/model/films'
import { $filters, syncFiltersFromSearchParams } from '../common/model/filters'

import CardFilm from '../components/CardFilm'
import FiltersPanel from '../components/FiltersPanel'
import { revertToQuery } from '../common/utilites/revertToQuery'

export default function HomePage() {

  const isFirstRender = useRef(true)

  const [films, pending, error, filters] = useUnit([
    $films,
    $filmsPending,
    $filmsError,
    $filters,
  ])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params) {
      syncFiltersFromSearchParams(params)
    }
  }, [])



  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const query = revertToQuery(filters)

    loadFilmsFx({ page: 1, query })

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
      </Flex>
    </Flex>
  )
}