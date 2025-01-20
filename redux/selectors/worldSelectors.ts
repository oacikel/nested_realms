import { RootState } from '../store'

export const getAllWorlds = (state: RootState) => state.world.worlds
