import styled from 'styled-components'
import dimensions from '../dimensions'
import { colors } from '../colors'
import { Carousel } from 'react-responsive-carousel'

// -------- Common Components Start -------- //

export const PrimaryButton = styled.button`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.secondary};
  border-radius: ${dimensions.borderRadius};
  border: ${dimensions.borderSize} solid ${colors.textDark};

  & > * {
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: ${dimensions.textMedium};
    font-family: 'NotoSans_400Regular';
  }
`
export const HorizontalDivider = styled.div`
  width: 100%;
  height: ${dimensions.borderSize};
  background-color: ${colors.textDark};
  margin: 0;
`
export const ListButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: ${dimensions.marginSmall};
`

export const StyledInput = styled.textarea`
  font-size: ${dimensions.textMedium};
  font-family: 'NotoSans_400Regular';
  border-radius: ${dimensions.borderRadius};
  border: ${dimensions.borderSize} solid ${colors.textDark};
  padding: ${dimensions.marginSmall};
  resize: vertical;
`

export const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    width: 100%;
    font-family: 'NotoSans_400Regular';
  }
`

// -------- Common Components End -------- //

// -------- Lists Start -------- //
const BaseItemContianer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'NotoSans_400Regular';
`
// WorldList.tsx
export const WorldCarouselContainer = styled.div`
  flex: 1;
  display: flex;
`
export const WorldCarousel = styled(Carousel)`
  height: 100%;
  flex: 1;
  background-color: ${colors.secondary};

  /* Make sure the inner slider wrapper takes full height */
  .carousel-slider {
    height: 100%;
  }

  /* Fix the inner slide container to take full space */
  .slider-wrapper {
    display: flex;
    height: 100%;
  }
`

export const WorldItemContainer = styled(BaseItemContianer)`
  display: flex; /* Ensures it fills the space */
  flex: 1; /* Takes up all available height */
  height: 100%;
  width: 100%;
  padding: ${dimensions.marginXLarge};
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  gap: ${dimensions.marginLarge};
`

export const WorldName = styled.div`
  text-align: start;
  color: ${colors.textDark};
  font-size: ${dimensions.textXXXLarge} !important;
  font-family: 'NotoSans_700Bold';
`

export const WorldDescription = styled.div`
  text-align: center;
  width: 50%;
  font-size: ${dimensions.textLarge};
  color: ${colors.textDark};
`

// tinyEntityList.tsx
export const TinyEntityContainer = styled(BaseItemContianer)`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  border: 2px solid ${colors.textDark};
  border-radius: ${dimensions.borderRadius};
  padding: ${dimensions.marginSmall};
  margin-right: ${dimensions.marginSmall};
  background-color: ${colors.textDark};
  & > * {
    overflow: auto;
  }
`

export const TinyEntityName = styled.div`
  font-size: ${dimensions.textMedium};
  color: ${colors.textLight};
  font-family: 'NotoSans_700Bold';
`

export const TinyEntityDescription = styled.text`
  font-size: ${dimensions.textMedium};
  text-align: start;
`
// -------- Lists End -------- //

// -------- World Detail Page Start -------- //
export const WorldDetailContainer = styled(BaseItemContianer)`
  display: flex; /* Ensures it fills the space */
  flex: 1; /* Takes up all available height */
  height: 100%;
  width: 100%;
  padding: ${dimensions.marginLarge};
  justify-content: flex-start;
  align-items: start;
  background-color: ${colors.primary};
  gap: ${dimensions.marginLarge};
`

export const WorldDetailTitle = styled.div`
  text-align: start;
  width: 100%;
  color: ${colors.textDark};
  font-size: ${dimensions.textXLarge} !important;
`

export const WorldDetailDescription = styled.div`
  text-align: start;
  width: 50%;
  font-size: ${dimensions.textMedium};
  color: ${colors.textDark};
`

// -------- World Detail Page End -------- //

// -------- Forms Start -------- //

// -------- Forms End -------- //
