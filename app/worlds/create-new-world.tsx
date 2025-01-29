import dimensions from '@/assets/dimensions'
import {
  ContainerColumn,
  HorizontalDivider,
  ListButtonsContainer,
  PrimaryButton,
  StyledInput,
} from '@/assets/styles/globalStyles'
import EntityCreationForm from '@/components/forms/EntityCreationForm'
import TinyEntityList from '@/components/lists/tinyEntityList'
import { paths } from '@/constants/pathNames'
import { navigateToHome } from '@/redux/slices/navigationSlice'
import { requestAddWorld } from '@/redux/slices/worldSlice'
import { AddWorldPayload, EntityRequest, WorldRequest } from '@/types/types'
import { router } from 'expo-router'
import React, { ChangeEvent, useState } from 'react'
import { Text } from 'react-native'
import { useDispatch } from 'react-redux'

export default function CreateNewWorld() {
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [showChildForm, setShowChildForm] = useState(false)
  const [childEntities, setChildEntities] = useState<EntityRequest[]>([])
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch()

  const handleNameChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value)
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  const handleAddChildEntity = (childEntity: EntityRequest) => {
    setChildEntities([...childEntities, childEntity])
    setShowChildForm(false)
  }

  const handleSubmit = () => {
    if (!name || !description) {
      setError('Please enter a name and description')
      return
    }
    const newWorld: WorldRequest = {
      name,
      description,
      createdAt: new Date(),
    }

    const payload: AddWorldPayload = {
      worldRequest: newWorld,
      entityRequests: childEntities,
    }
    dispatch(requestAddWorld(payload))
    dispatch(navigateToHome())
    router.push(paths.home)
  }

  return (
    <ContainerColumn
      style={{ padding: dimensions.marginMedium, gap: dimensions.marginMedium }}
    >
      <StyledInput
        placeholder="Give a name to your world"
        value={name || ''}
        onChange={handleNameChange}
      />
      <StyledInput
        style={{ height: 130 }}
        placeholder="Briefly describe your world"
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      {showChildForm && (
        <EntityCreationForm
          onCreateEntityPress={handleAddChildEntity}
          isTopLevel={true}
        />
      )}
      <ListButtonsContainer>
        <TinyEntityList
          entities={childEntities}
          firstView={
            !showChildForm && (
              <PrimaryButton
                style={{ height: '100%' }}
                onClick={() => setShowChildForm(true)}
              >
                <Text>+</Text>
                <Text>Add Child</Text>
              </PrimaryButton>
            )
          }
        />
      </ListButtonsContainer>

      {error && <Text>{error}</Text>}
      <HorizontalDivider />
      <PrimaryButton onClick={handleSubmit}>
        <Text>Create World</Text>
      </PrimaryButton>
    </ContainerColumn>
  )
}
