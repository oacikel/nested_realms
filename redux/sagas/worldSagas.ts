import { takeLatest, call, put } from 'redux-saga/effects'
import {
  addWorld,
  addWorlds,
  requestAddWorld,
  requestExistingWorlds,
  updateWorld,
} from '../slices/worldSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import WorldService from '@/services/firebase/worldService'
import { World, WorldRequest } from '@/types/types'

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
  action: PayloadAction<WorldRequest>,
): Generator<unknown, void, unknown> {
  try {
    const worldRequest = action.payload
    const worldId: string = (yield call(
      WorldService.createWorld,
      worldRequest,
    )) as string
    yield put(addWorld({ ...worldRequest, id: worldId } as World))
  } catch (error) {
    console.log('Error saving world:', error)
  }
}

function* handleUpdateWorld(
  action: PayloadAction<Partial<World>>,
): Generator<unknown, void, unknown> {
  try {
    const worldId = action.payload.id as string
    yield call(WorldService.updateWorld, worldId, action.payload)
  } catch (error) {
    console.log('Error updating world:', error)
  }
}

export function* watchWorldSaga() {
  yield takeLatest(requestExistingWorlds.type, handleRequestExistingWorlds)
  yield takeLatest(requestAddWorld.type, handleRequestAddWorld)
  yield takeLatest(updateWorld.type, handleUpdateWorld)
}
