import {
  ListButtonsContainer,
  PrimaryButton,
  WorldCarousel,
  WorldCarouselContainer,
  WorldDescription,
  WorldCreator,
  WorldItemContainer,
  WorldName,
} from '@/assets/styles/globalStyles'
import { paths } from '@/constants/pathNames'
import { selectWorld } from '@/redux/slices/worldSlice'
import { World } from '@/types/types'
import { router } from 'expo-router'
import React from 'react'
import { useDispatch } from 'react-redux'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

interface WorldListProps {
  worlds: World[]
}

const WorldList: React.FC<WorldListProps> = ({ worlds }) => {
  const dispatch = useDispatch()

  const handleSelectWorldClick = (world: World) => {
    dispatch(selectWorld(world))
    router.push(`${paths.world}?worldId=${world.id}`)
  }

  return (
    <WorldCarouselContainer>
      <WorldCarousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        useKeyboardArrows
        swipeable
        emulateTouch
        dynamicHeight={false}
        showIndicators={true}
      >
        {worlds.map((world, _i) => (
          <WorldItemContainer>
            <WorldName>{world.name}</WorldName>
            <WorldDescription>{world.description}</WorldDescription>
            by
            <WorldCreator>{world.creatorUserName}</WorldCreator>
            <ListButtonsContainer>
              <PrimaryButton onClick={() => handleSelectWorldClick(world)}>
                <span>?</span>
                <span>Discover World</span>
              </PrimaryButton>
            </ListButtonsContainer>
          </WorldItemContainer>
        ))}
      </WorldCarousel>
    </WorldCarouselContainer>
  )
}

export default WorldList
