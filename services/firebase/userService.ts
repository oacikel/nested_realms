import { EmailRegisterRequest } from '@/types/types'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth()

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

export default {
  registerUserViaEmail,
}
