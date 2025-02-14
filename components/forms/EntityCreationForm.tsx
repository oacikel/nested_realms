import { EntityRequest } from '@/types/types'
import React, { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'

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
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAddChildEntity = () => {
    if (!name) {
      setError('Please enter a name')
      return
    }
    const entityRequest: EntityRequest = {
      worldId,
      name: name,
      description: description || '',
      createdAt: new Date(),
      parentId,
    }
    onCreateEntityPress(entityRequest)
  }

  return (
    <View style={{ marginBottom: 20 }}>
      <TextInput
        placeholder="Enter Entity Name"
        value={name || ''}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Enter entity description"
        value={description || ''}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      {error && <Text>{error}</Text>}
      <Button title="Add Entity" onPress={handleAddChildEntity} />
    </View>
  )
}

export default EntityCreationForm
