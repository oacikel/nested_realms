import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { World } from '@/types/types'
import { shouldDisplayWorld } from '@/app/utils/worldUtils'
import { getUser } from './userSelector'

const selectWorldState = (state: RootState) => state.world
export const getAllWorlds = (state: RootState) => state.world.worlds
export const getWorldsToDisplay = createSelector(
  [getAllWorlds, getUser],
  (worlds, user) =>
    worlds.filter((world: World) =>
      shouldDisplayWorld(world, user ?? undefined),
    ),
)

export const getWorldById = (id: string) =>
  createSelector([selectWorldState], (worldState): World | undefined => {
    const world = worldState.worlds.find((world) => world.id === id)
    return world
  })

export const getSelectedWorld = (state: RootState) => state.world.selectedWorld
