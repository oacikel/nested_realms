// /app/worlds/[worldId].tsx
import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getWorldById } from '@/redux/selectors/worldSelectors'
import { RootState } from '@/redux/store'
import { Button, Text, View } from 'react-native'
import { paths } from '@/constants/pathNames'
import { EntityLite } from '@/types/types'
import { setEntityLiteOfInterest } from '@/redux/slices/entitiesSlice'

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

  const handleEntityButtonPress = (entityLite: EntityLite) => {
    dispatch(setEntityLiteOfInterest(entityLite))
    router.push(paths.entityDetail)
  }
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{world.name}</Text>
      <Text>{world.description}</Text>
      <Text style={{ marginVertical: 8 }}>
        Created At: {new Date(world.createdAt).toLocaleDateString()}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Entities:</Text>
      {world.entityIds && world.entityIds.length > 0 ? (
        <View>
          {world.entityIds.map((entity) => (
            <View key={entity.id} style={{ marginBottom: 10 }}>
              <Text>{entity.name}</Text>
              <Button
                title="Enter Entity"
                onPress={() => {
                  handleEntityButtonPress(entity)
                }}
              />
            </View>
          ))}
        </View>
      ) : (
        <Text>No entities found for this world.</Text>
      )}
    </View>
  )
}

export default WorldDetail
