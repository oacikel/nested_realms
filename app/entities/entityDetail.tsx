import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  getEntityLiteOfInterest,
  getFocusedEntity,
} from '@/redux/selectors/entitySelectors'
import { requestFocusedEntity } from '@/redux/slices/entitiesSlice'

const EntityDetail = () => {
  const dispatch = useDispatch()

  const focusedEntity = useSelector(getFocusedEntity)
  const entityLiteOfInterest = useSelector(getEntityLiteOfInterest)

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
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        {focusedEntity.name}
      </Text>
      <Text>{focusedEntity.description}</Text>
      <Text style={{ marginVertical: 8 }}>
        Created At: {new Date(focusedEntity.createdAt).toLocaleDateString()}
      </Text>
      <Button title="Back to World" onPress={() => {}} />
    </View>
  )
}

export default EntityDetail
