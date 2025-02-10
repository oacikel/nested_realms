import { paths } from '@/constants/pathNames'
import { navigateToHome } from '@/redux/slices/navigationSlice'
import { requestAddWorld } from '@/redux/slices/worldSlice'
import { WorldRequest } from '@/types/types'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { useDispatch } from 'react-redux'

export default function CreateNewWorld() {
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch()

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

    dispatch(requestAddWorld(newWorld))
    dispatch(navigateToHome())
    router.push(paths.home)
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

      {error && <Text>{error}</Text>}
      <Button title="Create World" onPress={handleSubmit} />
    </View>
  )
}
