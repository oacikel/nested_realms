import { createSelector } from 'reselect'
import { RootState } from '../store'
import { EntityPosition } from '@/types/types'

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
  (focusedEntity) => !focusedEntity?.parentId,
)

export const getEntityById = (id: string) =>
  createSelector([selectEntitiesState], (entitiesState) => {
    // Check focused entity
    if (entitiesState.focused && entitiesState.focused.id === id) {
      return entitiesState.focused
    }

    // Check neighbor entities
    if (entitiesState.neighbor) {
      const neighborEntity = entitiesState.neighbor.find(
        (entity) => entity.id === id,
      )
      if (neighborEntity) {
        return neighborEntity
      }
    }

    // Check parent entity
    if (entitiesState.parent && entitiesState.parent.id === id) {
      return entitiesState.parent
    }

    // Check children entities
    if (entitiesState.children) {
      const childEntity = entitiesState.children.find(
        (entity) => entity.id === id,
      )
      if (childEntity) {
        return childEntity
      }
    }

    throw new Error(`Entity not found for id ${id}`)
  })

export const getEntityPosition = (id: string) =>
  createSelector([selectEntitiesState], (entitiesState) => {
    // Check focused entity
    if (entitiesState.focused && entitiesState.focused.id === id) {
      return 'focused' as EntityPosition
    }

    // Check neighbor entities
    if (entitiesState.neighbor) {
      const neighborEntity = entitiesState.neighbor.find(
        (entity) => entity.id === id,
      )
      if (neighborEntity) {
        return 'neighbor' as EntityPosition
      }
    }

    // Check parent entity
    if (entitiesState.parent && entitiesState.parent.id === id) {
      return 'parent' as EntityPosition
    }

    // Check children entities
    if (entitiesState.children) {
      const childEntity = entitiesState.children.find(
        (entity) => entity.id === id,
      )
      if (childEntity) {
        return 'child' as EntityPosition
      }
    }

    throw new Error(`Entity position not found for id ${id}`)
  })

export const getVisitedEntities = createSelector(
  [selectEntitiesState],
  (entitiesState) => entitiesState.visitedEntities,
)
