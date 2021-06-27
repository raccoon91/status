import styled from "styled-components/native";
import { styledDimension, styledMargin, styledPadding } from "./styled";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface ITouchableBoxProps extends IFlex, IDimension, IMargin, IPadding, IBorder {
  bgColor?: string;
  color?: string;
}

export const TouchableBox = styled(TouchableWithoutFeedback)<ITouchableBoxProps>`
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  ${styledDimension}
  ${styledMargin}
  ${styledPadding}
  ${({ border }) => border && `border: ${border};`}
  border-radius: ${({ radius }) => radius || "3px"};
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`;
