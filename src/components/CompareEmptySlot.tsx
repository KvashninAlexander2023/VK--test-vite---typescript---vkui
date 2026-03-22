// components/CompareEmptySlot.tsx
import { Card, Text, Button } from '@vkontakte/vkui'
import { useNavigate } from 'react-router-dom'

export const CompareEmptySlot = () => {
  const navigate = useNavigate()
  
  return (
    <Card mode="outline" style={{ 
      flex: 1, 
      minWidth: 280,
      maxWidth: 360,
      minHeight: 360,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <Text style={{ marginBottom: 16 }}>
        📭 Нет фильма для сравнения
      </Text>
      <Button onClick={() => navigate('/')}>
        Выбрать фильм
      </Button>
    </Card>
  )
}