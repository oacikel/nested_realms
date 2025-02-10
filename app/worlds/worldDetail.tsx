// /app/worlds/[worldId].tsx
import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getWorldById } from '@/redux/selectors/worldSelectors'
import { Button, Text, View } from 'react-native'
import { paths } from '@/constants/pathNames'
import { Entity, EntityLite, EntityRequest } from '@/types/types'
import {
  requestCreateChildEntity,
  setEntityLiteOfInterest,
} from '@/redux/slices/entitiesSlice'
import EntityCreationForm from '@/components/forms/EntityCreationForm'
import { getFocusedEntity } from '@/redux/selectors/entitySelectors'
import TinyEntityList from '@/components/lists/tinyEntityList'

const WorldDetail = () => {
  const { worldId } = useLocalSearchParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [topLevelEntities, setTopLevelEntities] = useState<Entity[] | null>([])

  const [showChildForm, setShowChildForm] = useState(false)
  const focusedEntity = useSelector(getFocusedEntity)

  const world = useSelector(getWorldById(worldId as string))

  const onCreateEntityPress = (entity: EntityRequest) => {
    entity.parentId = focusedEntity?.id || null
    dispatch(requestCreateChildEntity(entity))
  }

  useEffect(() => {
    if (world && world.topLevelEntities) {
      setTopLevelEntities(world.topLevelEntities as Entity[])
    } else {
      setTopLevelEntities(null)
    }
  }, [world])

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

      {topLevelEntities && topLevelEntities.length > 0 ? (
        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
          {topLevelEntities.map((entity) => (
            <View
              key={entity.id}
              style={{
                padding: 12,
                backgroundColor: '#fff',
                borderRadius: 8,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
                width: '100%',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
                🏗️ {entity.name}
              </Text>
              <Button
                title="🔍 Enter Entity"
                color="#007bff99"
                onPress={() => handleEntityButtonPress(entity)}
              />
            </View>
          ))}
        </View>
      ) : (
        <Text style={{ fontSize: 16, color: '#777' }}>
          ⚠️ No entities found for this world.
        </Text>
      )}
      <TinyEntityList entities={topLevelEntities || []} />
      <Button
        title="➕ Add Child Entity"
        color="#007bff"
        onPress={() => setShowChildForm(true)}
      />

      {showChildForm && (
        <View
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: '#fff',
            borderRadius: 8,
          }}
        >
          <EntityCreationForm
            onCreateEntityPress={onCreateEntityPress}
            worldId={worldId as string}
            parentId={null} // Since this is on world creation page. There is no upper parent entity.
          />
        </View>
      )}
    </View>
  )
}

export default WorldDetail
