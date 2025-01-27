import { ContainerColumn } from '@/assets/styles/globalStyles'
import { World } from '@/types/types'
import React from 'react'
import { FlatList } from 'react-native'
import WorldItem from './worldItem'

interface WorldListProps {
  worlds: World[]
  handleSelectWorldClick: (world: World) => void
}

const WorldList: React.FC<WorldListProps> = ({
  worlds,
  handleSelectWorldClick,
}) => {
  return (
    <ContainerColumn>
      <FlatList
        data={worlds}
        keyExtractor={(world: World) => world.id.toString()}
        renderItem={({ item: world }) => (
          <WorldItem
            world={world}
            handleSelectWorldClick={handleSelectWorldClick}
          />
        )}
      />
    </ContainerColumn>
  )
}

export default WorldList
