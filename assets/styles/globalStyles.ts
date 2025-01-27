import styled from 'styled-components'
import { colors } from '../colors'
import dimensions from '../dimensions'

// -------- Common Components Start -------- //

export const PrimaryButton = styled.button`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${dimensions.borderRadius};

  & > * {
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: ${dimensions.textMedium};
    font-family: 'NotoSansMono';
  }
`

export const ContainerColumn = styled.div`
  width: 100%;
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
// WorldList.tsx
export const WorldContainer = styled.div`
  margin: ${dimensions.marginMedium};
  border: 3px solid ${colors.textDark};
  border-radius: ${dimensions.borderRadius};
  display: flex;
  flex-direction: column;
  padding-bottom: ${dimensions.marginSmall};
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

export const ListButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: ${dimensions.marginSmall};
  flex-direction: row;
`

// -------- Lists End -------- //
