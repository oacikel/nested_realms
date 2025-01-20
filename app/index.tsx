// app/index.tsx
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { View, Button, Text } from 'react-native'
import { navigateToCreateNewWorld } from '@/redux/slices/navigationSlice'
import { paths } from '@/constants/pathNames'
import { useEffect } from 'react'
import { requestExistingWorlds } from '@/redux/slices/worldSlice'
import { getAllWorlds } from '@/redux/selectors/worldSelectors'

export default function HomePage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const worlds = useSelector(getAllWorlds)

  useEffect(() => {
    dispatch(requestExistingWorlds())
  }, [])

  const handleNewWorldButtonClick = () => {
    dispatch(navigateToCreateNewWorld())
    router.push(paths.createWorld)
  }

  return (
    <View>
      <Text>Home Page</Text>
      <Button title="Create A New World" onPress={handleNewWorldButtonClick} />
      <Text>...or start discovering an existing world!</Text>
      {worlds.map((world) => (
        <View key={world.id}>
          <Text>{world.name}</Text>
          <Text>{world.description}</Text>
          <Button
            title="Enter World"
            onPress={() => {
              router.push(`${paths.world}?worldId=${world.id}`)
            }}
          />
        </View>
      ))}
    </View>
  )
}
