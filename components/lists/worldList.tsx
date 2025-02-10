import {
  WorldCarousel,
  WorldCarouselContainer,
  WorldDescription,
  WorldItemContainer,
  WorldName,
} from '@/assets/styles/globalStyles'
import { World } from '@/types/types'
import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

interface WorldListProps {
  worlds: World[]
}

const WorldList: React.FC<WorldListProps> = ({ worlds }) => {
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
          </WorldItemContainer>
        ))}
      </WorldCarousel>
    </WorldCarouselContainer>
  )
}

export default WorldList
