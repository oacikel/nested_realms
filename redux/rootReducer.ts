import { combineReducers } from '@reduxjs/toolkit'
import worldReducer from './slices/worldSlice'
import entitiesReducer from './slices/entitiesSlice'
import navigationReducer from './slices/navigationSlice'
import userReducer from './slices/userSlice'

const rootReducer = combineReducers({
  world: worldReducer,
  entities: entitiesReducer,
  navigation: navigationReducer,
  user: userReducer,
})

export default rootReducer
