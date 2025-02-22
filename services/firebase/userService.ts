import { EmailRegisterRequest, User } from '@/types/types'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { FirebaseService } from './firebaseService'

const auth = getAuth()
const USER_PATH = 'users'

export const registerUserViaEmail = async (
  emailRegisterRequest: EmailRegisterRequest,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      emailRegisterRequest.email,
      emailRegisterRequest.password,
    )
    return userCredential.user
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const loginUserViaEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    return userCredential.user
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const createUserProfileDocument = async (user: User) => {
  const worldId = await FirebaseService.setDocument(
    `${USER_PATH}/${user.id}`, // We use the user's uid in authentication as their id in the database.
    user,
    false,
  )
  return worldId
}

export const createUser = async (user: User) => {
  await FirebaseService.updateDocument(`${USER_PATH}/${user.id}`, user)
}

export const updateUser = async (user: Partial<User>, uid: string) => {
  await FirebaseService.updateDocument(`${USER_PATH}/${uid}`, user)
}

export const fetchUser = async (uid: string) => {
  const user = await FirebaseService.getDocument(`${USER_PATH}/${uid}`)
  return user
}

export default {
  registerUserViaEmail,
  loginUserViaEmailAndPassword,
  createUserProfileDocument,
  createUser,
  updateUser,
  fetchUser,
}
