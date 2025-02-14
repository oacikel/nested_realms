export type EntityLite = {
  id: string
  name: string
  parentId: string | null
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
  description?: string
  createdAt: Date
  worldId: string
  parentId: string | null
  childrenIds?: string[]
  neighborIds?: string[]
}

export type EntityRequest = {
  worldId: string
  name: string
  description?: string
  createdAt: Date
  parentId: string | null
}

export type EntityPosition = 'focused' | 'parent' | 'child' | 'neighbor'

export interface AddEntitiesPayload {
  worldId: string
  entityRequests: EntityRequest[]
}

export type EntityListType = 'selections' | 'history'
