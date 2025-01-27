import { EntityLite, EntityRequest, World, WorldRequest } from '@/types/types'
import { FirebaseService } from './firebaseService'

const WORLDS_PATH = 'worlds'
const ENTITIES_PATH = 'entities'

const WorldService = {
  async getExistingWorlds(): Promise<World[]> {
    const worlds = await FirebaseService.getCollection(WORLDS_PATH)
    return worlds
  },
  async getWorld(worldId: string) {
    return FirebaseService.getDocument(`${WORLDS_PATH}/${worldId}`)
  },

  async updateWorld(
    worldId: string,
    data: Partial<World>,
  ): Promise<string | null> {
    return FirebaseService.updateDocument(`${WORLDS_PATH}/${worldId}`, data)
  },

  async createWorld(worldData: WorldRequest): Promise<string | null> {
    const worldId = await FirebaseService.setDocument(`${WORLDS_PATH}/`, {
      ...worldData,
    })
    return worldId
  },

  async createEntities(
    worldId: string,
    entities: EntityRequest[],
  ): Promise<EntityLite[]> {
    const path = `${ENTITIES_PATH}/${worldId}/`

    const entityPromises = entities.map(async (entity) => {
      const entityId = await FirebaseService.setDocument(path, entity)
      if (entityId) {
        return {
          id: entityId,
          name: entity.name,
          isTopLevel: entity.isTopLevel,
        } as EntityLite
      }
      return null
    })

    const entityIdNamePairs = (await Promise.all(entityPromises)).filter(
      (entity): entity is EntityLite => entity !== null,
    )
    return entityIdNamePairs
  },
}

export default WorldService
