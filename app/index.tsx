// app/index.tsx
import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import { View, Button, Text } from 'react-native'
import { navigateToCreateNewWorld } from '@/redux/slices/navigationSlice'
import { paths } from '@/constants/pathNames'

export default function HomePage() {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleNewWorldButtonClick = () => {
    dispatch(navigateToCreateNewWorld())
    router.push(paths.createWorld)
  }

  return (
    <View>
      <Text>Home Page</Text>
      <Button title="Create A New World" onPress={handleNewWorldButtonClick} />
    </View>
  )
}
