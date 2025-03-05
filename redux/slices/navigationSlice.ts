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
    navigateTocreateNewWorld: (state) => {
      state.currentRoute = '/createNewWorld'
    },
    navigateToWorld: (state, action: PayloadAction<{ worldId: string }>) => {
      state.currentRoute = `/world/${action.payload.worldId}`
    },
  },
})

export const { navigateToHome, navigateTocreateNewWorld, navigateToWorld } =
  navigationSlice.actions
export default navigationSlice.reducer
