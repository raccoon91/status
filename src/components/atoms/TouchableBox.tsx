import styled from "styled-components/native";
import { styledPosition, styledFlex, styledDimension, styledMargin, styledPadding, styledBackground } from "./styled";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface ITouchableBoxProps extends IPosition, IFlex, IDimension, IMargin, IPadding, IBorder, IBackground {}

export const TouchableBox = styled(TouchableWithoutFeedback)<ITouchableBoxProps>`
  ${styledPosition}
  ${styledFlex}
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  ${styledDimension}
  ${styledMargin}
  ${styledPadding}
  ${({ border }) => border && `border: ${border};`}
  border-radius: ${({ radius }) => radius || "3px"};
  ${styledBackground}
`;
