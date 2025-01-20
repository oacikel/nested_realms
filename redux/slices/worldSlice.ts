import { AddWorldPayload, World } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type WorldState = {
  worlds: World[]
}

const initialState: WorldState = {
  worlds: [],
}

const worldSlice = createSlice({
  name: 'world',
  initialState,
  reducers: {
    requestAddWorld: (_state, _action: PayloadAction<AddWorldPayload>) => {
      // No state change needed, this action is handled by a saga
    },
    addWorld: (state, action: PayloadAction<World>) => {
      state.worlds.push(action.payload)
    },
  },
})

export const { requestAddWorld, addWorld } = worldSlice.actions
export default worldSlice.reducer
