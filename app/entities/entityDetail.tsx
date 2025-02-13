import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  getChildrenEntities,
  getEntityLiteOfInterest,
  getFocusedEntity,
} from '@/redux/selectors/entitySelectors'
import {
  requestCreateChildEntity,
  requestFocusedEntity,
} from '@/redux/slices/entitiesSlice'
import EntityCreationForm from '@/components/forms/EntityCreationForm'
import { EntityRequest, World } from '@/types/types'
import TinyEntityList from '@/components/lists/tinyEntityList'
import {
  EntityDetailContainer,
  EntityDetailWorldName,
  EntityDetailDescription,
  PrimaryButton,
  EntityDetailName,
  EntityDetailTopBannerContainer,
  EntityDetailWorldButton,
} from '@/assets/styles/globalStyles'
import { getSelectedWorld } from '@/redux/selectors/worldSelectors'
import { paths } from '@/constants/pathNames'
import { router } from 'expo-router'
import { selectWorld } from '@/redux/slices/worldSlice'

const EntityDetail = () => {
  const dispatch = useDispatch()

  const focusedEntity = useSelector(getFocusedEntity)
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
          <EntityDetailWorldName>Home</EntityDetailWorldName>
        </EntityDetailWorldButton>
        <EntityDetailWorldButton onClick={() => onWorldPressed(selectedWorld!)}>
          <EntityDetailWorldName>{selectedWorld?.name}</EntityDetailWorldName>
        </EntityDetailWorldButton>
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
