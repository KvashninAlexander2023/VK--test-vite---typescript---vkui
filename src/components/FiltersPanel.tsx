import { ChipsSelect, FormItem, FormLayoutGroup, Input } from '@vkontakte/vkui'
import { useUnit } from 'effector-react'
import type { ReactNode } from 'react'
import { $filters, filtersChanged } from '../common/model/filters'

const GENRE_OPTIONS = [
  { value: 'боевик', label: 'Боевик' },
  { value: 'драма', label: 'Драма' },
  { value: 'триллер', label: 'Триллер' },
  { value: 'криминал', label: 'Криминал' },
  { value: 'мультфильм', label: 'Мультфильм' },
  { value: 'история', label: 'История' },
]

type ChipsOption = {
  value: string
  label: string
}

export default function FiltersPanel() {
  const [filters] = useUnit([$filters])

  return (
    <FormLayoutGroup mode="horizontal">
      <FormItem top="Жанры">
        <ChipsSelect
          value={filters.genres.map((g) => ({ value: g, label: g }))}
          options={GENRE_OPTIONS}
          onChange={(items: ChipsOption[]) =>
            filtersChanged({ genres: items.map((item) => item.value) })
          }
          placeholder="Выберите жанры"
        />
      </FormItem>

      <FormItem top="Рейтинг от / до">
        <FlexRow>
          <Input
            type="number"
            min={0}
            max={10}
            value={String(filters.ratingFrom)}
            onChange={(e) =>
              filtersChanged({ ratingFrom: Number(e.target.value) || 0 })
            }
          />
          <Input
            type="number"
            min={0}
            max={10}
            value={String(filters.ratingTo)}
            onChange={(e) =>
              filtersChanged({ ratingTo: Number(e.target.value) || 10 })
            }
          />
        </FlexRow>
      </FormItem>

      <FormItem top="Год от / до">
        <FlexRow>
          <Input
            type="number"
            min={1990}
            value={String(filters.yearFrom)}
            onChange={(e) =>
              filtersChanged({ yearFrom: Number(e.target.value) || 1990 })
            }
          />
          <Input
            type="number"
            min={1990}
            value={String(filters.yearTo)}
            onChange={(e) =>
              filtersChanged({ yearTo: Number(e.target.value) || filters.yearFrom })
            }
          />
        </FlexRow>
      </FormItem>
    </FormLayoutGroup>
  )
}

function FlexRow({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', gap: 8 }}>{children}</div>
}

