import { combineReducers } from '@reduxjs/toolkit'
import worldReducer from './slices/worldSlice'
import entityReducer from './slices/entitySlice'
import navigationReducer from './slices/navigationSlice'

const rootReducer = combineReducers({
  world: worldReducer,
  entity: entityReducer,
  navigation: navigationReducer,
})

export default rootReducer
