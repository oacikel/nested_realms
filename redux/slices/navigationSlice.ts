import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentRoute: '/',
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateToHome: (state) => {
      state.currentRoute = '/home'
    },
    navigateToCreateNewWorld: (state) => {
      state.currentRoute = '/create-new-world'
    },
    navigateToWorld: (state, action: PayloadAction<{ worldId: string }>) => {
      state.currentRoute = `/world/${action.payload.worldId}`
    },
  },
})

export const { navigateToHome, navigateToCreateNewWorld, navigateToWorld } =
  navigationSlice.actions
export default navigationSlice.reducer
