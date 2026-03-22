import { ChipsSelect, FormItem, FormLayoutGroup, Input } from '@vkontakte/vkui'
import { useUnit } from 'effector-react'
import type { ReactNode } from 'react'
import { $filters, filtersChanged } from '../common/model/filters'
import { $filmsPending } from '../common/model/films'
import { transformGenresToSelectOptions } from '../common/utilites/genreHelpers'
import { $genres, $genresLoading } from '../common/model/genres'


type ChipsOption = {
  value: string
  label: string
}

// TODO доработать рейтинг, вынести типы, заменить flexRow на vkui

export default function FiltersPanel() {

  const [filters, filmsPending] = useUnit([$filters, $filmsPending])
  const [genres, genresLoading] = useUnit([$genres, $genresLoading])

  const genresOptions = transformGenresToSelectOptions(genres)

  return (
    <FormLayoutGroup mode="horizontal">
      <FormItem top="Жанры">
        <ChipsSelect
          disabled={filmsPending || genresLoading}
          value={filters.genres.map((g) => ({ value: g, label: g }))}
          options={genresOptions}
          onChange={(items: ChipsOption[]) =>
            filtersChanged({ genres: items.map((item) => item.value) })
          }
          placeholder="Выберите жанры"
        />
      </FormItem>

      <FormItem top="Рейтинг от / до">
        <FlexRow >
          <Input
            disabled={filmsPending}
            type="number"
            min={0}
            max={10}
            value={String(filters.ratingFrom)}
            onChange={(e) =>
              filtersChanged({ ratingFrom: Number(e.target.value) || 0 })
            }
          />
          <Input
            disabled={filmsPending}
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
            disabled={filmsPending}
            type="number"
            min={1990}
            value={String(filters.yearFrom)}
            onChange={(e) =>
              filtersChanged({ yearFrom: Number(e.target.value) || 1990 })
            }
          />
          <Input
            disabled={filmsPending}
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

