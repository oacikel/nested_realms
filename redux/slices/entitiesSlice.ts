import { Entity, EntityLite, EntityRequest } from '@/types/types'
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
    requestCreateChildEntity: (
      _state,
      _action: PayloadAction<EntityRequest>,
    ) => {
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
    addNeighborEntities: (state, action: PayloadAction<Entity[] | null>) => {
      if (state.neighbor) {
        state.neighbor.push(...(action.payload || []))
      } else {
        state.neighbor = action.payload
      }
    },
    addChildrenEntities: (state, action: PayloadAction<Entity[] | null>) => {
      if (state.children) {
        state.children.push(...(action.payload || []))
      } else {
        state.children = action.payload
      }
    },
    addEntityToStore: (state, action: PayloadAction<Entity>) => {
      state.children = state.children
        ? [...state.children, action.payload]
        : [action.payload]
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
  addNeighborEntities,
  addChildrenEntities,
  requestCreateChildEntity,
  addEntityToStore,
} = entitiesSlice.actions
export default entitiesSlice.reducer
