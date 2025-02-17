import { paths } from '@/constants/pathNames'
import { requestRegisterUser } from '@/redux/slices/userSlice'
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
  SubTitle,
  PrimaryContainer,
} from '@/assets/styles/globalStyles'
import { View } from 'react-native'
import { colors } from '@/assets/colors'
import dimensions from '@/assets/dimensions'

const Register: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(requestRegisterUser({ email, password, userName }))
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
        <Title>Create An Account For Free!</Title>
        <SubTitle>
          I love how the "free" implies some unmissible opportunity. As if there
          are sites where you pay to register...
        </SubTitle>
        <StyledForm onSubmit={handleRegister}>
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoCapitalize="none"
              label="Username"
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
          <PrimaryButton onClick={handleRegister}>
            <LabelText>Register</LabelText>
          </PrimaryButton>
        </StyledForm>
      </PrimaryContainer>
    </View>
  )
}

export default Register
