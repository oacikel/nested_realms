import { Entity, EntityLite } from '@/types/types'

export const convertToEntityLite = (entity: Entity): EntityLite => {
  return {
    id: entity.id,
    name: entity.name,
    parentId: entity.parentId,
  }
}
