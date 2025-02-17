import { createSelector } from 'reselect'
import { RootState } from '../store'

// Selectors
const selectUserState = (state: RootState) => state.user

export const getUser = createSelector(
  [selectUserState],
  (userState) => userState.user,
)

export const getUserId = createSelector(
  [selectUserState],
  (userState) => userState.user?.id,
)

export const getCreatedWorldIds = createSelector(
  [selectUserState],
  (userState) => userState.user?.createdWorldIds,
)
