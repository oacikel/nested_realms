import { Entity, EntityLite } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type EntitiesState = {
  entityLiteOfInterest: EntityLite | null
  focused: Entity | null
  parent: Entity | null
  neighbor: Entity[] | null
  children: Entity[] | null
}

const initialState: EntitiesState = {
  entityLiteOfInterest: null,
  focused: null,
  parent: null,
  neighbor: null,
  children: null,
}

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    setEntityLiteOfInterest: (state, action: PayloadAction<EntityLite>) => {
      state.entityLiteOfInterest = action.payload
    },
    requestFocusedEntity: (_state, _action: PayloadAction<EntityLite>) => {
      // No state change needed, this action is handled by a saga
    },
    requestParentEntity: (_state) => {
      // No state change needed, this action is handled by a saga
    },
    requestNeighborEntities: (_state) => {
      // No state change needed, this action is handled by a saga
    },
    requestChildrenEntities: (_state) => {
      // No state change needed, this action is handled by a saga
    },
    setFocusedEntity: (state, action: PayloadAction<Entity | null>) => {
      state.focused = action.payload
    },
    setParentEntity: (state, action: PayloadAction<Entity | null>) => {
      state.parent = action.payload
    },
    setNeighborEntities: (state, action: PayloadAction<Entity[] | null>) => {
      state.neighbor = action.payload
    },
    setChildrenEntities: (state, action: PayloadAction<Entity[] | null>) => {
      state.children = action.payload
    },
  },
})

export const {
  setEntityLiteOfInterest,
  requestFocusedEntity,
  requestParentEntity,
  requestNeighborEntities,
  requestChildrenEntities,
  setFocusedEntity,
  setParentEntity,
  setNeighborEntities,
  setChildrenEntities,
} = entitiesSlice.actions
export default entitiesSlice.reducer
