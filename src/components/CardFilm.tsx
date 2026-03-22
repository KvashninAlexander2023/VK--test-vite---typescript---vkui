import { Box, Card, Image, Text, Title, IconButton, Button } from '@vkontakte/vkui'
import { Icon24FavoriteOutline, Icon24Favorite } from '@vkontakte/icons'
import type { PoiskkinoDoc } from '../common/utilites/types'
import { Earpiece } from './Earpiece'
import { useUnit } from 'effector-react'
import { $favorites } from '../common/model/favoritesStore'
import { useState } from 'react'
import ConfirmFavoriteModal from './ConfirmFavoriteModal'
import { addToFavorites, removeFromFavorites } from '../common/model/favoritesStore'
import { $compareFilmsList, addToCompare, removeFromCompare } from '../common/model/compareStore'
import { getRating, getTitle, getYear } from '../common/utilites/helpers'


export default function CardFilm(doc: PoiskkinoDoc) {
  // добавил сравнение карточек
  const compareFilms = useUnit($compareFilmsList)
  const isInCompare = compareFilms.some(f => f.id === doc.id)


  // const navigate = useNavigate()
  const favorites = useUnit($favorites)
  const isFavorite = favorites.some((f) => f.id === doc.id)
  const [pendingFilm, setPendingFilm] = useState<PoiskkinoDoc | null>(null)

  const year = getYear(doc)
  const rating = getRating(doc)
  const captionParts = [
    year ? String(year) : null,
    rating ? `Рейтинг: ${rating}` : 'Рейтинг: --',
  ].filter(Boolean) as string[]

  function handleFavoriteClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (isFavorite) {
      removeFromFavorites(doc.id)
    } else {
      setPendingFilm(doc)
    }
  }

  function handleConfirm() {
    if (pendingFilm) addToFavorites(pendingFilm)
    setPendingFilm(null)
  }

  function handleCancel() {
    setPendingFilm(null)
  }

  return (
    <>
      <Card mode="outline" style={{ position: 'relative', maxWidth: 300 }}>
        {doc.poster?.previewUrl || doc.poster?.url ? (
          <Image
            src={doc.poster?.previewUrl ?? doc.poster?.url}
            alt={getTitle(doc)}
            style={{
              width: '100%',
              height: 360,
              objectFit: 'cover',
              display: 'block',
              background: 'var(--vkui--color_background_secondary)',
            }}
            loading="lazy"
          />
        ) : (
          <Earpiece height={360} />
        )}

        <div
          style={{ position: 'absolute', top: 8, right: 8, opacity: 0.8 }}
          onClick={handleFavoriteClick}
        >
          <IconButton
            label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
            style={{
              background: 'var(--vkui--color_background_content)',
              borderRadius: '50%',
            }}
          >
            {isFavorite ? (
              <Icon24Favorite style={{ color: 'var(--vkui--color_accent_blue)' }} />
            ) : (
              <Icon24FavoriteOutline />
            )}
          </IconButton>
        </div>

        <Button
          style={{ marginTop: 5, marginLeft: 5 }}
          mode={isInCompare ? 'outline' : 'secondary'}
          size="m"
          onClick={(e) => {
            e.stopPropagation()
            if (isInCompare) {
              removeFromCompare(doc.id)
            } else {
              addToCompare(doc)
            }
          }}
        >
          {isInCompare ? 'Убрать из сравнения' : 'Сравнить'}
        </Button>

        <Box style={{ padding: 10 }}>
          <Title level="3" Component="h3">
            {getTitle(doc)}
          </Title>
          {captionParts.length > 0 ? (
            <Text style={{ marginTop: 4 }}>{captionParts.join(' · ')}</Text>
          ) : null}
        </Box>
      </Card>
      <ConfirmFavoriteModal
        film={pendingFilm}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  )
}
