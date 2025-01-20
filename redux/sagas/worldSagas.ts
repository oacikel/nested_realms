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
  AddWorldPayload as AddWorldRequestPayload,
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
  action: PayloadAction<AddWorldRequestPayload>,
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

    const entityIds: string[] = (yield call(
      WorldService.createEntities,
      worldId as string,
      entityRequest,
    )) as string[]

    yield call(WorldService.updateWorld, worldId, { entityIds })

    const newWorld: Partial<World> = {
      id: worldId as string,
      entityIds: (entityIds as string[]) || null,
    }

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
