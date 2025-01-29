import {
  ContainerColumn,
  HorizontalDivider,
  ListButtonsContainer,
  PrimaryButton,
  StyledInput,
} from '@/assets/styles/globalStyles'
import { EntityRequest } from '@/types/types'
import React, { useState } from 'react'
import { Text } from 'react-native'

interface EntityCreationParams {
  onCreateEntityPress: (entity: EntityRequest) => void
  isTopLevel: boolean
}

/**
 * Form for creating a new entity
 * @param onCreateEntityPress - function to call when the user submits the form
 * @param isTopLevel - This is true if the entity does not have a parent
 */

const EntityCreationForm: React.FC<EntityCreationParams> = ({
  onCreateEntityPress,
  isTopLevel,
}) => {
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAddChildEntity = () => {
    // For dev purposes we'll create a random entity at each click
    /*
    const randomEntity: EntityRequest = {
      name: 'Random Entity ' + Math.floor(Math.random() * 100),
      description: 'Random Description ' + Math.floor(Math.random() * 100),
      createdAt: new Date(),
      isTopLevel: isTopLevel,
    }
    onCreateEntityPress(randomEntity)
    return
    */

    if (!name || !description) {
      setError('Please enter a name and description')
      return
    }
    const newEntity: EntityRequest = {
      name: name,
      description: description,
      createdAt: new Date(),
      isTopLevel: isTopLevel,
    }
    onCreateEntityPress(newEntity)
  }

  return (
    <ContainerColumn style={{ gap: 16, margin: 16 }}>
      <HorizontalDivider />
      <StyledInput
        placeholder="Enter Entity Name"
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
      />
      <StyledInput
        placeholder="Enter entity description"
        value={description || ''}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && <Text>{error}</Text>}
      <ListButtonsContainer>
        <PrimaryButton onClick={handleAddChildEntity}>
          <Text>Add Entity</Text>
        </PrimaryButton>
      </ListButtonsContainer>
      <HorizontalDivider />
    </ContainerColumn>
  )
}

export default EntityCreationForm
