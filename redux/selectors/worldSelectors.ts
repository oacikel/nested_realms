import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { World } from '@/types/types'

const selectWorldState = (state: RootState) => state.world
export const getAllWorlds = (state: RootState) => state.world.worlds

export const getWorldById = (id: string) =>
  createSelector([selectWorldState], (worldState): World => {
    const world = worldState.worlds.find((world) => world.id === id)
    if (!world) {
      throw new Error(`World with id ${id} not found`)
    }
    return world
  })

export const getSelectedWorld = (state: RootState) => state.world.selectedWorld
