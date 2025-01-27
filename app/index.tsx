// app/index.tsx
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { Button, Text } from 'react-native'
import { navigateToCreateNewWorld } from '@/redux/slices/navigationSlice'
import { paths } from '@/constants/pathNames'
import { useEffect } from 'react'
import { requestExistingWorlds, selectWorld } from '@/redux/slices/worldSlice'
import { getAllWorlds } from '@/redux/selectors/worldSelectors'
import { World } from '@/types/types'
import WorldList from '@/components/lists/worldList'
import { ContainerColumn } from '@/assets/styles/globalStyles'

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
    <ContainerColumn>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 16,
          color: '#333',
        }}
      >
        🏠 Home Page
      </Text>

      <Button
        title="🌍 Create A New World"
        color="#28a745"
        onPress={handleNewWorldButtonClick}
      />

      <Text style={{ fontSize: 18, color: '#555', marginTop: 16 }}>
        ...or start discovering an existing world!
      </Text>
      <WorldList
        worlds={worlds}
        handleSelectWorldClick={handleSelectWorldClick}
      />
    </ContainerColumn>
  )
}
