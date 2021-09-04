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

interface IBoxProps extends IPosition, IFlex, IDimension, IMargin, IPadding, IBorder, IBackground {
  display?: string;
}

export const Box = styled.View<IBoxProps>`
  display: ${({ display }) => display || "flex"};
  ${styledPosition}
  ${styledFlex}
  ${styledDimension}
  ${styledMargin}
  ${styledPadding}
  ${styledBorder}
  ${styledBackground}
`;
