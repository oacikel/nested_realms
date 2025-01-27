import {
  ListButtonsContainer,
  PrimaryButton,
  WorldContainer,
  WorldDescription,
  WorldName,
} from '@/assets/styles/globalStyles'
import { World } from '@/types/types'
import React from 'react'
import { Text } from 'react-native'

interface WorldItemProps {
  world: World
  handleSelectWorldClick: (world: World) => void
}

const WorldItem: React.FC<WorldItemProps> = ({
  world,
  handleSelectWorldClick,
}) => {
  return (
    <WorldContainer>
      <WorldName>{world.name}</WorldName>
      <WorldDescription>{world.description}</WorldDescription>
      <ListButtonsContainer>
        <PrimaryButton onClick={() => handleSelectWorldClick(world)}>
          <Text>?</Text>
          <Text>Discover World</Text>
        </PrimaryButton>
      </ListButtonsContainer>
    </WorldContainer>
  )
}

export default WorldItem
