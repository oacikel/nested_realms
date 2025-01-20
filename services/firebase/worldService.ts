import {
  EntityIdNamePair,
  EntityRequest,
  World,
  WorldRequest,
} from '@/types/types'
import { FirebaseService } from './firebaseService'

/*
Data Structure is as follows:
|--games/
|----[World Data]
|----entities/
|------[entityData[]]

note: check the types/types.tsx file for the World and Entity types
*/
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
  ): Promise<EntityIdNamePair[]> {
    const path = `${ENTITIES_PATH}/${worldId}/`

    const entityPromises = entities.map(async (entity) => {
      const entityId = await FirebaseService.setDocument(path, entity)
      if (entityId) {
        return { id: entityId, name: entity.name }
      }
      return null
    })

    const entityIdNamePairs = (await Promise.all(entityPromises)).filter(
      (entity): entity is EntityIdNamePair => entity !== null,
    )
    return entityIdNamePairs
  },
}

export default WorldService
