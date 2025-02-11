import { convertToEntityLite } from '@/app/utils/entityUtils'
import {
  TinyEntityName,
  TinyEntityContainer,
} from '@/assets/styles/globalStyles'
import { paths } from '@/constants/pathNames'
import { setEntityLiteOfInterest } from '@/redux/slices/entitiesSlice'
import { Entity } from '@/types/types'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
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
    <ScrollView horizontal>
      {entities.map((entity, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleEntityButtonPress(entity)}
        >
          <TinyEntityContainer>
            <TinyEntityName>{entity.name}</TinyEntityName>
          </TinyEntityContainer>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default TinyEntityList
