// pages/ComparePage.tsx
import { useUnit } from 'effector-react'
import { $compareFilmsList, $compareCount, clearCompare } from '../common/model/compare'
import { CompareCard } from '../components/CompareCard'
import { Button, Flex, Text, Title } from '@vkontakte/vkui'
import { CompareEmptySlot } from '../components/CompareEmptySlot'
import styles from '../App.module.css'

export const ComparePage = () => {
  const [compareFilms, count] = useUnit([$compareFilmsList, $compareCount])
  
  return (
    <Flex direction="column" className={styles.layout} style={{marginTop: 100, padding: 30}}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <Title level="2">Сравнение фильмов</Title>
        <Flex gap={12} align="center">
          <Text>Выбрано: {count}/2</Text>
          {count > 0 && (
            <Button mode="tertiary" onClick={() => clearCompare()}>
              Очистить все
            </Button>
          )}
        </Flex>
      </Flex>
      
      <Flex gap={24} wrap="wrap" justify="center">
        {/* Первый фильм */}
        {compareFilms[0] ? (
          <CompareCard film={compareFilms[0]} index={0} />
        ) : (
          <CompareEmptySlot />
        )}
        
        {/* Второй фильм */}
        {compareFilms[1] ? (
          <CompareCard film={compareFilms[1]} index={1} />
        ) : (
          <CompareEmptySlot />
        )}
      </Flex>
    </Flex>
  )
}