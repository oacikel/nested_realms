// app/index.tsx
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { View, Button } from 'react-native'
import { navigateToCreateNewWorld } from '@/redux/slices/navigationSlice'
import { paths } from '@/constants/pathNames'
import React from 'react'
import { getAllWorlds } from '@/redux/selectors/worldSelectors'
import WorldList from '@/components/lists/worldList'
import {
  ListButtonsContainer,
  PrimaryButton,
} from '@/assets/styles/globalStyles'
import { colors } from '@/assets/colors'

export default function HomePage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const worlds = useSelector(getAllWorlds)

  const handleNewWorldButtonClick = () => {
    dispatch(navigateToCreateNewWorld())
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
