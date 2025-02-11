import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  getChildrenEntities,
  getEntityLiteOfInterest,
  getFocusedEntity,
  getParentEntity,
} from '@/redux/selectors/entitySelectors'
import {
  requestCreateChildEntity,
  requestFocusedEntity,
  setEntityLiteOfInterest,
} from '@/redux/slices/entitiesSlice'
import EntityCreationForm from '@/components/forms/EntityCreationForm'
import { Entity, EntityRequest, World } from '@/types/types'
import TinyEntityList from '@/components/lists/tinyEntityList'
import {
  EntityDetailContainer,
  EntityDetailWorldName,
  EntityDetailDescription,
  PrimaryButton,
  EntityDetailName,
  EntityDetailTopBannerContainer,
  EntityDetailParentName,
  EntityDetailParentButton,
  EntityDetailWorldButton,
} from '@/assets/styles/globalStyles'
import { getSelectedWorld } from '@/redux/selectors/worldSelectors'
import { paths } from '@/constants/pathNames'
import { router } from 'expo-router'
import { convertToEntityLite } from '../utils/entityUtils'
import { selectWorld } from '@/redux/slices/worldSlice'

const EntityDetail = () => {
  const dispatch = useDispatch()

  const focusedEntity = useSelector(getFocusedEntity)
  const parentEntity = useSelector(getParentEntity)
  const entityLiteOfInterest = useSelector(getEntityLiteOfInterest)
  const childrenEntities = useSelector(getChildrenEntities)
  const selectedWorld = useSelector(getSelectedWorld)

  const [showChildForm, setShowChildForm] = React.useState(false)

  const onCreateEntityPress = (entity: EntityRequest) => {
    if (!focusedEntity) {
      throw new Error('Focused entity is not set')
      return
    }
    entity.parentId = focusedEntity.id
    dispatch(requestCreateChildEntity(entity))
  }

  const onParentEntityPressed = (entity: Entity) => {
    const entityLite = convertToEntityLite(entity)
    dispatch(setEntityLiteOfInterest(entityLite))
    router.push(paths.entityDetail)
  }

  const onWorldPressed = (world: World) => {
    dispatch(selectWorld(world))
    router.push(`${paths.world}?worldId=${world.id}`)
  }

  useEffect(() => {
    if (entityLiteOfInterest) {
      dispatch(requestFocusedEntity(entityLiteOfInterest))
    }
  }, [entityLiteOfInterest])

  if (!focusedEntity) {
    return (
      <View>
        <Text>Loading Entity...</Text>
      </View>
    )
  }

  return (
    <EntityDetailContainer>
      <EntityDetailTopBannerContainer>
        <EntityDetailWorldButton onClick={() => onWorldPressed(selectedWorld!)}>
          <EntityDetailWorldName>{selectedWorld?.name}</EntityDetailWorldName>
        </EntityDetailWorldButton>
        {parentEntity && (
          <EntityDetailParentButton
            onClick={() => onParentEntityPressed(parentEntity)}
          >
            <EntityDetailParentName>
              {parentEntity?.name}
            </EntityDetailParentName>
          </EntityDetailParentButton>
        )}
      </EntityDetailTopBannerContainer>
      <EntityDetailName>{focusedEntity.name}</EntityDetailName>
      <EntityDetailDescription>
        {focusedEntity.description}
      </EntityDetailDescription>
      <View>
        {childrenEntities && <TinyEntityList entities={childrenEntities} />}
      </View>
      {showChildForm && (
        <View>
          <EntityCreationForm
            onCreateEntityPress={onCreateEntityPress}
            worldId={focusedEntity.worldId as string}
            parentId={focusedEntity.id} // Since this is on world creation page. There is no upper parent entity.
          />
        </View>
      )}
      <PrimaryButton onClick={() => setShowChildForm(!showChildForm)}>
        <span>+</span>
        <span>Add Child Entity</span>
      </PrimaryButton>
    </EntityDetailContainer>
  )
}

export default EntityDetail
