import { paths } from '@/constants/pathNames'
import { requestLoginUser } from '@/redux/slices/userSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import {
  PrimaryButton,
  StyledForm,
  InputWrapper,
  StyledInput,
  Title,
  LabelText,
  PrimaryContainer,
} from '@/assets/styles/globalStyles'
import { View } from 'react-native'
import { colors } from '@/assets/colors'
import dimensions from '@/assets/dimensions'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(requestLoginUser({ email, password }))
    router.push(paths.home)
  }

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: parseInt(dimensions.marginXLarge, 10),
      }}
    >
      <PrimaryContainer style={{ width: 400 }}>
        <Title>
          Yeah baby... Login for me please. Login all over this website
        </Title>
        <StyledForm onSubmit={handleLogin}>
          <InputWrapper>
            <StyledInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputMode="email"
              autoCapitalize="none"
              label="Email"
              required
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              required
            />
          </InputWrapper>
          <PrimaryButton onClick={handleLogin}>
            <LabelText>Login</LabelText>
          </PrimaryButton>
        </StyledForm>
      </PrimaryContainer>
    </View>
  )
}

export default Login
