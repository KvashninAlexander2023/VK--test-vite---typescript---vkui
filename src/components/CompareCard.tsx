// components/CompareCard.tsx
import { Card, Text, Button, Image } from '@vkontakte/vkui'
import type { PoiskkinoDoc } from '../common/api/poiskkino.types'
import { removeFromCompare } from '../common/model/compare'
import { Earpiece } from './Earpiece'
import { Icon24CancelCircleOutline } from '@vkontakte/icons'

type CompareCardProps = {
  film: PoiskkinoDoc
  index: number
}

export const CompareCard = ({ film, index }: CompareCardProps) => {

  const title = film.name || film.alternativeName || 'Без названия'
  
  const rating = film.rating?.kp || film.rating?.imdb || null
  
  const genres = film.genres?.map(g => g.name).join(', ') || '—'
  
  const duration = film.movieLength 
    ? `${film.movieLength} мин`
    : film.seriesLength 
      ? `${film.seriesLength} мин (серия)`
      : '—'

  const posterUrl = film.poster?.previewUrl || film.poster?.url

  return (
    <Card mode="outline" style={{ 
      flex: 1, 
      minWidth: 280,
      maxWidth: 360,
      position: 'relative',
      padding: 16
    }}>
      <Icon24CancelCircleOutline
        style={{ position: 'absolute', top: 8, right: 8, zIndex:10, cursor: 'pointer', background:'black', borderRadius: '50%',}}
        onClick={() => removeFromCompare(film.id)}
      >

      </Icon24CancelCircleOutline>

        <div style={{ marginBottom: 16 }}>
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={title}
            style={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              borderRadius: 8,
              marginBottom: 12
            }}
          />
        ) : (
          <Earpiece height={200} title="Постер отсутствует" />
        )}
      </div>
      
      <div style={{ marginBottom: 16 }}>
        <Text weight="3" style={{ fontSize: 18, marginBottom: 8 }}>
          {index === 0 ? '🎬 Фильм 1' : '🎬 Фильм 2'}
        </Text>
        <Text weight="3" style={{ fontSize: 16, marginBottom: 4 }}>
          {title}
        </Text>
      </div>
      
      <div style={{ display: 'grid', gap: 8 }}>
        <div>
          <Text size={3} color="secondary">Год выпуска</Text>
          <Text>{film.year || '—'}</Text>
        </div>
        
        <div>
          <Text size={3} color="secondary">Рейтинг</Text>
          <Text>{rating ? `${rating} / 10` : '—'}</Text>
        </div>
        
        <div>
          <Text size={3} color="secondary">Жанры</Text>
          <Text>{genres}</Text>
        </div>
        
        <div>
          <Text size={3} color="secondary">Длительность</Text>
          <Text>{duration}</Text>
        </div>
      </div>
    </Card>
  )
}