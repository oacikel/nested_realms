import { takeLatest, call, put, select } from 'redux-saga/effects'
import { Entity, EntityLite, EntityRequest, World } from '@/types/types'
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
} from '../slices/entitiesSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { EntityService } from '@/services/firebase/entityService'
import {
  getEntityById,
  getFocusedEntity,
  getParentEntity,
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
    console.log('Focused entity:', focusedEntity)
    yield put(setFocusedEntity(focusedEntity))

    // Now it's time to fetch the parent, and children of the focused entity
    yield put(requestParentEntity())
    yield put(requestChildrenEntities())
  } catch (error) {
    console.log('Error saving world:', error)
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
      console.log('No children entities to fetch')
      return
    }
    console.log('Fetching children entities:', focusedEntity.childrenIds)

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
      console.log('Parent entity found:', parentEntityToUpdate)
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
    } else {
      console.log('Updating world instead!')
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
}
