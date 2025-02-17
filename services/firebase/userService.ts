import { EmailRegisterRequest, User } from '@/types/types'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
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

export const createUserProfileDocument = async (user: User) => {
  const worldId = await FirebaseService.setDocument(
    `${USER_PATH}/${user.id}`, // We use the user's uid in authentication as their id in the database.
    user,
    false,
  )
  return worldId
}

export const updateUser = async (user: Partial<User>, uid: string) => {
  await FirebaseService.updateDocument(`${USER_PATH}/${uid}`, user)
}
export default {
  registerUserViaEmail,
  createUserProfileDocument,
  updateUser,
}
