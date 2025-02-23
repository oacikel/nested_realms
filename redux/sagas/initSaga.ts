import { put } from 'redux-saga/effects'
import { requestExistingWorlds } from '../slices/worldSlice'

// List all the sagas that need to be run on app init here

function* initSaga() {
  yield put(requestExistingWorlds()) // BE CAREFULL IF THIS CREATES A PROBLEM ONCE THERE ARE MANY WORLDS IN THE DATABASE
}

export default initSaga
