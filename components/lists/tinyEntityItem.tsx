import {
  TintEntityName,
  TinyEntityContainer,
  TinyEntityDescription,
} from '@/assets/styles/globalStyles'
import { Entity, EntityRequest } from '@/types/types'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface TinyEntityItemProps {
  entity: Entity | EntityRequest
  index: number
  onPress?: (entity: Entity | EntityRequest) => void
}

const TinyEntityItem: React.FC<TinyEntityItemProps> = ({
  entity,
  index,
  onPress,
}) => {
  return (
    <TinyEntityContainer key={index}>
      <TouchableOpacity onPress={() => onPress && onPress(entity)}>
        <TintEntityName> {entity.name} </TintEntityName>
        <TinyEntityDescription> {entity.description} </TinyEntityDescription>
      </TouchableOpacity>
    </TinyEntityContainer>
  )
}
export default TinyEntityItem
