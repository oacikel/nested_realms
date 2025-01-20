import { combineReducers } from '@reduxjs/toolkit'
import worldReducer from './slices/worldSlice'
import navigationReducer from './slices/navigationSlice'

const rootReducer = combineReducers({
  world: worldReducer,
  navigation: navigationReducer,
})

export default rootReducer
