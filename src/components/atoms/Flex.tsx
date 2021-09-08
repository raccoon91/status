import styled from "styled-components/native";
import {
  styledPosition,
  styledFlex,
  styledDimension,
  styledMargin,
  styledPadding,
  styledBorder,
  styledBackground,
} from "./styled";

interface IFlexProps extends IPosition, IFlex, IDimension, IMargin, IPadding, IBorder, IBackground {}

export const Flex = styled.View<IFlexProps>`
  ${styledPosition}
  ${styledFlex()}
  ${styledDimension()}
  ${styledMargin}
  ${styledPadding}
  ${styledBorder()}
  ${styledBackground()}
`;
