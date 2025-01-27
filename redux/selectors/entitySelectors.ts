import { createSelector } from 'reselect'
import { RootState } from '../store'

// Selectors
const selectEntitiesState = (state: RootState) => state.entities

export const getEntityLiteOfInterest = createSelector(
  [selectEntitiesState],
  (entitiesState) => entitiesState.entityLiteOfInterest,
)
export const getFocusedEntity = createSelector(
  [selectEntitiesState],
  (entitiesState) => entitiesState.focused,
)

export const getParentEntity = createSelector(
  [selectEntitiesState],
  (entitiesState) => entitiesState.parent,
)

export const getNeighborEntities = createSelector(
  [selectEntitiesState],
  (entitiesState) => entitiesState.neighbor,
)

export const getChildrenEntities = createSelector(
  [selectEntitiesState],
  (entitiesState) => entitiesState.children,
)

export const isFocusedEntityTopLevel = createSelector(
  [getFocusedEntity],
  (focusedEntity) => focusedEntity?.isTopLevel ?? false,
)
