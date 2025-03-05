import { World, User } from '@/types/types'

export const shouldDisplayWorld = (world: World, user?: User): boolean => {
  if (!world.isPrivate) {
    return true
  } else {
    return world.creatorId == user?.id
  }
}

export const canThisUserAddChildren = (world: World, user?: User): boolean => {
  return world.canOthersAddChildren || world.creatorId == user?.id
}
