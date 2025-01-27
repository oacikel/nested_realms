export type EntityLite = {
  id: string
  name: string
  isTopLevel: boolean
}
export type World = {
  id: string
  name: string
  description: string
  createdAt: Date
  entityIds: EntityLite[] | null
  topLevelEntities: EntityLite[] | null
}

export type WorldRequest = {
  name: string
  description: string
  createdAt: Date
  entityIds?: EntityLite[] | null
  topLevelEntities?: EntityLite[] | null
}

export type Entity = {
  id: string
  name: string
  description: string
  createdAt: Date
  isTopLevel: boolean
  parentId?: string
  childrenIds?: string[]
  neighborIds?: string[]
}

export type EntityRequest = {
  name: string
  description: string
  createdAt: Date
  isTopLevel: boolean
  parentId?: string
  childrenIds?: string[]
  neighborIds?: string[]
}

export interface AddWorldPayload {
  worldRequest: WorldRequest
  entityRequests: EntityRequest[]
}

export interface AddEntitiesPayload {
  worldId: string
  entityRequests: EntityRequest[]
}
