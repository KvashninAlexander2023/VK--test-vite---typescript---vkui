import { Icon48PictureOutline } from '@vkontakte/icons'
import { Flex, Subhead } from '@vkontakte/vkui'

type EarpieceProps = {
  title?: string
  height?: number
}

export function Earpiece({ title = 'Постер отсутствует', height = 360 }: EarpieceProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{
        width: '100%',
        height,
        background: 'var(--vkui--color_background_secondary)',
        color: 'var(--vkui--color_text_secondary)',
      }}
    >
      <Icon48PictureOutline />
      <Subhead style={{ marginTop: 8 }}>{title}</Subhead>
    </Flex>
  )
}

