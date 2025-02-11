// app/index.tsx
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { View, Button } from 'react-native'
import { navigateToCreateNewWorld } from '@/redux/slices/navigationSlice'
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_700Bold,
} from '@expo-google-fonts/noto-sans'
import { paths } from '@/constants/pathNames'
import AppLoading from 'expo-app-loading'
import React, { useEffect } from 'react'
import { requestExistingWorlds } from '@/redux/slices/worldSlice'
import { getAllWorlds } from '@/redux/selectors/worldSelectors'
import WorldList from '@/components/lists/worldList'

export default function HomePage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const worlds = useSelector(getAllWorlds)

  useEffect(() => {
    dispatch(requestExistingWorlds())
  }, [])

  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  const handleNewWorldButtonClick = () => {
    dispatch(navigateToCreateNewWorld())
    router.push(paths.createWorld)
  }

  return (
    <View style={{ height: '100%' }}>
      <WorldList worlds={worlds} />
      <Button title="Create A New World" onPress={handleNewWorldButtonClick} />
    </View>
  )
}
