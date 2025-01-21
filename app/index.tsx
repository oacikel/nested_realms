// app/index.tsx
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { View, Button, Text } from 'react-native'
import { navigateToCreateNewWorld } from '@/redux/slices/navigationSlice'
import { paths } from '@/constants/pathNames'
import { useEffect } from 'react'
import { requestExistingWorlds, selectWorld } from '@/redux/slices/worldSlice'
import { getAllWorlds } from '@/redux/selectors/worldSelectors'
import { World } from '@/types/types'

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

  const handleSelectWorldClick = (world: World) => {
    dispatch(selectWorld(world))
    router.push(`${paths.world}?worldId=${world.id}`)
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
              handleSelectWorldClick(world)
            }}
          />
        </View>
      ))}
    </View>
  )
}
