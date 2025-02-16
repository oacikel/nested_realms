import { EmailRegisterRequest } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface UserState {
  firebaseUser: User | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  firebaseUser: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requestRegisterUser: (
      _state,
      _action: PayloadAction<EmailRegisterRequest>,
    ) => {
      // handled in saga
    },
    signInStart: (state) => {
      state.loading = true
      state.error = null
    },
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.firebaseUser = action.payload
      state.loading = false
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    signOut: (state) => {
      state.firebaseUser = null
    },
  },
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
  requestRegisterUser,
} = userSlice.actions
export default userSlice.reducer
