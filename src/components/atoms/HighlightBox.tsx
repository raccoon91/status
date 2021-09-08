import styled from "styled-components/native";
import { TouchableHighlight } from "react-native-gesture-handler";
import {
  styledPosition,
  styledFlex,
  styledDimension,
  styledMargin,
  styledPadding,
  styledBorder,
  styledBackground,
} from "./styled";

interface IHighlightBoxProps extends IPosition, IFlex, IDimension, IMargin, IPadding, IBorder, IBackground {}

export const HighlightBox = styled(TouchableHighlight)<IHighlightBoxProps>`
  ${styledPosition}
  ${styledFlex()}
  ${styledDimension()}
  ${styledMargin}
  ${styledPadding}
  ${styledBorder()}
  ${styledBackground()}
`;
