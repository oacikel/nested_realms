import { User } from '@/types/types'
import { User as FirebaseUser } from 'firebase/auth'

export const generateUserFromFirebaseUser = (
  firebaseUser: FirebaseUser,
): User => {
  return {
    email: firebaseUser.email,
    id: firebaseUser.uid,
  }
}

export const isWorldCreatedByUser = (worldId: string, user: User): boolean => {
  return user.createdWorldIds?.includes(worldId) ?? false
}
