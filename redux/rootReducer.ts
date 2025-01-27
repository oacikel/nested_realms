import { combineReducers } from '@reduxjs/toolkit'
import worldReducer from './slices/worldSlice'
import entitiesReducer from './slices/entitiesSlice'
import navigationReducer from './slices/navigationSlice'

const rootReducer = combineReducers({
  world: worldReducer,
  entities: entitiesReducer,
  navigation: navigationReducer,
})

export default rootReducer
