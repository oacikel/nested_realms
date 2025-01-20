export type World = {
  id: string
  name: string
  description: string
  createdAt: Date
  entityIds: string[] | null
}

export type WorldRequest = {
  name: string
  description: string
  createdAt: Date
  entityIds?: string[]
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
