import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  getChildrenEntities,
  getEntityLiteOfInterest,
  getFocusedEntity,
  getVisitedEntities,
} from '@/redux/selectors/entitySelectors'
import {
  requestCreateChildEntity,
  requestFocusedEntity,
} from '@/redux/slices/entitiesSlice'
import EntityCreationForm from '@/components/forms/EntityCreationForm'
import { EntityRequest } from '@/types/types'
import TinyEntityList from '@/components/lists/tinyEntityList'
import {
  EntityDetailContainer,
  EntityDetailDescription,
  PrimaryButton,
  EntityDetailName,
  EntityDetailTopBannerContainer,
  EntityInfoContainer,
  EntityInfoAndVisitedEntitiesContainer,
  VisitedEntitiesContainer,
} from '@/assets/styles/globalStyles'
import { getSelectedWorld } from '@/redux/selectors/worldSelectors'
import HomeButton from '@/components/buttons/homeButton'
import WorldButton from '@/components/buttons/WorldButton'

const EntityDetail = () => {
  const dispatch = useDispatch()

  const focusedEntity = useSelector(getFocusedEntity)
  const entityLiteOfInterest = useSelector(getEntityLiteOfInterest)
  const childrenEntities = useSelector(getChildrenEntities)
  const visitedEntities = useSelector(getVisitedEntities)
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
        <HomeButton />
        {selectedWorld && <WorldButton world={selectedWorld} />}
      </EntityDetailTopBannerContainer>
      <EntityInfoAndVisitedEntitiesContainer>
        <EntityInfoContainer>
          <ScrollView>
            <EntityDetailName>{focusedEntity.name}</EntityDetailName>
            <EntityDetailDescription>
              {focusedEntity.description}
            </EntityDetailDescription>
          </ScrollView>
        </EntityInfoContainer>
        <VisitedEntitiesContainer>
          <View style={{ flex: 1 }}>
            {visitedEntities && (
              <TinyEntityList entities={visitedEntities} listType="history" />
            )}
          </View>
        </VisitedEntitiesContainer>
      </EntityInfoAndVisitedEntitiesContainer>
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
