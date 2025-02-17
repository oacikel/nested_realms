import { EmailRegisterRequest, User } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
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
      state.user = action.payload
      state.loading = false
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    signOut: (state) => {
      state.user = null
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
        id: state.user?.id || '',
        email: action.payload.email ?? state.user?.email ?? null,
      }
    },
  },
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOut,
  requestRegisterUser,
  updateUser,
  setUser,
} = userSlice.actions
export default userSlice.reducer
