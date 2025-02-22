import { takeLatest, call, put, select } from 'redux-saga/effects'
import {
  updateUser,
  requestRegisterUser,
  signInSuccess,
  requestLoginUser,
  createUser,
} from '../slices/userSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import UserService from '@/services/firebase/userService'
import { EmailRegisterRequest, User } from '@/types/types'
import { User as FirebaseUser } from 'firebase/auth'
import { generateUserFromFirebaseUser } from '@/app/utils/userUtils'
import { getUser } from '../selectors/userSelector'

function* handleRequestRegisterUser(
  action: PayloadAction<EmailRegisterRequest>,
): Generator<unknown, void, unknown> {
  try {
    const emailRegisterRequest = action.payload
    const firebaseUser: FirebaseUser = (yield call(
      UserService.registerUserViaEmail,
      emailRegisterRequest,
    )) as FirebaseUser

    const user = generateUserFromFirebaseUser(firebaseUser)
    user.userName = emailRegisterRequest.userName
    yield put(createUser(user))
  } catch (error) {
    console.log('Error registering user:', error)
  }
}

function* handleRequestLoginUser(
  action: PayloadAction<{ email: string; password: string }>,
): Generator<unknown, void, unknown> {
  try {
    const { email, password } = action.payload
    const firebaseUser: FirebaseUser = (yield call(
      UserService.loginUserViaEmailAndPassword,
      email,
      password,
    )) as FirebaseUser

    const user = (yield call(UserService.fetchUser, firebaseUser.uid)) as User
    yield put(signInSuccess(user))
  } catch (error) {
    console.log('Error logging in user:', error)
  }
}

function* handleCreateUser(
  action: PayloadAction<User>,
): Generator<unknown, void, unknown> {
  try {
    yield call(UserService.createUser, { ...action.payload })
    yield put(signInSuccess(action.payload))
  } catch (error) {
    console.log('Error creating user:', error)
  }
}

function* handleUpdateUser(
  action: PayloadAction<Partial<User>>,
): Generator<unknown, void, unknown> {
  try {
    const user = yield select(getUser)
    const id = (user as User)?.id
    console.log('Updating user:', action.payload)
    yield call(UserService.updateUser, { ...action.payload }, id)
  } catch (error) {
    console.log('Error adding created world id to user:', error)
  }
}

export function* watchUserSaga() {
  yield takeLatest(requestRegisterUser.type, handleRequestRegisterUser)
  yield takeLatest(requestLoginUser.type, handleRequestLoginUser)
  yield takeLatest(createUser.type, handleCreateUser)
  yield takeLatest(updateUser.type, handleUpdateUser)
}
