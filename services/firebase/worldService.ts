import { EntityRequest, World, WorldRequest } from '@/types/types'
import { FirebaseService } from './firebaseService'

/*
Data Structure is as follows:
|--games/
|----[World Data]
|----entities/
|------[entityData[]]

note: check the types/types.tsx file for the World and Entity types
*/
const WORLDS_PATH = 'games'

const WorldService = {
  async getWorld(worldId: string) {
    return FirebaseService.getDocument(`${WORLDS_PATH}/${worldId}`)
  },

  async updateWorld(
    worldId: string,
    data: Partial<World>,
  ): Promise<string | null> {
    return FirebaseService.updateDocument(
      `${WORLDS_PATH}/${worldId}/worldData`,
      data,
    )
  },

  async createWorld(worldData: WorldRequest): Promise<string | null> {
    const worldId = await FirebaseService.setDocument(`${WORLDS_PATH}/`, {
      worldData,
    })
    return worldId
  },

  async createEntities(
    worldId: string,
    entities: EntityRequest[],
  ): Promise<string[]> {
    const path = `${WORLDS_PATH}/${worldId}/entities/`

    // Use map() to create an array of promises
    const entityPromises = entities.map(async (entity) => {
      const entityId = await FirebaseService.setDocument(path, entity)
      if (entityId) {
        console.log('Entity created:', entityId)
        return entityId
      }
      return null // If creation fails, return null
    })

    // Wait for all promises to resolve
    const entityIds = (await Promise.all(entityPromises)).filter(
      (id): id is string => id !== null,
    ) // Remove null values

    console.log('Created entities:', entityIds)
    console.log('JSON format is:', JSON.stringify(entityIds))

    return entityIds
  },
}

export default WorldService
