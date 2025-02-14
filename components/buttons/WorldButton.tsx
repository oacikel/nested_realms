import React from 'react'
import { CommonIcon, PrimaryButton } from '@/assets/styles/globalStyles'
import { paths } from '@/constants/pathNames'
import { router } from 'expo-router'
import { useDispatch } from 'react-redux'
import { selectWorld } from '@/redux/slices/worldSlice'
import { World } from '@/types/types'

interface WorldButtonProps {
  world: World
}

const WorldButton: React.FC<WorldButtonProps> = ({ world }) => {
  const dispatch = useDispatch()

  const onWorldClicked = () => {
    dispatch(selectWorld(world))
    router.push(`${paths.world}?worldId=${world.id}`)
  }

  return (
    <PrimaryButton onClick={onWorldClicked}>
      <CommonIcon name="menu-book" />
      {world.name}
    </PrimaryButton>
  )
}

export default WorldButton
