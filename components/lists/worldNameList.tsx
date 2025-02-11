import { paths } from '@/constants/pathNames'
import { selectWorld } from '@/redux/slices/worldSlice'
import { World } from '@/types/types'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, View, Text, Button, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

interface WorldListProps {
  worlds: World[]
}

const WorldList: React.FC<WorldListProps> = ({ worlds }) => {
  const dispatch = useDispatch()

  const handleSelectWorldClick = (world: World) => {
    dispatch(selectWorld(world))
    router.push(`${paths.world}?worldId=${world.id}`)
  }

  return (
    <FlatList
      data={worlds}
      keyExtractor={(world: World) => world.id.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item: world }) => (
        <View style={styles.worldContainer}>
          <Text style={styles.worldName}>🌌 {world.name}</Text>
          <Text style={styles.worldDescription}>{world.description}</Text>
          <Button
            title="🚀 Discover World"
            color="#007bff"
            onPress={() => handleSelectWorldClick(world)}
          />
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  worldContainer: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  worldName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  worldDescription: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 8,
  },
})

export default WorldList
