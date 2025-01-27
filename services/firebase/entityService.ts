import { Entity, EntityRequest } from '@/types/types'
import { FirebaseService } from './firebaseService'

const ENTITIES_PATH = 'entities'

export const EntityService = {
  async getEntity(worldId: string, entityId: string): Promise<Entity | null> {
    const entity = await FirebaseService.getDocument(
      `${ENTITIES_PATH}/${worldId}/${entityId}`,
    )
    entity.id = entityId
    return entity
  },

  async getEntitiesByParent(parentEntityId: string) {
    const entities = await FirebaseService.getCollection(ENTITIES_PATH)
    return entities.filter((entity) => entity.parentEntityId === parentEntityId)
  },

  async updateEntity(worldId: string, entityId: string, data: Partial<Entity>) {
    return FirebaseService.updateDocument(
      `${ENTITIES_PATH}/${worldId}/${entityId}`,
      data,
    )
  },

  async createEntity(entityRequest: EntityRequest, worldId: string) {
    return FirebaseService.setDocument(
      `${ENTITIES_PATH}/${worldId}`,
      entityRequest,
    )
  },
}
