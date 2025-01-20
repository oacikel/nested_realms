import { RootState } from '../store'

export const getAllWorlds = (state: RootState) => state.world.worlds
export const getWorldById = (state: RootState, worldId: string) => {
  return state.world.worlds.find((world) => world.id === worldId)
}
