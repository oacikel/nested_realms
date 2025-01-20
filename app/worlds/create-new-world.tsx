import EntityCreationForm from '@/components/forms/EntityCreationForm'
import TinyEntityList from '@/components/lists/tinyEntityList'
import { requestAddWorld } from '@/redux/slices/worldSlice'
import { AddWorldPayload, EntityRequest, WorldRequest } from '@/types/types'
import React, { useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

export default function CreateNewWorld() {
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [showChildForm, setShowChildForm] = useState(false)
  const [childEntities, setChildEntities] = useState<EntityRequest[]>([])
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch()

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
      entityIds: [],
      createdAt: new Date(),
    }

    const payload: AddWorldPayload = {
      worldRequest: newWorld,
      entityRequests: childEntities,
    }
    dispatch(requestAddWorld(payload))
  }

  return (
    <View>
      <Text>Create a New World</Text>
      <TextInput
        placeholder="Enter world name"
        value={name || ''}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Enter world description"
        value={description || ''}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            padding: 10,
            marginBottom: 10,
            alignItems: 'center',
          }}
          onPress={() => setShowChildForm(true)}
        >
          <Text style={{ color: 'white' }}>Add a Child Entity</Text>
        </TouchableOpacity>

        {showChildForm && (
          <EntityCreationForm onCreateEntityPress={handleAddChildEntity} />
        )}

        <TinyEntityList entities={childEntities} />
      </>
      {error && <Text>{error}</Text>}
      <Button title="Create World" onPress={handleSubmit} />
    </View>
  )
}
