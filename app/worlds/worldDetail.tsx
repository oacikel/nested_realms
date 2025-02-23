// /app/worlds/[worldId].tsx
import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getWorldById } from '@/redux/selectors/worldSelectors'
import { View } from 'react-native'
import { Entity, EntityRequest } from '@/types/types'
import {
  clearState,
  requestCreateChildEntity,
} from '@/redux/slices/entitiesSlice'
import EntityCreationForm from '@/components/forms/EntityCreationForm'
import TinyEntityList from '@/components/lists/tinyEntityList'
import {
  PrimaryButton,
  WorldDetailContainer,
  WorldDetailDescription,
  WorldDetailTitle,
} from '@/assets/styles/globalStyles'
import { selectWorld } from '@/redux/slices/worldSlice'

const WorldDetail = () => {
  const { worldId } = useLocalSearchParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [topLevelEntities, setTopLevelEntities] = useState<Entity[] | null>([])

  const [showChildForm, setShowChildForm] = useState(false)

  const world = useSelector(getWorldById(worldId as string))

  const onCreateEntityPress = (entity: EntityRequest) => {
    dispatch(requestCreateChildEntity(entity))
  }

  useEffect(() => {
    if (world) {
      dispatch(selectWorld(world))
    }
    dispatch(clearState())
  }, [world])

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

  return (
    <WorldDetailContainer>
      <WorldDetailTitle>{world.name}</WorldDetailTitle>
      <WorldDetailDescription>{world.description}</WorldDetailDescription>
      <TinyEntityList entities={topLevelEntities || []} />

      {showChildForm && (
        <View>
          <EntityCreationForm
            onCreateEntityPress={onCreateEntityPress}
            worldId={worldId as string}
            parentId={null} // Since this is on world creation page. There is no upper parent entity.
          />
        </View>
      )}
      <PrimaryButton onClick={() => setShowChildForm(!showChildForm)}>
        <span>+</span>
        <span>Add Child Entity</span>
      </PrimaryButton>
    </WorldDetailContainer>
  )
}

export default WorldDetail
