import { Alert } from '@vkontakte/vkui'
import type { PoiskkinoDoc } from '../common/api/poiskkino.types'

type ConfirmFavoriteModalProps = {
  film: PoiskkinoDoc | null
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmFavoriteModal({
  film,
  onConfirm,
  onCancel,
}: ConfirmFavoriteModalProps) {
  if (!film) return null

  const title =
    film.name ?? film.alternativeName ?? film.names?.[0]?.name ?? 'Без названия'

  return (
    <Alert
      title="Добавить в избранное?"
      description={`Вы хотите добавить «${title}» в список избранного?`}
      onClose={onCancel}
      actions={[
        {
          title: 'Отмена',
          mode: 'cancel',
          action: onCancel,
          autoCloseDisabled: true,
        },
        {
          title: 'Добавить',
          mode: 'default',
          action: onConfirm,
          autoCloseDisabled: true,
        },
      ]}
      actionsLayout="horizontal"
    />
  )
}
