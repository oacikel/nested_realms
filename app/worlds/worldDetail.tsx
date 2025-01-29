// /app/worlds/[worldId].tsx
import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getWorldById } from '@/redux/selectors/worldSelectors'
import { RootState } from '@/redux/store'
import { Text, View } from 'react-native'
import { paths } from '@/constants/pathNames'
import { Entity, EntityLite, EntityRequest } from '@/types/types'
import { setEntityLiteOfInterest } from '@/redux/slices/entitiesSlice'
import TinyEntityList from '@/components/lists/tinyEntityList'

const WorldDetail = () => {
  const { worldId } = useLocalSearchParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Using the selector to get the world by id from the Redux store
  const world = useSelector((state: RootState) =>
    getWorldById(state, worldId as string),
  )

  useEffect(() => {
    if (!worldId) return

    if (!world) {
      setLoading(true)
      setError('Loading world details...')
    } else {
      setLoading(false)
      setError(null)
    }
  }, [worldId, world])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!world) {
    return <div>World not found.</div>
  }

  const handleEntityButtonPress = (
    entity: EntityLite | EntityRequest | Entity,
  ) => {
    if ('id' in entity) {
      dispatch(setEntityLiteOfInterest(entity))
      router.push(paths.entityDetail)
    } else {
      console.error('Invalid entity type')
    }
  }
  return (
    <View style={{ padding: 16, backgroundColor: '#f8f9fa', borderRadius: 8 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 8,
          color: '#333',
        }}
      >
        🌍 {world.name}
      </Text>
      <Text style={{ fontSize: 16, color: '#555', marginBottom: 8 }}>
        {world.description}
      </Text>
      <Text style={{ fontSize: 14, color: '#777', marginBottom: 16 }}>
        📅 Created At: {new Date(world.createdAt).toLocaleDateString()}
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 8,
          color: '#333',
        }}
      >
        🏛️ Entities:
      </Text>

      {world.entityIds && world.entityIds.length > 0 ? (
        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
          <TinyEntityList
            entities={world.entityIds as Entity[]}
            onEntityPress={handleEntityButtonPress}
          />
        </View>
      ) : (
        <Text style={{ fontSize: 16, color: '#777' }}>
          ⚠️ No entities found for this world.
        </Text>
      )}
    </View>
  )
}

export default WorldDetail
