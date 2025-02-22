import styled from 'styled-components'
import dimensions from '../dimensions'
import { colors } from '../colors'
import { Carousel } from 'react-responsive-carousel'
import { MaterialIcons } from '@expo/vector-icons'
import { EntityListType } from '@/types/types'
import { TextField } from '@mui/material'

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

const primaryText = styled.span`
  color: ${colors.textDark};
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  hyphens: auto;
  font-family: 'NotoSans';
`

export const PrimaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${dimensions.marginMedium};
  border: ${dimensions.borderSize} solid ${colors.textDark};
  border-radius: ${dimensions.borderRadius};
  padding: ${dimensions.marginMedium};
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

export const StyledForm = styled.div`
  max-width: ${dimensions.formMaxWidth};
  display: flex;
  flex-direction: column;
  gap: ${dimensions.marginMedium};
`

export const InputWrapper = styled.div``

export const StyledInput = styled(TextField)`
  font-size: ${dimensions.textMedium};
  font-family: 'NotoSans';
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

export const Title = styled(primaryText)`
  font-size: ${dimensions.textXLarge};
  text-align: center;
`

export const SubTitle = styled(primaryText)`
  font-size: ${dimensions.textMedium};
  text-align: center;
`

export const LabelText = styled(primaryText)`
  font-size: ${dimensions.textMedium};
  color: ${colors.textDark};
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

export const WorldName = styled(primaryText)`
  text-align: center;
  font-size: ${dimensions.textXXXLarge};
  @media (max-width: 768px) {
    font-size: ${dimensions.textXLarge};
  }
`

export const WorldDescription = styled(primaryText)`
  text-align: center;
  width: 100%;
  font-size: ${dimensions.textLarge};
`

export const WorldCreator = styled(primaryText)`
  text-align: center;
  font-size: ${dimensions.textMedium};
`

// tinyEntityList.tsx
export const TinyEntityContainer = styled(BaseItemContianer)<{
  listType: EntityListType
}>`
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

export const TinyEntityName = styled(primaryText)<{
  listType: EntityListType
}>`
  text-align: start;
  font-size: ${dimensions.textMedium};
  color: ${({ listType }) =>
    listType === 'selections' ? colors.textLight : colors.textDark};
`

export const TinyEntityDescription = styled(primaryText)`
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
  font-size: ${dimensions.textXLarge};
`

export const WorldDetailDescription = styled(primaryText)`
  text-align: start;
  width: 50%;
  font-size: ${dimensions.textMedium};
`
// -------- World Detail Page End -------- //

// -------- Entity Detail Page Start -------- //
export const EntityDetailContainer = styled(BaseItemContianer)`
  display: flex; /* Ensures it fills the space */
  flex: 1; /* Takes up all available height */
  height: 100%;
  padding: ${dimensions.marginMedium};
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

export const EntityInfoAndVisitedEntitiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70%;
  gap: ${dimensions.marginMedium};
`

export const EntityInfoContainer = styled.div`
  display: flex;
  width: 70%;
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
  width: 20%;
`

export const EntityDetailName = styled(primaryText)`
  text-align: flex-start;
  width: 100%;
  font-size: ${dimensions.textXXLarge};
`
export const EntityDetailDescription = styled(primaryText)`
  text-align: start;
  width: 100%;
  font-size: ${dimensions.textMedium};
`
// -------- Entity Detail Page End -------- //

// -------- Forms Start -------- //

// -------- Forms End -------- //
