import { RootState } from '../store'

export const getCurrentPath = (state: RootState) =>
  state.navigation.currentRoute
