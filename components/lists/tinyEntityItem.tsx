import {
  TinyEntityName,
  TinyEntityContainer,
  CommonIcon,
} from '@/assets/styles/globalStyles'
import { Entity, EntityListType, EntityRequest } from '@/types/types'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface TinyEntityItemProps {
  entity: Entity | EntityRequest
  index: number
  onPress: (entity: Entity | EntityRequest) => void
  listType?: EntityListType
}

const TinyEntityItem: React.FC<TinyEntityItemProps> = ({
  entity,
  index,
  onPress,
  listType = 'selections',
}) => {
  return (
    <TinyEntityContainer key={index} listType={listType}>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => onPress(entity)}
      >
        {listType == 'history' && (
          <CommonIcon
            name={'title'}
            style={{ transform: [{ rotate: '270deg' }] }}
          />
        )}
        <TinyEntityName listType={listType}> {entity.name} </TinyEntityName>
      </TouchableOpacity>
    </TinyEntityContainer>
  )
}
export default TinyEntityItem
