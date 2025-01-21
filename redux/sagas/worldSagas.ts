import { takeLatest, call, put } from 'redux-saga/effects'
import {
  addWorld,
  addWorlds,
  requestAddEntities,
  requestAddWorld,
  requestExistingWorlds,
  updateWorld,
} from '../slices/worldSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  AddEntitiesPayload,
  AddWorldPayload,
  EntityLite,
  World,
} from '@/types/types'
import WorldService from '@/services/firebase/worldService'

function* handleRequestExistingWorlds(): Generator<unknown, void, unknown> {
  try {
    const worlds: World[] = (yield call(
      WorldService.getExistingWorlds,
    )) as World[]

    yield put(addWorlds(worlds))
  } catch (error) {
    console.log('Error fetching worlds:', error)
  }
}

function* handleRequestAddWorld(
  action: PayloadAction<AddWorldPayload>,
): Generator<unknown, void, unknown> {
  try {
    const worldRequest = action.payload.worldRequest
    const entityRequests = action.payload.entityRequests
    const worldId: string = (yield call(
      WorldService.createWorld,
      worldRequest,
    )) as string
    yield put(addWorld({ ...worldRequest, id: worldId } as World))
    yield put(requestAddEntities({ worldId, entityRequests }))
  } catch (error) {
    console.log('Error saving world:', error)
  }
}

function* handleRequestAddEntities(
  action: PayloadAction<AddEntitiesPayload>,
): Generator<unknown, void, unknown> {
  try {
    const worldId = action.payload.worldId
    const entityRequest = action.payload.entityRequests

    const entityIds: EntityLite[] = (yield call(
      WorldService.createEntities,
      worldId as string,
      entityRequest,
    )) as EntityLite[]
    const topLevelEntities = entityIds.filter((entity) => entity.isTopLevel)
    const newWorld: Partial<World> = {
      id: worldId as string,
      entityIds: (entityIds as EntityLite[]) || null,
    }
    if (topLevelEntities.length > 0) {
      newWorld.topLevelEntities = topLevelEntities
    }
    yield call(WorldService.updateWorld, worldId, newWorld)
    yield put(updateWorld(newWorld))
  } catch (error) {
    console.log('Error adding entities:', error)
  }
}

export function* watchWorldSaga() {
  yield takeLatest(requestExistingWorlds.type, handleRequestExistingWorlds)
  yield takeLatest(requestAddWorld.type, handleRequestAddWorld)
  yield takeLatest(requestAddEntities.type, handleRequestAddEntities)
}
