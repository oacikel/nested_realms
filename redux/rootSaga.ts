import { all } from 'redux-saga/effects'
import { watchWorldSaga } from './sagas/worldSagas'

export default function* rootSaga() {
  yield all([watchWorldSaga()])
}
