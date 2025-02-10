import { convertToEntityLite } from '@/app/utils/entityUtils'
import { paths } from '@/constants/pathNames'
import { setEntityLiteOfInterest } from '@/redux/slices/entitiesSlice'
import { Entity } from '@/types/types'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

interface TinyEntityListProps {
  entities: Entity[]
}

const TinyEntityList: React.FC<TinyEntityListProps> = ({ entities }) => {
  const dispatch = useDispatch()

  const handleEntityButtonPress = (entity: Entity) => {
    const entityLite = convertToEntityLite(entity)
    dispatch(setEntityLiteOfInterest(entityLite))
    router.push(paths.entityDetail)
  }

  return (
    <ScrollView horizontal style={styles.scrollView}>
      {entities.map((entity, index) => (
        <TouchableOpacity
          key={index}
          style={styles.entityContainer}
          onPress={() => handleEntityButtonPress(entity)}
        >
          <Text>{entity.name}</Text>
          <Text>{entity.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 20,
  },
  entityContainer: {
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
  },
})

export default TinyEntityList
