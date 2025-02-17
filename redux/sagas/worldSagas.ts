import { takeLatest, call, put, select } from 'redux-saga/effects'
import {
  addWorld,
  addWorlds,
  requestAddWorld,
  requestExistingWorlds,
  updateWorld,
} from '../slices/worldSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import WorldService from '@/services/firebase/worldService'
import { User, World, WorldRequest } from '@/types/types'
import { updateUser } from '../slices/userSlice'
import { getUser } from '../selectors/userSelector'

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
    const user = yield select(getUser)
    const userId = (user as User)?.id
    const userName = (user as User)?.userName
    if (!userId) {
      throw new Error('User not found')
    }
    worldRequest.creatorId = userId as string
    worldRequest.creatorUserName = userName as string

    const worldId: string = (yield call(
      WorldService.createWorld,
      worldRequest,
    )) as string
    yield put(addWorld({ ...worldRequest, id: worldId } as World))
    yield put(updateUser({ createdWorldIds: [worldId] }))
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
