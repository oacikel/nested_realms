import { takeLatest, call, put } from 'redux-saga/effects'
import { requestRegisterUser, signInSuccess } from '../slices/userSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import UserService from '@/services/firebase/userService'
import { EmailRegisterRequest } from '@/types/types'
import { User } from 'firebase/auth'

function* handleRequestRegisterUser(
  action: PayloadAction<EmailRegisterRequest>,
): Generator<unknown, void, unknown> {
  try {
    const emailRegisterRequest = action.payload
    const user: User = (yield call(
      UserService.registerUserViaEmail,
      emailRegisterRequest,
    )) as User
    yield put(signInSuccess(user))
  } catch (error) {
    console.log('Error registering user:', error)
  }
}

export function* watchUserSaga() {
  yield takeLatest(requestRegisterUser.type, handleRequestRegisterUser)
}
