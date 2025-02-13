import styled from 'styled-components'
import dimensions from '../dimensions'
import { colors } from '../colors'
import { Carousel } from 'react-responsive-carousel'
import { MaterialIcons } from '@expo/vector-icons'
import { EntityListType } from '@/types/types'

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
    font-family: 'NotoSans';
  }
`

export const CommonIcon = styled(MaterialIcons).attrs({
  size: 24,
  color: `${colors.textDark}`,
})``

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
  font-family: 'NotoSans';
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
    font-family: 'NotoSans';
  }
`

// -------- Common Components End -------- //

// -------- Lists Start -------- //
const BaseItemContianer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'NotoSans';
`

// WorldList.tsx
export const WorldCarouselContainer = styled.div`
  height: 100%;
`

export const WorldCarousel = styled(Carousel)`
  height: 100%;
  background-color: ${colors.primary};

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
  height: 100%;
  width: 100%;
  padding: ${dimensions.marginXLarge};
  justify-content: center;
  align-items: center;
  gap: ${dimensions.marginLarge};
`

export const WorldName = styled.div`
  text-align: center;
  color: ${colors.textDark};
  font-size: ${dimensions.textXXXLarge} !important;
  font-family: 'NotoSans';
  @media (max-width: 768px) {
    font-size: ${dimensions.textXLarge} !important;
  }
`

export const WorldDescription = styled.div`
  text-align: center;
  width: 100%;
  font-size: ${dimensions.textLarge};
  color: ${colors.textDark};
`

// tinyEntityList.tsx
export const TinyEntityContainer = styled(BaseItemContianer)<{
  listType: EntityListType
}>`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  border: ${({ listType }) =>
    listType === 'selections' ? `2px solid ${colors.textDark}` : 'none'};
  border-radius: ${dimensions.borderRadius};
  padding: ${({ listType }) =>
    listType === 'selections' ? dimensions.marginSmall : '0'};
  margin-right: ${dimensions.marginSmall};
  background-color: ${({ listType }) =>
    listType === 'selections' ? colors.textDark : 'none'};
`

export const TinyEntityName = styled.div<{
  listType: EntityListType
}>`
  font-size: ${dimensions.textMedium};
  color: ${({ listType }) =>
    listType === 'selections' ? colors.textLight : colors.textDark};
  font-family: 'NotoSans';
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

// -------- Entity Detail Page Start -------- //
export const EntityDetailContainer = styled(BaseItemContianer)`
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
export const EntityDetailTopBannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: ${dimensions.marginSmall};
  width: 100%;
`
export const EntityDetailWorldName = styled.div`
  color: ${colors.textDark};
  font-size: ${dimensions.textMedium} !important;
`

export const EntityDetailHomeButton = styled(EntityDetailWorldName)``

export const EntityDetailWorldButton = styled(PrimaryButton)`
  background-color: ${colors.lightTransparent};
  padding: ${dimensions.marginSmall};
  color: ${colors.textDark};
  font-size: ${dimensions.textXLarge} !important;
  border: none;
  border-radius: 0;
`

export const EntityDetailParentButton = styled(PrimaryButton)`
  position: absolute;
  left: 50;
  background-color: ${colors.lightTransparent};
  padding: ${dimensions.marginSmall};
  color: ${colors.textDark};
  font-size: ${dimensions.textXLarge} !important;
  border: none;
  border-radius: 0;
`

export const EntityDetailParentName = styled.div`
  color: ${colors.textDark};
  font-size: ${dimensions.textLarge} !important;
`

export const EntityInfoAndVisitedEntitiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60%;
  gap: ${dimensions.marginMedium};
`

export const EntityInfoContainer = styled.div`
  display: flex;
  border-radius: ${dimensions.borderRadius};
  border: ${dimensions.borderSize} solid ${colors.textDark};
  padding: ${dimensions.marginSmall};
  flex: 3;
  flex-direction: column;
  gap: ${dimensions.marginMedium};
`

export const VisitedEntitiesContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  gap: ${dimensions.marginMedium};
`

export const EntityDetailName = styled.div`
  text-align: flex-start;
  width: 100%;
  color: ${colors.textDark};
  font-size: ${dimensions.textXXLarge} !important;
`
export const EntityDetailDescription = styled.div`
  text-align: start;
  width: 100%;
  font-size: ${dimensions.textMedium};
  color: ${colors.textDark};
`
// -------- Entity Detail Page End -------- //

// -------- Forms Start -------- //

// -------- Forms End -------- //
