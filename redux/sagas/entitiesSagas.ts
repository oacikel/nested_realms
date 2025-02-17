import { takeLatest, call, put, select } from 'redux-saga/effects'
import {
  Entity,
  EntityLite,
  EntityPosition,
  EntityRequest,
  World,
} from '@/types/types'
import {
  addEntityToStore,
  requestChildrenEntities,
  requestCreateChildEntity,
  requestFocusedEntity,
  requestNeighborEntities,
  requestParentEntity,
  setChildrenEntities,
  setFocusedEntity,
  setNeighborEntities,
  setParentEntity,
  setVisitedEntities,
} from '../slices/entitiesSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { EntityService } from '@/services/firebase/entityService'
import {
  getEntityById,
  getEntityPosition,
  getFocusedEntity,
  getParentEntity,
  getVisitedEntities,
} from '../selectors/entitySelectors'
import { waitForState } from '../reduxUtils'
import { getSelectedWorld, getWorldById } from '../selectors/worldSelectors'
import { updateWorld } from '../slices/worldSlice'

function* handleRequestFocusedEntity(
  action: PayloadAction<EntityLite>,
): Generator<unknown, void, unknown> {
  try {
    const selectedWorld: World = (yield select(getSelectedWorld)) as World
    const focusedEntity: Entity = (yield call(
      fetchSingleEntity,
      selectedWorld.id,
      action.payload.id,
    )) as Entity
    yield put(setFocusedEntity(focusedEntity))

    // Now it's time to fetch the parent, and children of the focused entity
    yield put(requestParentEntity())
    yield put(requestChildrenEntities())
  } catch (error) {
    console.log('Error saving entities:', error)
  }
}

function* handleRequestParentEntity(): Generator<unknown, void, never> {
  try {
    // Wait until getFocusedEntity returns a value (or timeout after 5 seconds)
    const focusedEntity: Entity = yield waitForState(getFocusedEntity)
    const selectedWorld: World = (yield select(getSelectedWorld)) as World

    if (focusedEntity.parentId) {
      const parentEntity: Entity = yield call(
        fetchSingleEntity,
        selectedWorld.id,
        focusedEntity.parentId as string,
      )
      yield put(setParentEntity(parentEntity))
    } else {
      // If the focused entity is top level, the parent entity does not exist
      yield put(setParentEntity(null))
    }

    // Request neighboring entities after parent is set
    yield put(requestNeighborEntities())
  } catch (error) {
    console.warn('Error fetching parent entity:', error)
  }
}

function* handleRequestNeighborEntities(): Generator<unknown, void, unknown> {
  try {
    let neighborEntities: Entity[] = []
    const selectedWorld: World = (yield select(getSelectedWorld)) as World

    const focusedEntity: Entity = (yield select(getFocusedEntity)) as Entity
    const isTopLevel = !focusedEntity.parentId

    if (!isTopLevel) {
      const parentEntity: Entity = (yield waitForState(
        getParentEntity,
      )) as Entity
      neighborEntities = (yield call(
        fetchMultipleEntities,
        selectedWorld.id,
        parentEntity.childrenIds as string[],
      )) as Entity[]
    } else {
      const topLevelEntityIds = selectedWorld.topLevelEntities
        ?.filter((entity) => entity.id !== focusedEntity.id) // Exclude the current focused entity
        .map((entity) => entity.id)
      // The neighbor entities are the children of the World Object
      neighborEntities = (yield call(
        fetchMultipleEntities,
        selectedWorld.id,
        topLevelEntityIds as string[],
      )) as Entity[]
    }
    yield put(setNeighborEntities(neighborEntities))
  } catch (error) {
    console.log('Error fetching neighbor entities:', error)
  }
}

function* handleRequestChildrenEntities(): Generator<unknown, void, unknown> {
  try {
    const selectedWorld: World = (yield select(getSelectedWorld)) as World
    const focusedEntity: Entity = (yield select(getFocusedEntity)) as Entity

    if (focusedEntity.childrenIds == undefined) {
      yield put(setChildrenEntities(null))
      return
    }

    const childrenEntities: Entity[] = (yield call(
      fetchMultipleEntities,
      selectedWorld.id,
      focusedEntity.childrenIds as string[],
    )) as Entity[]
    yield put(setChildrenEntities(childrenEntities))
  } catch (error) {
    console.log('Error fetching children entities:', error)
  }
}

function* handleRequestCreateChildEntity(
  action: PayloadAction<EntityRequest>,
): Generator<unknown, void, unknown> {
  try {
    const selectedWorld: World = (yield select(getSelectedWorld)) as World
    const newEntityId = yield call(
      EntityService.createEntity,
      action.payload,
      selectedWorld.id,
    )

    const newEntity: Entity = (yield call(
      fetchSingleEntity,
      selectedWorld.id,
      newEntityId as string,
    )) as Entity

    yield put(addEntityToStore(newEntity))
  } catch (error) {
    console.log('Error creating child entity:', error)
  }
}

function* handleAddEntityToStore(
  action: PayloadAction<Entity>,
): Generator<unknown, void, unknown> {
  try {
    const parentEntityToUpdate =
      action.payload.parentId == null
        ? null
        : yield select(
            getEntityById(action.payload.parentId),
          ) as unknown as Entity
    if (parentEntityToUpdate) {
      const parentEntityCopy = { ...(parentEntityToUpdate as Entity) }
      parentEntityCopy.childrenIds = [
        ...(parentEntityCopy.childrenIds || []),
        action.payload.id,
      ]
      yield call(
        EntityService.updateEntity,
        action.payload.worldId,
        parentEntityCopy.id,
        parentEntityCopy,
      )
      yield updateAppropriateEntity(parentEntityCopy)
    } else {
      // This is a top entity with no parent. So we update the world
      const worldToUpdate: World = (yield select(
        getWorldById(action.payload.worldId),
      )) as World

      const worldCopy = {
        ...worldToUpdate,
        topLevelEntities: [
          ...(worldToUpdate.topLevelEntities || []),
          action.payload,
        ],
      }
      yield put(updateWorld(worldCopy))
    }
  } catch (error) {
    console.log('Error adding entity to store:', error)
  }
}

// When an entity is selected aka entityLiteOfInterest is set, we update the list of entities visited.
// This in turn ensures that we have a history of visited entries.
function* handleSetFocusedEntity(
  action: PayloadAction<Entity | null>,
): Generator<unknown, void, unknown> {
  try {
    console.log('OCUL - Trying setting up entity of interest:', action.payload)
    const visitedEntities: Entity[] = (yield select(
      getVisitedEntities,
    )) as Entity[]
    const updatedVisitedEntities = visitedEntities ? [...visitedEntities] : []
    const existingIndex = updatedVisitedEntities.findIndex(
      (entity) => entity.id === action.payload?.id,
    )

    if (existingIndex !== -1) {
      updatedVisitedEntities.splice(existingIndex + 1)
    } else if (action.payload) {
      updatedVisitedEntities.push(action.payload)
    }

    yield put(setVisitedEntities(updatedVisitedEntities))
  } catch (error) {
    console.log('Error creating child entity:', error)
  }
}

const fetchMultipleEntities = async (
  worldId: string,
  entityIds: string[],
): Promise<Entity[]> => {
  const entities: Entity[] = []
  const entityPromises = entityIds.map(async (entityId) => {
    const entity = await EntityService.getEntity(worldId, entityId)
    if (entity) {
      entities.push(entity)
    }
  })
  await Promise.all(entityPromises)
  return entities
}

const fetchSingleEntity = async (
  worldId: string,
  entityId: string,
): Promise<Entity | null> => {
  return await EntityService.getEntity(worldId, entityId)
}

// Use this to update entities within the store. If the entity is parent call set parent, if it's focused set focused etc.
function* updateAppropriateEntity(entity: Entity) {
  const entityPosition: EntityPosition = yield select(
    getEntityPosition(entity.id),
  )
  switch (entityPosition) {
    case 'focused':
      yield put(setFocusedEntity(entity))
      break
    case 'parent':
      yield put(setParentEntity(entity))
      break
    case 'neighbor':
      yield put(setNeighborEntities([entity]))
      break
    case 'child':
      yield put(setChildrenEntities([entity]))
      break
    default:
      throw Error('Unknown entity position:', entityPosition)
  }
}

export function* watchEntitiesSaga() {
  yield takeLatest(requestFocusedEntity.type, handleRequestFocusedEntity)
  yield takeLatest(requestParentEntity.type, handleRequestParentEntity)
  yield takeLatest(requestChildrenEntities.type, handleRequestChildrenEntities)
  yield takeLatest(requestNeighborEntities.type, handleRequestNeighborEntities)
  yield takeLatest(
    requestCreateChildEntity.type,
    handleRequestCreateChildEntity,
  )
  yield takeLatest(addEntityToStore.type, handleAddEntityToStore)
  yield takeLatest(setFocusedEntity.type, handleSetFocusedEntity)
}
