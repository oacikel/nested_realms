import { all } from 'redux-saga/effects'
import { watchWorldSaga } from './sagas/worldSagas'
import { watchEntitiesSaga } from './sagas/entitiesSagas'
import { watchUserSaga } from './sagas/userSagas'

export default function* rootSaga() {
  yield all([watchWorldSaga(), watchEntitiesSaga(), watchUserSaga()])
}
