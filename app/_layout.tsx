/* eslint-disable @typescript-eslint/no-require-imports */
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import NotoSans from 'assets/fonts/SpaceMono-Regular.ttf'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    NotoSans,
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
    if (error) {
      console.log(error)
    }
  }, [loaded, error])

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  )
}
