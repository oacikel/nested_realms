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
  border-radius: ${dimensions.borderRadius};
  background-color: ${colors.primary};

  & > * {
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: ${dimensions.textMedium};
    font-family: 'NotoSansMono';
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
  font-family: 'NotoSansMono';
  border-radius: ${dimensions.borderRadius};
  border: ${dimensions.borderSize} solid ${colors.textDark};
  padding: ${dimensions.marginSmall};
  resize: vertical;
`

export const ContainerColumn = styled.div`
  font-family: 'NotoSansMono';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    width: 100%;
  }
`

// -------- Common Components End -------- //

// -------- Lists Start -------- //
const BaseItemContianer = styled.div`
  display: flex;
  flex-direction: column;
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
  justify-content: center;
  align-items: center;
  border: 3px solid ${colors.textDark};
  border-radius: ${dimensions.borderRadius};
  background-color: ${colors.primary};
`

export const WorldName = styled.div`
  border-bottom: 3px solid ${colors.textDark};
  padding: ${dimensions.marginSmall};
  margin: 0;
  background-color: ${colors.textDark};
  text-align: center;
  color: ${colors.textLight};
  font-size: ${dimensions.textMedium} !important;
`

export const WorldDescription = styled.text`
  font-size: ${dimensions.textMedium};
  padding: ${dimensions.marginMedium};
  text-color: ${colors.textDark};
  text-align: start;
`

// tinyEntityList.tsx
export const TinyEntityContainer = styled(BaseItemContianer)`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  border: 2px solid ${colors.textDark};
  border-radius: ${dimensions.borderRadius};
  font-family: 'NotoSansMono';
  padding: ${dimensions.marginSmall};
  & > * {
    overflow: auto;
  }
`

export const TintEntityName = styled.div`
  font-size: ${dimensions.textLarge};
  font-weight: bold;
`

export const TinyEntityDescription = styled.text`
  font-size: ${dimensions.textMedium};
  text-align: start;
`
// -------- Lists End -------- //

// -------- Forms Start -------- //
