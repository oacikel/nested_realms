import { AddEntitiesPayload, AddWorldPayload, World } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type WorldState = {
  worlds: World[]
  selectedWorld: World | null
}

const initialState: WorldState = {
  worlds: [],
  selectedWorld: null,
}

const worldSlice = createSlice({
  name: 'world',
  initialState,
  reducers: {
    requestExistingWorlds: (_state) => {
      // No state change needed, this action is handled by a saga
    },
    requestAddWorld: (_state, _action: PayloadAction<AddWorldPayload>) => {
      // No state change needed, this action is handled by a saga
    },
    requestAddEntities: (
      _state,
      _action: PayloadAction<AddEntitiesPayload>,
    ) => {
      // No state change needed, this action is handled by a saga
    },
    addWorld: (state, action: PayloadAction<World>) => {
      state.worlds.push(action.payload)
    },
    addWorlds: (state, action: PayloadAction<World[]>) => {
      const newWorlds = action.payload.filter(
        (newWorld) => !state.worlds.some((world) => world.id === newWorld.id),
      )
      state.worlds.push(...newWorlds)
    },
    updateWorld: (state, action: PayloadAction<Partial<World>>) => {
      const world = state.worlds.find((w) => w.id === action.payload.id)
      if (world) {
        Object.assign(world, action.payload)
      }
    },
    selectWorld: (state, action: PayloadAction<World>) => {
      state.selectedWorld = action.payload
    },
  },
})

export const {
  requestExistingWorlds,
  requestAddWorld,
  addWorld,
  addWorlds,
  requestAddEntities,
  updateWorld,
  selectWorld,
} = worldSlice.actions
export default worldSlice.reducer
