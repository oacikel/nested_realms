import {
  LabelText,
  ListButtonsContainer,
  StyledForm,
  StyledInput,
} from '@/assets/styles/globalStyles'
import { getUser } from '@/redux/selectors/userSelector'
import { WorldRequest } from '@/types/types'
import { Checkbox } from '@mui/material'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Button, Text } from 'react-native'
import { useSelector } from 'react-redux'

interface WorldCreationFormParams {
  onCreateWorldPress: (entity: WorldRequest) => void
}

const WorldCreationForm: React.FC<WorldCreationFormParams> = ({
  onCreateWorldPress,
}) => {
  const user = useSelector(getUser)

  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [canOthersAddChildren, setCanOthersAddChildren] =
    useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!name || !description) {
      setError('Please enter a name and description')
      return
    }
    if (!user) {
      setError('You must be logged in to create a world')
      router.back()
      return
    }
    const newWorld: WorldRequest = {
      creatorId: user.id,
      creatorUserName: user.userName,
      name,
      description,
      createdAt: new Date(),
      isPrivate: isPrivate,
      canOthersAddChildren: canOthersAddChildren,
    }

    onCreateWorldPress(newWorld)
  }

  return (
    <StyledForm>
      <StyledInput
        placeholder="Enter World Name"
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
      />
      <StyledInput
        minRows={5}
        placeholder="Enter World description"
        value={description || ''}
        onChange={(e) => setDescription(e.target.value)}
      />
      <ListButtonsContainer style={{ justifyContent: 'flex-start' }}>
        <Checkbox
          value={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        <LabelText style={{ marginTop: 10 }}>Make World Private</LabelText>
      </ListButtonsContainer>
      <ListButtonsContainer style={{ justifyContent: 'flex-start' }}>
        <Checkbox
          value={canOthersAddChildren}
          onChange={(e) => setCanOthersAddChildren(e.target.checked)}
        />
        <LabelText style={{ marginTop: 10 }}>Let others add children</LabelText>
      </ListButtonsContainer>
      {error && <Text>{error}</Text>}
      <Button title="Create World" onPress={handleSubmit} />
    </StyledForm>
  )
}

export default WorldCreationForm
