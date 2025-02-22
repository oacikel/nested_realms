import { StyledInput } from '@/assets/styles/globalStyles'
import {
  getChildrenEntities,
  getParentEntity,
} from '@/redux/selectors/entitySelectors'
import { getUser } from '@/redux/selectors/userSelector'
import { getWorldById } from '@/redux/selectors/worldSelectors'
import { requestAIAssist } from '@/redux/slices/entitiesSlice'
import { EntityRequest, EntitySuggestionRequest, World } from '@/types/types'
import React, { useEffect, useState } from 'react'
import { View, Button, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

interface EntityCreationParams {
  worldId: string
  onCreateEntityPress: (entity: EntityRequest) => void
  parentId: string | null
}

const EntityCreationForm: React.FC<EntityCreationParams> = ({
  worldId,
  onCreateEntityPress,
  parentId,
}) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)

  const world = useSelector(getWorldById(worldId)) as World
  const { name: worldName, description: worldDescription } = world
  const parent = useSelector(getParentEntity)
  const { name: parentName, description: parentDescription } = parent || {}

  const children = useSelector(getChildrenEntities)
  const childrenNames = children?.map((child) => child.name) || []

  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [numberOfSuggestions, setNumberOfSuggestions] = useState<number>(1)
  const [additionalInfo, setAdditionalInfo] = useState<string | null>(null)

  const [aiPromptRequest, setAiPromptRequest] =
    useState<EntitySuggestionRequest>()

  useEffect(() => {
    const promptRequest: EntitySuggestionRequest = {
      parentName: parentName || worldName,
      description: parentDescription || worldDescription,
      existingChildren: childrenNames || [],
      additionalInfo: additionalInfo || '',
      numChildren: numberOfSuggestions,
    }

    setAiPromptRequest(promptRequest)
  }, [parentName, children, additionalInfo, numberOfSuggestions])

  const handleAddChildEntity = () => {
    if (!name) {
      setError('Please enter a name')
      return
    }
    if (!user) {
      setError('You must be logged in to create an entity')
      return
    }
    const entityRequest: EntityRequest = {
      worldId,
      creatorId: user.id,
      creatorUserName: user.userName,
      name: name,
      description: description || '',
      createdAt: new Date(),
      parentId,
    }
    onCreateEntityPress(entityRequest)
  }

  const handleAIAssistRequest = () => {
    setError(
      'This feature is being developed and is not yet ready for production. You will have to rely on your own creativity for now. :(',
    )
    return
    if (aiPromptRequest) {
      // Uncomment the line below when the feature is ready for production
      // dispatch(requestAIAssist(aiPromptRequest))
    }
  }

  return (
    <View style={{ marginBottom: 20, gap: 20 }}>
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
      <Button title="Add Entity" onPress={handleAddChildEntity} />
      NOT FOR PRODUCTION! or use AI to get suggestions how exciting!!!!
      <StyledInput
        placeholder="How many children should I suggest?"
        value={numberOfSuggestions || ''}
        inputMode="numeric"
        onChange={(e) => setNumberOfSuggestions(Number(e.target.value))}
      />
      <StyledInput
        placeholder="Any specific info we should consider?"
        value={additionalInfo || ''}
        onChange={(e) => setAdditionalInfo(e.target.value)}
      />
      <Button title="Generate Suggestions" onPress={handleAIAssistRequest} />
    </View>
  )
}

export default EntityCreationForm
