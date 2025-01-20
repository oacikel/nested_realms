export type EntityIdNamePair = {
  id: string
  name: string
}
export type World = {
  id: string
  name: string
  description: string
  createdAt: Date
  entityIds: EntityIdNamePair[] | null
}

export type WorldRequest = {
  name: string
  description: string
  createdAt: Date
  entityIds?: EntityIdNamePair[]
}

export type Entity = {
  id: string
  name: string
  description: string
  createdAt: Date
  parentId?: string
  childrenIds?: string[]
  neighborIds?: string[]
}

export type EntityRequest = {
  name: string
  description: string
  createdAt: Date
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
