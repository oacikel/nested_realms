// app/index.tsx
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { View, Button } from 'react-native'
import { navigateTocreateNewWorld } from '@/redux/slices/navigationSlice'
import { paths } from '@/constants/pathNames'
import React from 'react'
import WorldList from '@/components/lists/worldList'
import {
  ListButtonsContainer,
  PrimaryButton,
} from '@/assets/styles/globalStyles'
import { colors } from '@/assets/colors'
import { getWorldsToDisplay } from '@/redux/selectors/worldSelectors'

export default function HomePage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const worlds = useSelector(getWorldsToDisplay)

  const handleNewWorldButtonClick = () => {
    dispatch(navigateTocreateNewWorld())
    router.push(paths.createWorld)
  }

  const handleLoginButtonClick = () => {
    router.push(paths.login)
  }

  const handleRegisterButtonClick = () => {
    router.push(paths.register)
  }

  return (
    <View style={{ height: '100%', backgroundColor: colors.primary }}>
      <ListButtonsContainer style={{ paddingTop: 20 }}>
        <PrimaryButton onClick={handleLoginButtonClick}>Login</PrimaryButton>|
        <PrimaryButton onClick={handleRegisterButtonClick}>
          Register
        </PrimaryButton>
      </ListButtonsContainer>
      <WorldList worlds={worlds} />
      <Button title="Create A New World" onPress={handleNewWorldButtonClick} />
    </View>
  )
}
