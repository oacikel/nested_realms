import { WorldCreationFormContainer } from '@/assets/styles/globalStyles'
import WorldCreationForm from '@/components/forms/WorldCreationForm'
import { paths } from '@/constants/pathNames'
import { navigateToHome } from '@/redux/slices/navigationSlice'
import { requestAddWorld } from '@/redux/slices/worldSlice'
import { WorldRequest } from '@/types/types'
import { router } from 'expo-router'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function createNewWorld() {
  const dispatch = useDispatch()

  const handleSubmit = (newWorld: WorldRequest) => {
    console.log('Hello!')
    console.log('World is ', JSON.stringify(newWorld))
    dispatch(requestAddWorld(newWorld))
    dispatch(navigateToHome())
    router.push(paths.home)
  }

  return (
    <WorldCreationFormContainer>
      <WorldCreationForm onCreateWorldPress={handleSubmit}></WorldCreationForm>
    </WorldCreationFormContainer>
  )
}
