import { EntityRequest } from '@/types/types'
import React, { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'

interface EntityCreationParams {
  onCreateEntityPress: (entity: EntityRequest) => void
}

const EntityCreationForm: React.FC<EntityCreationParams> = ({
  onCreateEntityPress,
}) => {
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAddChildEntity = () => {
    if (!name || !description) {
      setError('Please enter a name and description')
      return
    }
    const newEntity: EntityRequest = {
      name: name,
      description: description,
      createdAt: new Date(),
    }
    onCreateEntityPress(newEntity)
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
