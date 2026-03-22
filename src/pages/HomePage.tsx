import {
  Flex,
  Group,
  Spinner,
  Text,
  Title,
} from '@vkontakte/vkui'
import styles from '../App.module.css'
import { useCallback, useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { $films, $filmsError, $filmsPending, $hasMore, $nextLink, loadFilmsFx } from '../common/model/films'
import { $filters, syncFiltersFromSearchParams } from '../common/model/filters'

import CardFilm from '../components/CardFilm'
import FiltersPanel from '../components/FiltersPanel'
import { revertToQuery } from '../common/utilites/revertToQuery'
import { useNavigate } from 'react-router-dom'
import ScrollToTopButton from '../common/hooks/useScrollToTop'

export default function HomePage() {

  const isFirstRender = useRef(true)
  const navigate = useNavigate()



  const [films, pending, error, filters, hasMore, nextLink] = useUnit([
    $films,
    $filmsPending,
    $filmsError,
    $filters,
    $hasMore,
    $nextLink
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

  ////////////// load films /////////////
  const loadNextPage = useCallback(() => {
    if (!hasMore || pending) return

    const nextPage = Math.floor(films.length / 50) + 1
    let query = revertToQuery(filters)

    if (hasMore && nextLink) {
      query = `${query}&next=${nextLink}`
    }

    loadFilmsFx({ page: nextPage, query })
  }, [hasMore, pending, films.length, filters])

  //////////////// Intersection Observer /////////////
  const observerRef = useRef<IntersectionObserver>(null)

  const lastFilmRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (pending) return
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadNextPage()
        }
      })

      if (node) observerRef.current.observe(node)
    },
    [pending, hasMore, loadNextPage]
  )

  return (
    <Flex direction="column" className={styles.layout} style={{ marginTop: 40}}>
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
          {error && <Text style={{ padding: 16 }}>{error}</Text>}
          {!error && films && (
            <Flex wrap="wrap" gap={16} justify="center" style={{ padding: 16 }}>
              {films.map((doc, index) =>
                <div
                  key={doc.id}
                  style={{ flex: '1 1 260px', minWidth: 260, maxWidth: 320, cursor: 'pointer' }}
                  onClick={() => navigate(`/film/${doc.id}`)}
                  ref={index === films.length - 1 ? lastFilmRef : undefined}
                >
                  <CardFilm {...doc} />
                </div>
              )}
            </Flex>
          )}
          {pending && (
            <Flex justify="center" style={{ padding: 16 }}>
              <Spinner size="m" />
            </Flex>
          )}
        </Group>
      </Flex>
      <ScrollToTopButton />
    </Flex>
  )
}