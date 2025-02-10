import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  getChildrenEntities,
  getEntityLiteOfInterest,
  getFocusedEntity,
} from '@/redux/selectors/entitySelectors'
import {
  requestCreateChildEntity,
  requestFocusedEntity,
  setEntityLiteOfInterest,
} from '@/redux/slices/entitiesSlice'
import { router } from 'expo-router'
import EntityCreationForm from '@/components/forms/EntityCreationForm'
import { Entity, EntityRequest } from '@/types/types'
import { paths } from '@/constants/pathNames'
import { convertToEntityLite } from '../utils/entityUtils'

const EntityDetail = () => {
  const dispatch = useDispatch()

  const focusedEntity = useSelector(getFocusedEntity)
  const entityLiteOfInterest = useSelector(getEntityLiteOfInterest)
  const childrenEntities = useSelector(getChildrenEntities)

  const [showChildForm, setShowChildForm] = React.useState(false)

  const onCreateEntityPress = (entity: EntityRequest) => {
    if (!focusedEntity) {
      throw new Error('Focused entity is not set')
      return
    }
    entity.parentId = focusedEntity.id
    dispatch(requestCreateChildEntity(entity))
  }

  const pressedEntityDetail = (entity: Entity) => {
    const entityLite = convertToEntityLite(entity)

    dispatch(setEntityLiteOfInterest(entityLite))
    router.push(paths.entityDetail)
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
    <View
      style={{
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 8,
          color: '#333',
        }}
      >
        {focusedEntity.name}
      </Text>
      <Text style={{ fontSize: 16, color: '#555', marginBottom: 8 }}>
        {focusedEntity.description}
      </Text>
      <Text style={{ fontSize: 14, color: '#777', marginBottom: 16 }}>
        Created At: {new Date(focusedEntity.createdAt).toLocaleDateString()}
      </Text>

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
            worldId={focusedEntity.worldId}
            parentId={focusedEntity.id}
          />
        </View>
      )}

      <View style={{ marginTop: 24 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 8,
            color: '#333',
          }}
        >
          👶 Children
        </Text>
        {childrenEntities?.map((child) => (
          <View
            key={child.id}
            style={{
              padding: 12,
              backgroundColor: '#fff',
              borderRadius: 8,
              marginBottom: 12,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
              {child.name}
            </Text>
            <Text style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>
              {child.description}
            </Text>
            <Button
              title="🔍 View"
              color="#28a745"
              onPress={() => pressedEntityDetail(child)}
            />
          </View>
        ))}
      </View>

      <View style={{ marginTop: 24 }}>
        <Button
          title="⬅️ Back to World"
          color="#dc3545"
          onPress={() => router.back()}
        />
      </View>
    </View>
  )
}

export default EntityDetail
