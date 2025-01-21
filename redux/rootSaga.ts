import { all } from 'redux-saga/effects'
import { watchWorldSaga } from './sagas/worldSagas'
import { watchEntitiesSaga } from './sagas/enitiesSagas'

export default function* rootSaga() {
  yield all([watchWorldSaga(), watchEntitiesSaga()])
}
