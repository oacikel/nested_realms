import {
  Entity,
  EntityLite,
  EntityRequest,
  EntitySuggestionRequest,
} from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type EntitiesState = {
  entityLiteOfInterest: EntityLite | null
  focused: Entity | null
  parent: Entity | null
  neighbor: Entity[] | null
  children: Entity[] | null
  suggestedChildren: Entity[] | null // AI-suggested children
  visitedEntities: Entity[] | null
}

const initialState: EntitiesState = {
  entityLiteOfInterest: null,
  focused: null,
  parent: null,
  neighbor: null,
  children: null,
  suggestedChildren: null,
  visitedEntities: null,
}

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    clearState: () => initialState,

    setEntityLiteOfInterest: (state, action: PayloadAction<EntityLite>) => {
      state.entityLiteOfInterest = action.payload
    },

    // Requests handled by saga
    requestFocusedEntity: (_state, _action: PayloadAction<EntityLite>) => {},
    requestParentEntity: (_state) => {},
    setParentEntity: (state, action: PayloadAction<Entity | null>) => {
      state.parent = action.payload
    },
    requestNeighborEntities: (_state) => {},
    setNeighborEntities: (state, action: PayloadAction<Entity[] | null>) => {
      state.neighbor = action.payload
    },
    requestChildrenEntities: (_state) => {},
    setChildrenEntities: (state, action: PayloadAction<Entity[] | null>) => {
      state.children = action.payload
    },
    requestCreateChildEntity: (
      _state,
      _action: PayloadAction<EntityRequest>,
    ) => {},

    addEntityToStore: (state, action: PayloadAction<Entity>) => {
      state.children = state.children
        ? [...state.children, action.payload]
        : [action.payload]
    },
    setVisitedEntities: (state, action: PayloadAction<Entity[] | null>) => {
      state.visitedEntities = action.payload
    },
    //Request AI assistance (handled in saga)
    requestAIAssist: (
      _state,
      _action: PayloadAction<EntitySuggestionRequest>,
    ) => {},

    // Saga will dispatch this when AI suggestions are ready
    setSuggestedEntities: (state, action: PayloadAction<Entity[] | null>) => {
      state.suggestedChildren = action.payload
    },

    // Accept AI suggestions and move to real children list
    acceptSuggestedChildren: (state) => {
      if (state.suggestedChildren) {
        state.children = state.children
          ? [...state.children, ...state.suggestedChildren]
          : [...state.suggestedChildren]
        state.suggestedChildren = null
      }
    },

    // Reject AI suggestions (clear them)
    rejectSuggestedChildren: (state) => {
      state.suggestedChildren = null
    },

    setFocusedEntity: (state, action: PayloadAction<Entity | null>) => {
      state.focused = action.payload
    },
  },
})

export const {
  clearState,
  addEntityToStore,
  setEntityLiteOfInterest,
  requestFocusedEntity,
  requestParentEntity,
  setParentEntity,
  requestNeighborEntities,
  setNeighborEntities,
  requestChildrenEntities,
  setChildrenEntities,
  requestCreateChildEntity,
  setVisitedEntities,
  requestAIAssist,
  setSuggestedEntities,
  acceptSuggestedChildren,
  rejectSuggestedChildren,
  setFocusedEntity,
} = entitiesSlice.actions

export default entitiesSlice.reducer
