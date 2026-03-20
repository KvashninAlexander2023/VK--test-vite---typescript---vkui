import { Button, Flex, Modal, Text, Title } from '@vkontakte/vkui'
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
    <Modal
      open={!!film}
      onClose={onCancel}
      size="s"
      header={
        <Modal.Header>
          <Title level="3">Добавить в избранное?</Title>
        </Modal.Header>
      }
      footer={
        <Modal.Footer>
          <Flex gap={8} justify="end">
            <Button mode="secondary" onClick={onCancel}>
              Отмена
            </Button>
            <Button mode="primary" onClick={onConfirm}>
              Добавить
            </Button>
          </Flex>
        </Modal.Footer>
      }
    >
      <Text style={{ padding: '8px 0' }}>
        Вы хотите добавить «{title}» в список избранного?
      </Text>
    </Modal>
  )
}
