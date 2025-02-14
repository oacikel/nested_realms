import React from 'react'
import { CommonIcon, PrimaryButton } from '@/assets/styles/globalStyles'
import { paths } from '@/constants/pathNames'
import { router } from 'expo-router'

const HomeButton: React.FC = () => {
  const onHomeClicked = () => {
    router.push(paths.home)
  }
  return (
    <PrimaryButton onClick={onHomeClicked}>
      <CommonIcon name="home" />
      Home
    </PrimaryButton>
  )
}

export default HomeButton
