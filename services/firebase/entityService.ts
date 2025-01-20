import { FirebaseService } from './firebaseService'

const ENTITIES_PATH = 'entities'

export const EntityService = {
  async getEntity(entityId: string) {
    return FirebaseService.getDocument(`${ENTITIES_PATH}/${entityId}`)
  },

  async getEntitiesByParent(parentEntityId: string) {
    const entities = await FirebaseService.getCollection(ENTITIES_PATH)
    return entities.filter((entity) => entity.parentEntityId === parentEntityId)
  },

  async updateEntity(entityId: string, data: any) {
    return FirebaseService.updateDocument(`${ENTITIES_PATH}/${entityId}`, data)
  },
}
