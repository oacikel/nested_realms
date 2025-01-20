import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Entity = {
  id: string
  name: string
  worldId: string
}

type EntityState = {
  entities: Record<string, Entity> // Using an object for quick lookups
}

const initialState: EntityState = {
  entities: {},
}

const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    addEntity: (state, action: PayloadAction<Entity>) => {
      const entity = action.payload
      state.entities[entity.id] = entity
    },
    removeEntity: (state, action: PayloadAction<string>) => {
      delete state.entities[action.payload]
    },
    updateEntity: (state, action: PayloadAction<Entity>) => {
      const entity = action.payload
      if (state.entities[entity.id]) {
        state.entities[entity.id] = entity
      }
    },
  },
})

export const { addEntity, removeEntity, updateEntity } = entitySlice.actions
export default entitySlice.reducer
