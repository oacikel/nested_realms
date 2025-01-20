import { takeLatest, call, put } from 'redux-saga/effects'
import { addWorld, requestAddWorld } from '../slices/worldSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { AddWorldPayload as AddWorldRequestPayload, World } from '@/types/types'
import WorldService from '@/services/firebase/worldService'

// Worker Saga
function* handleRequestAddWorld(
  action: PayloadAction<AddWorldRequestPayload>,
): Generator<unknown, void, unknown> {
  try {
    const worldRequest = action.payload.worldRequest
    const entityRequests = action.payload.entityRequests
    // This is going to be a bit complicated to keep the tree structure and to ensure that firebase adds unique ids to each entity

    // ok but this is kind of messed up because it means multiple calls to the database each time we want to add a new entity...

    // 1. Create a New World without any entities
    const worldId: string = (yield call(
      WorldService.createWorld,
      worldRequest,
    )) as string

    // 2. Add the entities to the same directory as the world and get the ids
    const entityIds: string[] = (yield call(
      WorldService.createEntities,
      worldId as string,
      entityRequests,
    )) as string[]

    // 3. Update the world with the entity ids
    yield call(WorldService.updateWorld, worldId, { entityIds })

    const newWorld: World = {
      ...worldRequest,
      id: worldId as string,
      entityIds: (entityIds as string[]) || null,
    }
    // 4. Add the new world to the store
    yield put(addWorld(newWorld))
  } catch (error) {
    console.log('Error saving world:', error)
  }
}

// Watcher Saga
export function* watchWorldSaga() {
  yield takeLatest(requestAddWorld.type, handleRequestAddWorld)
}
