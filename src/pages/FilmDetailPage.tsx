import {
  Flex,
  Title,
  Text,
  Button,
  Spinner,
  Group,
  Box,
  Subhead,
  IconButton,
} from '@vkontakte/vkui'
import { Icon24FavoriteOutline, Icon24Favorite } from '@vkontakte/icons'
import { useParams, useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { $films, $filmsPending, loadFilmsFx } from '../common/model/films'
import { $favorites, addToFavorites, removeFromFavorites } from '../common/model/favorites'
import { Earpiece } from '../components/Earpiece'
import { getTitle, getRating } from '../components/CardFilm'
import styles from '../App.module.css'
import { useEffect, useState } from 'react'
import type { PoiskkinoDoc } from '../common/api/poiskkino.types'
import ConfirmFavoriteModal from '../components/ConfirmFavoriteModal'

export default function FilmDetailPage() {

  const [pendingFilm, setPendingFilm] = useState<PoiskkinoDoc | null>(null)
  const { id } = useParams<{ id: string }>()
  const [films, pending] = useUnit([$films, $filmsPending])
  const navigate = useNavigate()
  const favorites = useUnit($favorites)

  useEffect(() => {
    if (films.length === 0) {
      void loadFilmsFx({ page: 1 })
    }
  }, [films.length])

  const film = films.find((f) => String(f.id) === id)
  const isFavorite = film ? favorites.some((f) => f.id === film.id) : false

  const title = film ? getTitle(film) : ''
  const rating = film ? (getRating(film) ?? '--') : '--'
  const year = film?.year ?? film?.releaseYears?.[0]?.start
  const genres = (film?.genres ?? []).map((g) => g.name).filter(Boolean)

  function handleFavoriteClick() {
    if (!film) return
    if (isFavorite) {
      removeFromFavorites(film.id)
    } else {
      setPendingFilm(film)
    }
  }

  return (
    <>
      <Flex direction="column" className={styles.layout}>
        <Flex
          direction="column"
          align="center"
          gap={16}
          style={{ paddingTop: 56, paddingBottom: 72 }}
        >
          <Group style={{ width: '100%', maxWidth: 960 }}>
            {pending && !film && (
              <Flex justify="center" style={{ padding: 32 }}>
                <Spinner size="l" />
              </Flex>
            )}
            {!pending && !film && (
              <Flex direction="column" align="center" style={{ padding: 32 }} gap={16}>
                <Text>Фильм не найден.</Text>
                <Button onClick={() => navigate('/')}>На главную</Button>
              </Flex>
            )}
            {film && (
              <Flex
                gap={24}
                style={{ padding: 16 }}
                direction="row"
                className={styles.detailLayout}
              >
                <div style={{ flexShrink: 0, width: 260 }}>
                  {film.poster?.url || film.poster?.previewUrl ? (
                    <img
                      src={film.poster.url ?? film.poster.previewUrl}
                      alt={title}
                      style={{
                        width: '100%',
                        borderRadius: 8,
                        display: 'block',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Earpiece height={390} />
                  )}
                </div>
                <Flex direction="column" gap={12} style={{ flex: 1, minWidth: 0 }}>
                  <Flex align="center" gap={8}>
                    <Title level="1" Component="h1" style={{ flex: 1 }}>
                      {title}
                    </Title>
                    <IconButton
                      label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                      onClick={handleFavoriteClick}
                      style={{
                        background: 'var(--vkui--color_background_secondary)',
                        borderRadius: '50%',
                        flexShrink: 0,
                      }}
                    >
                      {isFavorite ? (
                        <Icon24Favorite style={{ color: 'var(--vkui--color_accent_blue)' }} />
                      ) : (
                        <Icon24FavoriteOutline />
                      )}
                    </IconButton>
                  </Flex>
                  <Flex gap={24} wrap="wrap">
                    {year && (
                      <Box>
                        <Subhead style={{ color: 'var(--vkui--color_text_secondary)' }}>
                          Дата выхода
                        </Subhead>
                        <Text>{year}</Text>
                      </Box>
                    )}

                    <Box>
                      <Subhead style={{ color: 'var(--vkui--color_text_secondary)' }}>
                        Рейтинг
                      </Subhead>
                      <Text>{rating}</Text>
                    </Box>

                    {genres.length > 0 && (
                      <Box>
                        <Subhead style={{ color: 'var(--vkui--color_text_secondary)' }}>
                          Жанры
                        </Subhead>
                        <Text>{genres.join(', ')}</Text>
                      </Box>
                    )}
                  </Flex>
                  {film.description && (
                    <Box>
                      <Subhead style={{ color: 'var(--vkui--color_text_secondary)', marginBottom: 4 }}>
                        Описание
                      </Subhead>
                      <Text style={{ lineHeight: 1.5 }}>{film.description}</Text>
                    </Box>
                  )}
                  {!film.description && (
                    <Text style={{ color: 'var(--vkui--color_text_secondary)' }}>
                      Описание отсутствует
                    </Text>
                  )}
                </Flex>
              </Flex>
            )}
          </Group>
        </Flex>
      </Flex>
      <ConfirmFavoriteModal
        film={pendingFilm}
        onConfirm={() => {
          if (pendingFilm) addToFavorites(pendingFilm)
          setPendingFilm(null)
        }}
        onCancel={() => setPendingFilm(null)}
      />
    </>
  )
}
