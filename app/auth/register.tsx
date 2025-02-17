import { paths } from '@/constants/pathNames'
import { requestRegisterUser } from '@/redux/slices/userSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import {
  PrimaryButton,
  StyledForm,
  InputWrapper,
  StyledInput,
  Title,
  LabelText,
} from '@/assets/styles/globalStyles'
import { Container } from '@mui/system'

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

  useEffect(() => {
    setEmail(`test${Math.random()}@test.com`)
    setPassword(`test${Math.random()}`)
    setUserName(`test${Math.random()}`)
  }, [])

  return (
    <Container>
      <Title>Register</Title>
      <StyledForm onSubmit={handleRegister}>
        <InputWrapper>
          <LabelText>Email:</LabelText>
          <StyledInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputMode="email"
            autoCapitalize="none"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <LabelText>Username:</LabelText>
          <StyledInput
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoCapitalize="none"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <LabelText>Password:</LabelText>
          <StyledInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputWrapper>
        <PrimaryButton onClick={handleRegister}>
          <LabelText>Register</LabelText>
        </PrimaryButton>
      </StyledForm>
    </Container>
  )
}

export default Register
