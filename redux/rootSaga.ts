import { all, call } from 'redux-saga/effects'
import { watchWorldSaga } from './sagas/worldSagas'
import { watchEntitiesSaga } from './sagas/entitiesSagas'
import { watchUserSaga } from './sagas/userSagas'
import initSaga from './sagas/initSaga'

export default function* rootSaga() {
  yield all([
    call(initSaga), // Run the initialization saga
    watchWorldSaga(),
    watchEntitiesSaga(),
    watchUserSaga(),
  ])
}
