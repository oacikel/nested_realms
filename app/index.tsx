// app/index.tsx
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { View, Button, Text, FlatList } from 'react-native'
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
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
      }}
    >
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

      <FlatList
        data={worlds}
        keyExtractor={(world: World) => world.id.toString()}
        contentContainerStyle={{
          marginTop: 24,
          width: '100%',
          alignItems: 'center',
        }}
        renderItem={({ item: world }) => (
          <View
            style={{
              width: '85%',
              padding: 16,
              marginBottom: 16,
              backgroundColor: '#fff',
              borderRadius: 12,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 4,
              }}
            >
              🌌 {world.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#777',
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              {world.description}
            </Text>
            <Button
              title="🚀 Discover World"
              color="#007bff"
              onPress={() => handleSelectWorldClick(world)}
            />
          </View>
        )}
      />
    </View>
  )
}
